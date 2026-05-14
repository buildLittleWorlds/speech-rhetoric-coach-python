# Session 4: Build and Deploy a Python Speech Coach

Today you are rebuilding the project as a real Python web app.

The goal is not just to make something run once. The goal is to learn the professional workflow:

1. Build the app on your computer.
2. Save it in GitHub.
3. Deploy it online with Render.
4. Improve the styling and critique quality.

Instructor example repo:

```text
https://github.com/buildLittleWorlds/speech-rhetoric-coach-python
```

## What You Are Building

You will build a FastAPI app that:

- lets a user paste a short speech,
- asks for the intended audience,
- sends the speech to Gemini from a Python backend,
- returns a rhetorical critique with audience-fit feedback and revision moves.

This is a Python-first project. HTML, CSS, and JavaScript make the interface feel polished, but Python is the center of the app.

## Install Checklist

Make sure you have these before starting:

- Python 3.12 or newer
- Git
- VS Code or Cursor
- Codex in your Windows environment
- GitHub account
- Render account
- Gemini API key from Google AI Studio

Get a Gemini API key here:

```text
https://aistudio.google.com/apikey
```

Do not share your API key. Do not paste it into GitHub.

## Step 1: Create Your Project Folder

Open PowerShell and choose where you keep coding projects.

Example:

```powershell
cd $HOME\Documents
mkdir speech-rhetoric-coach-python
cd speech-rhetoric-coach-python
```

Open the folder in your editor:

```powershell
code .
```

## Step 2: Create a Virtual Environment

In PowerShell:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then try activation again:

```powershell
.\.venv\Scripts\Activate.ps1
```

You should see `(.venv)` at the start of your terminal line.

## Step 3: Install Requirements

Create a file named `requirements.txt` with:

```text
fastapi
google-genai
jinja2
python-dotenv
uvicorn[standard]
```

Then run:

```powershell
pip install -r requirements.txt
```

## Step 4: Add Your Secret Key Locally

Create a file named `.env`.

Put this inside it:

```text
GEMINI_API_KEY=your_real_key_here
```

Replace `your_real_key_here` with your actual Gemini API key.

Also create `.gitignore`:

```text
.env
.venv/
__pycache__/
*.pyc
```

This keeps your secret key out of GitHub.

## Step 5: Build the App

Your project should have this structure:

```text
speech-rhetoric-coach-python/
  main.py
  requirements.txt
  .env
  .gitignore
  templates/
    index.html
  static/
    styles.css
    app.js
```

Use Codex to help create these files. A good prompt is:

```text
Build a FastAPI app for a rhetorical speech coach. It should have main.py,
templates/index.html, static/styles.css, and static/app.js. The user should
paste a speech, enter an audience, occasion, and goal, and the Python backend
should call Gemini using GEMINI_API_KEY from .env. Return audience-fit score,
what connects, risks, ethos/pathos/logos notes, and three revision moves.
Do not put the API key in code.
```

## Step 6: Run Locally

In PowerShell, with your virtual environment active:

```powershell
uvicorn main:app --reload
```

Open:

```text
http://127.0.0.1:8000
```

Test the app with a short speech.

## Step 7: Save to GitHub

In PowerShell:

```powershell
git init
git add .
git commit -m "Initial Python speech coach app"
```

Create a new GitHub repo named:

```text
speech-rhetoric-coach-python
```

Then follow GitHub's commands to connect your local folder and push.

It will look something like this:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python.git
git push -u origin main
```

Before pushing, check that `.env` is not included:

```powershell
git status
```

If `.env` appears, stop and fix `.gitignore`.

## Step 8: Deploy on Render

Go to:

```text
https://render.com
```

Create a new Web Service from your GitHub repo.

Use these settings:

```text
Build command:
pip install -r requirements.txt

Start command:
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Add an environment variable:

```text
GEMINI_API_KEY = your_real_key_here
```

Deploy the app. Render will give you a public URL ending in:

```text
.onrender.com
```

## Troubleshooting

### Missing API Key

If the app says `GEMINI_API_KEY is missing`, then either:

- `.env` is missing locally,
- the key name is misspelled,
- or Render does not have the environment variable set.

### ModuleNotFoundError

If Python says a package is missing:

```powershell
pip install -r requirements.txt
```

Make sure your virtual environment is active first.

### Render Works Slowly at First

Free Render apps may sleep when nobody uses them. The first visit after a pause can be slow. That is normal.

### Local Works, Render Fails

Most likely Render does not have `GEMINI_API_KEY` set. Local `.env` files do not upload to Render.

### Privacy

Do not paste private or sensitive speeches into a free API demo. Use practice speeches or public examples.

## What to Submit

Submit:

- your GitHub repo link,
- your Render app link,
- a screenshot of the app,
- one short note about what broke or what you improved.
