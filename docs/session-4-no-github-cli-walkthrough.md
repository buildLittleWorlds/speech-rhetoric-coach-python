# Session 4: GitHub Without GitHub CLI

This walkthrough uses:

- **GitHub in the browser** for creating the online repo from a template.
- **Git in PowerShell** for local commands.

It does **not** use the GitHub CLI command `gh`.

## The Difference

**Git** is the command-line tool that saves code history on your computer.

**GitHub** is the website where your code is stored online.

**GitHub CLI (`gh`)** is an optional extra tool. We are not using it.

**Template repo** means a starter repo that GitHub can copy into a brand-new repo for you.

## Part A: Create Your Repo from the Template

### In GitHub, in the browser

1. Go to:

   ```text
   https://github.com/buildLittleWorlds/speech-rhetoric-coach-python
   ```

2. Click **Use this template**.

3. Click **Create a new repository**.

4. Repository name:

   ```text
   speech-rhetoric-coach-python
   ```

5. Choose **Public**.

6. Click **Create repository**.

7. Your new repo URL should look like:

   ```text
   https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python
   ```

8. Click the green **Code** button.

9. Copy the HTTPS clone URL. It should look like:

   ```text
   https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python.git
   ```

## Part B: Download Your Repo Locally

### In PowerShell

Go to the folder where you keep coding projects:

```powershell
cd $HOME\Documents
```

Download your GitHub repo:

```powershell
git clone https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python.git
```

Move into the project:

```powershell
cd speech-rhetoric-coach-python
```

Open it:

```powershell
code .
```

Now you have:

- a repo online in GitHub,
- a matching project folder on your computer,
- a connection between the two.

## Part C: Run the App Locally

Create a virtual environment:

```powershell
py -3 -m venv .venv
```

Activate it:

```powershell
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

Install the Python packages:

```powershell
pip install -r requirements.txt
```

Create your private `.env` file:

```powershell
copy .env.example .env
```

Open `.env` and add your real Gemini key:

```text
GEMINI_API_KEY=your_real_key_here
```

Run the app:

```powershell
uvicorn main:app --reload
```

Open:

```text
http://127.0.0.1:8000
```

## Part D: Save a Change

Make one small change, such as editing the page title or a color.

Check what changed:

```powershell
git status
```

Important: `.env` should not appear.

Stage the safe changes:

```powershell
git add .
```

Commit the change:

```powershell
git commit -m "Customize speech coach app"
```

Push it:

```powershell
git push
```

Refresh GitHub in the browser. Your commit should appear.

## Part E: Deploy on Render

### In Render, in the browser

1. Go to:

   ```text
   https://render.com
   ```

2. Create a new **Web Service**.

3. Connect your GitHub account if Render asks.

4. Choose your repo.

5. Use these settings:

   ```text
   Build command:
   pip install -r requirements.txt

   Start command:
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

6. Add environment variable:

   ```text
   GEMINI_API_KEY = your_real_key_here
   ```

7. Deploy.

Render will give you a public URL. Test the same sample speech there.

## Instructor Demo Note

Because the starter repo is now a GitHub template, the instructor can use the exact same path:

```text
Use this template -> create a new repo -> clone it -> run it -> deploy it
```

No manual copying, deleting `.git`, or GitHub CLI is needed.

## Safe Rule

Never type a real API key into:

- GitHub files,
- Codex chat,
- Classroom,
- README files,
- screenshots.

Use `.env` locally and Render environment variables online.
