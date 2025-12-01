# Quick Setup Guide

## First Time Setup

### Step 1: Install Dependencies

Run this command from the project root directory:

```bash
npm run install-all
```

This will install dependencies for both backend and frontend.

### Step 2: Configure Backend

1. Navigate to the `backend` folder
2. Create a `.env` file by copying `.env.example`:
   ```bash
   cd backend
   cp .env.example .env
   ```
3. Edit `.env` if needed (default settings should work)

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
net start MongoDB
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 4: Run the Application

**Option 1: Run Manually (Recommended)**

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Wait until you see: `✓ Server running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
The browser will open automatically at `http://localhost:3000`

**Option 2: Using Root Scripts**

From the project root:

**Terminal 1:**
```bash
npm run dev-backend
```

**Terminal 2:**
```bash
npm run frontend
```

## Verify Installation

1. Backend API should be accessible at: `http://localhost:5000/api`
2. Frontend should open automatically at: `http://localhost:3000`
3. You should see the Student Attendance Manager interface

## Common Issues

### Issue: MongoDB Connection Failed
**Solution:** 
- Make sure MongoDB is installed and running
- Check if MongoDB is running on the default port (27017)
- Try using `127.0.0.1` instead of `localhost` in `.env`

### Issue: Port 5000 Already in Use
**Solution:**
- Change the `PORT` value in `backend/.env` to another port (e.g., 5001)
- Update the proxy in `frontend/package.json` to match

### Issue: Port 3000 Already in Use
**Solution:**
- When prompted, press `Y` to run on a different port (3001)
- Or set `PORT=3001` before running: `PORT=3001 npm start`

### Issue: Dependencies Installation Failed
**Solution:**
- Delete `node_modules` folders and `package-lock.json` files
- Run `npm install` separately in backend and frontend directories
- Make sure you have Node.js v14 or higher

## Next Steps

Once everything is running:

1. **Add Students:** Go to the "Student Management" tab and add some students
2. **Mark Attendance:** Switch to "Mark Attendance" tab and mark today's attendance
3. **View Summary:** Check the "Monthly Summary" tab to see attendance reports

## Need Help?

Refer to the main [README.md](README.md) for detailed documentation and API endpoints.

## Hosting Guide

This guide shows several practical ways to host the Student Attendance Manager (backend: Node/Express, frontend: React). Pick the option that fits your budget and needs.

Prerequisites (common)
- Push code to a Git remote (GitHub/GitLab) or make the repository available on the server.
- Create production environment variables: at minimum `MONGO_URI`, `PORT` (backend), and any secrets used by your app.
- Use MongoDB Atlas (recommended) or a managed MongoDB. If using Atlas, copy the connection string and replace credentials and DB name.

Quick build commands (project root, Windows PowerShell):
```powershell
# Build frontend
cd frontend; npm install; npm run build
# Install backend deps
cd ..\backend; npm install --production
```

Option A — VPS (DigitalOcean / AWS EC2 / Linode) — single server running backend + frontend
1. Provision an Ubuntu droplet (or other Linux server).
2. Install Node.js, Nginx, and optionally PM2:
   - sudo apt update && sudo apt install -y nginx
   - Install Node (recommended via NodeSource) and Git
   - sudo npm install -g pm2
3. Get or configure your MongoDB:
   - Use MongoDB Atlas and set `MONGO_URI` in the server environment, or
   - Install MongoDB on the server and make sure it binds to the correct interface.
4. Clone repo on server, install dependencies and build frontend:
   - git clone <repo>
   - cd repo/backend; npm ci --only=production
   - cd ../frontend; npm ci; npm run build
5. Serve frontend from backend (recommended): in `backend/server.js` serve `frontend/build` as static assets (Express: `app.use(express.static(path.join(__dirname, '../frontend/build')))` and fallback to `index.html`). Then start backend:
   - pm2 start server.js --name attendance-backend
6. Configure Nginx as reverse proxy (example site block):
   - Proxy `example.com` to your Node app running on port 5000 and enable gzip/static caching.
7. Obtain TLS cert with Certbot:
   - sudo apt install certbot python3-certbot-nginx
   - sudo certbot --nginx -d example.com

Option B — Managed platforms (fastest):
- Backend: Render / Railway / Fly.io / Heroku alternative (Heroku deprecated free tier). Create a new service, connect your GitHub repo, set build and start commands and environment variables (`MONGO_URI`, `PORT`, `NODE_ENV=production`). For Node: Build: `npm install` Start: `npm start` or `node server.js`.
- Frontend: Vercel or Netlify. Point to the `frontend` folder as the project root, set build command `npm run build` and publish directory `build`. On Vercel, you can host frontend and also set rewrites if calling API path.
- When using separate hosts, set the frontend to call the full backend URL (e.g., `https://api.example.com`) or update `frontend/package.json` proxy only for local dev.

Option C — Docker (recommended for repeatable deployments)
- Add Dockerfiles for backend and frontend, optionally a `docker-compose.yml` for local testing.
- Example workflow:
  - Build frontend image that runs `npm run build` and serves static files with a lightweight server (nginx or serve)
  - Build backend image that runs `node server.js`
  - Use Docker Compose to link backend and a managed MongoDB or point backend to Atlas.
- Deploy containers to any container service (DigitalOcean App Platform, AWS ECS, Google Cloud Run, Fly.io).

Essential environment variables
- MONGO_URI: MongoDB connection string (Atlas recommended)
- PORT: backend port (default 5000)
- NODE_ENV=production
- Any secret keys (JWT_SECRET, etc.) used by your app

Domain, HTTPS & DNS
- Point an A record to your server IP (VPS) or use the platform's instructions for custom domains.
- Always enable HTTPS (Let's Encrypt via Certbot for VPS or platform-managed TLS on Render/Vercel/Netlify).

Backups, monitoring and maintenance
- If using Atlas, enable automated backups and monitoring.
- Use PM2 logs and monitoring or a platform's logs/metrics for crash detection.
- Schedule regular `npm audit` and dependency updates.

CI/CD (recommended)
- Connect your GitHub/GitLab repo to the hosting platform for automatic deploys on push to main.
- Alternatively create a simple GitHub Actions workflow to build and push Docker images or trigger remote deploy commands.

Troubleshooting tips
- If CORS issues appear, configure CORS on the backend to allow the deployed frontend origin.
- If port conflicts appear, ensure your Node app uses the `PORT` env var and Nginx proxies to that port.
- For database connectivity errors, test the `MONGO_URI` locally with a simple Node script to validate access.

Need help creating deployment files (Dockerfile, docker-compose, Nginx site config, or a Render/Vercel step-by-step)? Reply which hosting option you prefer and I will add the exact files and commands.

---

Happy tracking! 📊✅

