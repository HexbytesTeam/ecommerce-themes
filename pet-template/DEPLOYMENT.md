# FocoPet Deployment & Tracking Guide

## GitHub Tracking
1. Initialize Git in the root folder:
   ```bash
   git init
   ```
2. Create a `.gitignore` (Next.js already has one, add `backend/node_modules` and `backend/.env`).
3. Add and commit files:
   ```bash
   git add .
   ```
4. Create a new repository on GitHub and link it:
   ```bash
   git remote add origin https://github.com/your-username/pet-template.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

### Frontend (Next.js)
1. Import your repository into Vercel.
2. Vercel will automatically detect Next.js settings.
3. Deploy!

### Backend (Express)
1. You can deploy the backend as a **Serverless Function** on Vercel by adding a `vercel.json` file in the root:
   ```json
   {
     "rewrites": [{ "source": "/api/(.*)", "destination": "/backend/index.js" }]
   }
   ```
2. Alternatively, deploy to **Render** or **Railway** for a persistent Node.js server.
3. Set your `MONGODB_URI` environment variable in the deployment platform (e.g., MongoDB Atlas connection string).
