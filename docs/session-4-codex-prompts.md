# Session 4 Codex Prompts

Use these prompts when you copy, run, deploy, and improve the Python speech coach on your own machine.

You do not have to use all of them. Pick the one that matches where you are stuck.

## Prompt 0: Explain the Starter Project

```text
I am new to GitHub, FastAPI, and deployment. Explain this project to me slowly.
What is a repo? What is a fork? What is a clone? What does each file in this
speech-rhetoric-coach-python project do? Keep the explanation beginner-friendly.
```

## Prompt 1: Help Me Fork and Clone

```text
Help me make my own copy of this starter repo:
https://github.com/buildLittleWorlds/speech-rhetoric-coach-python

Explain the difference between forking and cloning. Then give me Windows
PowerShell commands for cloning my fork onto my computer. Do not assume I
already know GitHub.
```

## Prompt 2: Set Up Python Locally

```text
Help me run this FastAPI project locally on Windows PowerShell.

Start from the basics:
- check that I am in the right folder
- create a virtual environment
- activate it
- install requirements.txt
- create .env from .env.example
- explain where my Gemini API key goes

Do not ask me to paste the API key into chat.
```

## Prompt 3: Check Secret Handling

```text
Check my project for API key safety. Make sure .env is ignored by Git,
.env.example does not contain a real key, and the browser code never sees
GEMINI_API_KEY. Explain what files should and should not be committed.
```

## Prompt 4: Run and Debug Locally

```text
Help me run this FastAPI app locally on Windows PowerShell. Use my virtual
environment, install requirements if needed, run uvicorn main:app --reload,
and help me fix any errors. Do not change the app's purpose.
```

## Prompt 5: Save My First Change to GitHub

```text
I made a small change to my copied speech coach app. Help me save it to GitHub.
Explain git status, git add, git commit, and git push in beginner-friendly
language. Before committing, confirm that .env is not staged.
```

## Prompt 6: Deploy to Render

```text
Help me deploy this FastAPI app to Render. Tell me the exact build command,
start command, and environment variable I need. Explain each setting in plain
language. If the deployment fails, use the Render logs to identify the problem
and suggest a fix.
```

## Prompt 7: Improve the App

```text
Improve the styling and usefulness of this speech coach app without changing
the stack. Keep Python/FastAPI as the backend. Make the page clearer, improve
the loading and error states, and make the critique easier for a student to act on.
```

## Prompt 8: Understand the Python

```text
Explain main.py to me like I am learning Python. Show me what FastAPI is doing,
where Gemini is called, what validation means, and how the response gets back
to the browser. Use short sections and simple examples.
```

## Prompt 9: Reflect on the Build

```text
Help me write a short reflection about this project. I need to answer:
What part was Python? What part was deployment? What broke? What did I improve?
Keep it honest and specific.
```
