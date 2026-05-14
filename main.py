import json
import os
import re
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from google import genai
from google.genai import types
from pydantic import BaseModel


load_dotenv()

app = FastAPI(
    title="Rhetorical Speech Coach",
    description="A Python FastAPI app that uses Gemini to critique a speech for a target audience.",
)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


class SpeechRequest(BaseModel):
    speech_text: str
    audience: str
    occasion: str = ""
    goal: str = ""


def count_words(text: str) -> int:
    return len(re.findall(r"\b[\w'-]+\b", text))


def build_prompt(payload: SpeechRequest, word_count: int) -> str:
    occasion = payload.occasion.strip() or "not specified"
    goal = payload.goal.strip() or "not specified"

    return f"""
You are an expert public-speaking and debate coach. Analyze the speech below
for how well it will connect with the intended audience.

Intended audience: {payload.audience.strip()}
Occasion: {occasion}
Communication goal: {goal}
Approximate word count: {word_count}

Speech:
\"\"\"
{payload.speech_text.strip()}
\"\"\"

Return only valid JSON using this exact shape:
{{
  "audience_fit_score": 1-10,
  "headline": "one sentence summary of the critique",
  "connects": ["2-3 reasons this will connect with the audience"],
  "risks": ["2-3 risks, gaps, confusing moments, or trust problems"],
  "rhetorical_notes": {{
    "ethos": "credibility/trust analysis",
    "pathos": "emotion/audience connection analysis",
    "logos": "reasoning/evidence analysis",
    "tone": "tone and word choice analysis",
    "structure": "organization and flow analysis"
  }},
  "revision_moves": ["exactly 3 concrete revision moves"],
  "improved_sample": "a short optional sample revision of 3-5 sentences"
}}

Be constructive, specific, and age-appropriate for a student builder. Do not
invent facts that are not in the speech. If the speech is too short, say what
can be evaluated and what needs more material.
"""


def parse_gemini_json(text: str) -> dict[str, Any]:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    return json.loads(cleaned)


@app.get("/", response_class=HTMLResponse)
async def home(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, "index.html")


@app.post("/api/analyze")
async def analyze_speech(payload: SpeechRequest) -> JSONResponse:
    speech_text = payload.speech_text.strip()
    audience = payload.audience.strip()

    if not speech_text:
        return JSONResponse(
            status_code=400,
            content={"ok": False, "error": "Paste a speech before asking for a critique."},
        )

    if not audience:
        return JSONResponse(
            status_code=400,
            content={"ok": False, "error": "Name the intended audience first."},
        )

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return JSONResponse(
            status_code=500,
            content={
                "ok": False,
                "error": "GEMINI_API_KEY is missing. Add it to .env locally or Render environment variables online.",
            },
        )

    word_count = count_words(speech_text)
    warning = ""
    if word_count < 80:
        warning = "This is short for a speech draft, so the critique focuses only on the material provided."
    elif word_count > 900:
        warning = "This is longer than the Session 4 target, so the critique may focus on the main visible patterns."

    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=build_prompt(payload, word_count),
            config=types.GenerateContentConfig(
                temperature=0.25,
                response_mime_type="application/json",
            ),
        )
        analysis = parse_gemini_json(response.text or "")
    except json.JSONDecodeError:
        return JSONResponse(
            status_code=502,
            content={
                "ok": False,
                "error": "Gemini responded, but the app could not read the response as JSON. Try again with a shorter speech.",
            },
        )
    except Exception as exc:
        return JSONResponse(
            status_code=502,
            content={"ok": False, "error": f"Gemini request failed: {exc}"},
        )

    return JSONResponse(
        content={
            "ok": True,
            "warning": warning,
            "word_count": word_count,
            "analysis": analysis,
        }
    )
