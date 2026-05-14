# Session 4 Codex Prompts

Use these prompts when you rebuild the Python speech coach on your own machine.

## Prompt 1: Create the App Files

```text
Build a Python FastAPI app for a rhetorical speech coach.

The app should have:
- main.py
- templates/index.html
- static/styles.css
- static/app.js
- requirements.txt
- .env.example
- .gitignore
- README.md

The user should paste a 1-3 paragraph speech and enter:
- intended audience
- occasion
- communication goal

The Python backend should call Gemini using GEMINI_API_KEY from the environment.
Use google-genai and gemini-2.5-flash.

Return:
- audience-fit score
- what will connect with the audience
- what may weaken trust or clarity
- ethos, pathos, logos, tone, and structure notes
- exactly three revision moves
- an optional sample revision

Do not put any API key in the code.
```

## Prompt 2: Check the Secret Handling

```text
Check my project for API key safety. Make sure .env is ignored by Git,
.env.example does not contain a real key, and the browser code never sees
GEMINI_API_KEY. Explain what files should and should not be committed.
```

## Prompt 3: Run and Debug Locally

```text
Help me run this FastAPI app locally on Windows PowerShell. Use my virtual
environment, install requirements if needed, run uvicorn main:app --reload,
and help me fix any errors. Do not change the app's purpose.
```

## Prompt 4: Prepare for GitHub

```text
Prepare this project for GitHub. Check git status, confirm .env is not staged,
write a clear README if needed, then help me commit with the message:
"Initial Python speech coach app".
```

## Prompt 5: Prepare for Render

```text
Help me deploy this FastAPI app to Render. Tell me the exact build command,
start command, and environment variable I need. If the deployment fails, use
the Render logs to identify the problem and suggest a fix.
```

## Prompt 6: Improve the App

```text
Improve the styling and usefulness of this speech coach app without changing
the stack. Keep Python/FastAPI as the backend. Make the page clearer, improve
the loading and error states, and make the critique easier for a student to act on.
```

## Prompt 7: Reflect on the Build

```text
Help me write a short reflection about this project. I need to answer:
What part was Python? What part was deployment? What broke? What did I improve?
Keep it honest and specific.
```
