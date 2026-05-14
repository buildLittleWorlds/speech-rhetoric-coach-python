# Rhetorical Speech Coach

A Python-first web app for Session 4 with Shawn: FastAPI, Gemini, GitHub, and Render.

The app lets a user paste a 1-3 paragraph speech, name the intended audience, and receive a rhetorical critique focused on audience connection, persuasion, clarity, and revision moves.

## Local Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` and replace `your_key_here` with your Gemini API key:

```bash
GEMINI_API_KEY=your_key_here
```

Run the app:

```bash
uvicorn main:app --reload
```

Open:

```text
http://127.0.0.1:8000
```

## Render Deployment

Use these settings in Render:

- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Environment variable: `GEMINI_API_KEY`

Never commit `.env` or any real API key.

## Teaching Notes

The important Python pieces are in `main.py`:

- FastAPI creates the web server.
- Pydantic defines the shape of the speech-analysis request.
- The `/api/analyze` route validates input, calls Gemini, and sends JSON back to the browser.
- Static HTML, CSS, and JavaScript make the app feel like a real deployed product.

## Session 4 Materials

- [Windows build and Render guide](docs/session-4-python-render-guide.md)
- [Codex prompts for Shawn](docs/session-4-codex-prompts.md)
- [Google Classroom post draft](docs/session-4-google-classroom-post.md)
