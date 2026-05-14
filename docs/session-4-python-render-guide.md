# Session 4: Build and Deploy a Python Speech Coach

Today you are starting from a working example and turning it into your own Python web app.

You do **not** need to understand every command before you start. The goal is to learn the workflow by doing it slowly:

```text
copy a starter project -> run it on your computer -> save it in GitHub -> deploy it on Render -> make one improvement
```

Instructor example repo:

```text
https://github.com/buildLittleWorlds/speech-rhetoric-coach-python
```

## What These Words Mean

**GitHub repo**: A project folder saved online. It stores your code and its history.

**Fork**: A button on GitHub that makes your own copy of someone else's repo.

**Clone**: Download a GitHub repo onto your computer so you can edit it.

**Commit**: Save a checkpoint of your code.

**Push**: Send your local commits back up to GitHub.

**Render**: A website that can run your app online.

**Environment variable**: A secret setting, such as an API key, that your app can read without putting the secret directly in code.

**`.env` file**: A local-only file where you store secrets on your computer. This file should never be uploaded to GitHub.

## What You Are Building

You will build a FastAPI app that:

- lets a user paste a short speech,
- asks for the intended audience,
- sends the speech to Gemini from a Python backend,
- returns a rhetorical critique with audience-fit feedback and revision moves.

This is a Python-first project. HTML, CSS, and JavaScript make the page look polished, but Python is the center of the app.

## What You Need

Make sure you have:

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

Important: do not share your API key. Do not paste it into GitHub.

## Step 1: Make Your Own Copy on GitHub

Open the starter repo:

```text
https://github.com/buildLittleWorlds/speech-rhetoric-coach-python
```

Click **Fork**.

That creates your own copy of the project under your GitHub account.

If GitHub asks for a name, use:

```text
speech-rhetoric-coach-python
```

After the fork is created, you should be on a page like:

```text
https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python
```

## Step 2: Download Your Copy to Your Computer

On your forked GitHub repo, click the green **Code** button.

Copy the HTTPS URL. It should look like:

```text
https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python.git
```

Open PowerShell and go to the place where you keep coding projects:

```powershell
cd $HOME\Documents
```

Download the repo:

```powershell
git clone https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python.git
```

Move into the project folder:

```powershell
cd speech-rhetoric-coach-python
```

Open it in your editor:

```powershell
code .
```

## Step 3: Create a Python Virtual Environment

A virtual environment is a private Python toolbox for this one project.

In PowerShell:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then try again:

```powershell
.\.venv\Scripts\Activate.ps1
```

You should see `(.venv)` at the start of your terminal line.

## Step 4: Install the Python Packages

The project already has a file named `requirements.txt`. It lists the Python packages the app needs.

Install them:

```powershell
pip install -r requirements.txt
```

If this works, you have installed FastAPI, Gemini, and the other project tools.

## Step 5: Add Your Gemini API Key Locally

The repo includes `.env.example`, which is a safe example file.

Make your own private `.env` file:

```powershell
copy .env.example .env
```

Open `.env` in your editor and replace `your_key_here` with your real Gemini API key:

```text
GEMINI_API_KEY=your_real_key_here
```

Do not commit `.env`. It is already listed in `.gitignore`, which tells Git to ignore it.

Check:

```powershell
git status
```

If `.env` appears in the list, stop and ask for help.

## Step 6: Run the App on Your Computer

With the virtual environment active, run:

```powershell
uvicorn main:app --reload
```

Open this in your browser:

```text
http://127.0.0.1:8000
```

Try the sample speech. If it returns a critique, the local app is working.

## Step 7: Understand the Project Files

You do not need to memorize everything, but you should know what each part does:

```text
main.py                  Python backend and Gemini call
templates/index.html     Web page structure
static/styles.css        Visual design
static/app.js            Browser behavior and loading state
requirements.txt         Python packages
.env                     Your private local API key, not uploaded
.env.example             Safe example of the secret file
render.yaml              Render deployment settings
```

The most important Python file is:

```text
main.py
```

That is where FastAPI receives the speech, checks the inputs, calls Gemini, and sends the critique back to the browser.

## Step 8: Save a Small Change to GitHub

Make one small change first. For example, change the heading in `templates/index.html` or adjust one color in `static/styles.css`.

Then save a checkpoint:

```powershell
git status
git add .
git commit -m "Customize speech coach app"
git push
```

What happened:

- `git status` shows what changed.
- `git add .` chooses the changed files.
- `git commit` saves a checkpoint.
- `git push` sends the checkpoint to GitHub.

## Step 9: Deploy on Render

Go to:

```text
https://render.com
```

Create a new **Web Service** from your GitHub repo.

Choose your forked repo:

```text
YOUR_USERNAME/speech-rhetoric-coach-python
```

Use these settings:

```text
Build command:
pip install -r requirements.txt

Start command:
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Add this environment variable in Render:

```text
GEMINI_API_KEY = your_real_key_here
```

Render will give you a public URL ending in:

```text
.onrender.com
```

Open the URL and test the app.

## Step 10: Make One Real Improvement

Choose one:

- improve the styling,
- improve the prompt in `main.py`,
- add a new critique category,
- change the sample speech,
- make the error message clearer,
- make the output easier to read.

After you make the change:

```powershell
git add .
git commit -m "Improve speech coach app"
git push
```

Render should redeploy from GitHub.

## Troubleshooting

### I Do Not Know If I Am in the Right Folder

Run:

```powershell
dir
```

You should see files like:

```text
main.py
requirements.txt
templates
static
```

### My Virtual Environment Is Not Active

Run:

```powershell
.\.venv\Scripts\Activate.ps1
```

You should see `(.venv)` at the start of the terminal line.

### A Package Is Missing

Run:

```powershell
pip install -r requirements.txt
```

### The App Says `GEMINI_API_KEY is missing`

Check:

- Did you create `.env`?
- Is the key name exactly `GEMINI_API_KEY`?
- Did you add the key to Render too?

Local `.env` files do not upload to Render.

### Render Is Slow at First

Free Render apps may sleep when nobody uses them. The first visit after a pause can be slow. That is normal.

### I Am Worried About My API Key

Run:

```powershell
git status
```

If `.env` appears, stop. Do not commit. Ask for help.

### Privacy

Do not paste private or sensitive speeches into a free API demo. Use practice speeches or public examples.

## What to Submit

Submit:

- your GitHub repo link,
- your Render app link,
- a screenshot of the app,
- one short reflection:
  - What part was Python?
  - What part was deployment?
  - What broke?
  - What did you improve?
