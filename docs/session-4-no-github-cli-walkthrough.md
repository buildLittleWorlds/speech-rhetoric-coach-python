# Session 4: GitHub Without GitHub CLI

This walkthrough uses:

- **GitHub in the browser** for creating or copying the online repo.
- **Git in PowerShell** for local commands.

It does **not** use the GitHub CLI command `gh`.

## The Difference

**Git** is the command-line tool that saves code history on your computer.

**GitHub** is the website where your code is stored online.

**GitHub CLI (`gh`)** is an optional extra tool. We are not using it.

## Part A: Shawn's Path, Starting from the Starter Repo

### In GitHub, in the browser

1. Go to:

   ```text
   https://github.com/buildLittleWorlds/speech-rhetoric-coach-python
   ```

2. Click **Fork**.

3. GitHub will create a copy under your account.

4. Your new repo URL should look like:

   ```text
   https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python
   ```

5. Click the green **Code** button.

6. Copy the HTTPS clone URL. It should look like:

   ```text
   https://github.com/YOUR_USERNAME/speech-rhetoric-coach-python.git
   ```

### In PowerShell, locally

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

## Part B: Instructor Demo Path, If You Cannot Fork Your Own Repo

GitHub may not let you fork your own repo into the same account. To demonstrate the full process anyway, make a fresh copy manually.

### In PowerShell, locally

Start somewhere clean:

```powershell
cd $HOME\Documents
```

Download the starter repo into a new folder:

```powershell
git clone https://github.com/buildLittleWorlds/speech-rhetoric-coach-python.git speech-rhetoric-coach-demo-walkthrough
```

Move into the new folder:

```powershell
cd speech-rhetoric-coach-demo-walkthrough
```

Remove the old Git history so this becomes a fresh project:

```powershell
Remove-Item -Recurse -Force .git
```

Start a new Git history:

```powershell
git init
git add .
git commit -m "Start from Python speech coach starter"
```

### In GitHub, in the browser

1. Go to:

   ```text
   https://github.com/new
   ```

2. Repository name:

   ```text
   speech-rhetoric-coach-demo-walkthrough
   ```

3. Choose **Public**.

4. Do **not** add a README, `.gitignore`, or license.

5. Click **Create repository**.

6. GitHub will show setup commands. You only need the repo URL, which will look like:

   ```text
   https://github.com/YOUR_USERNAME/speech-rhetoric-coach-demo-walkthrough.git
   ```

### Back in PowerShell, locally

Connect your local folder to the empty GitHub repo:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/speech-rhetoric-coach-demo-walkthrough.git
```

Rename the branch to `main`:

```powershell
git branch -M main
```

Push your code to GitHub:

```powershell
git push -u origin main
```

Now refresh the GitHub page. Your files should appear.

## Part C: Run the App Locally

Create a virtual environment:

```powershell
py -3 -m venv .venv
```

Activate it:

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

## Safe Rule

Never type a real API key into:

- GitHub files,
- Codex chat,
- Classroom,
- README files,
- screenshots.

Use `.env` locally and Render environment variables online.
