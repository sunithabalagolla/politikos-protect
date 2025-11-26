# 🚀 Deployment Guide - Politikos Protect

## Complete FREE Deployment on Render

This guide will help you deploy your full-stack application for **FREE** using Render.

---

## Prerequisites

✅ GitHub account (you have this!)
✅ MongoDB Atlas account (free)
✅ Render account (free - we'll create this)

---

## Step 1: Set Up MongoDB Atlas (FREE Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or Email
3. Choose **FREE** tier (M0 Sandbox)

### 1.2 Create a Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select region: **Singapore** (closest to India)
4. Click "Create"

### 1.3 Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `politikos-admin`
4. Password: Generate a strong password (SAVE THIS!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### 1.4 Allow Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. It looks like: `mongodb+srv://politikos-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<password>` with your actual password
6. **SAVE THIS CONNECTION STRING!**

---

## Step 2: Push Code to GitHub

### 2.1 Commit All Changes
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

---

## Step 3: Deploy on Render

### 3.1 Create Render Account
1. Go to https://render.com/
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### 3.2 Deploy Backend (API)

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your `politikos-protect` repository
4. Configure:
   - **Name**: `politikos-api`
   - **Region**: Singapore
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables (click "Advanced"):
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<generate-random-string-here>
   JWT_EXPIRE=7d
   ```

   **To generate JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **SAVE YOUR API URL**: `https://politikos-api.onrender.com`

### 3.3 Deploy Frontend

1. Click "New +" → "Static Site"
2. Connect your GitHub repository again
3. Select your `politikos-protect` repository
4. Configure:
   - **Name**: `politikos-frontend`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

5. Add Environment Variable:
   ```
   VITE_API_URL=https://politikos-api.onrender.com
   ```

6. Click "Create Static Site"
7. Wait for deployment (5-10 minutes)
8. **YOUR APP IS LIVE!** 🎉

---

## Step 4: Update Client API URL

After backend is deployed, update the frontend to point to your production API:

1. In Render dashboard, go to your frontend service
2. Go to "Environment"
3. Update `VITE_API_URL` to your backend URL
4. Click "Save Changes"
5. Render will automatically redeploy

---

## Step 5: Test Your Deployment

1. Visit your frontend URL: `https://politikos-frontend.onrender.com`
2. Try registering a new user
3. Try logging in
4. Test all features

---

## Important Notes

### Free Tier Limitations:
- ⚠️ **Services sleep after 15 minutes of inactivity**
- First request after sleep takes 30-60 seconds to wake up
- 512 MB RAM
- Shared CPU
- Perfect for development/testing!

### To Keep Services Awake:
Use a service like **UptimeRobot** (free) to ping your API every 10 minutes.

---

## Troubleshooting

### Backend Won't Start
- Check MongoDB connection string is correct
- Ensure password doesn't have special characters (or URL encode them)
- Check Render logs for errors

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly
- Check backend is running (visit API URL in browser)
- Check CORS settings in backend

### Database Connection Failed
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check database user credentials
- Ensure connection string format is correct

---

## Custom Domain (Optional)

### Add Your Own Domain:
1. Buy domain from Namecheap/GoDaddy
2. In Render, go to your service → "Settings" → "Custom Domain"
3. Add your domain
4. Update DNS records as instructed
5. SSL certificate is automatic!

---

## Environment Variables Reference

### Backend (.env):
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/politikos
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRE=7d
CLIENT_URL=https://politikos-frontend.onrender.com
```

### Frontend (.env):
```
VITE_API_URL=https://politikos-api.onrender.com
```

---

## Monitoring Your App

### Render Dashboard:
- View logs in real-time
- Monitor resource usage
- See deployment history
- Check service health

### MongoDB Atlas:
- Monitor database performance
- View connection metrics
- Set up alerts

---

## Updating Your App

### To Deploy Updates:
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. Render automatically detects changes and redeploys!

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| Render Backend | FREE |
| Render Frontend | FREE |
| MongoDB Atlas | FREE (512MB) |
| SSL Certificate | FREE |
| **TOTAL** | **₹0 / $0** |

---

## Next Steps After Deployment

1. ✅ Add email verification (OTP)
2. ✅ Set up monitoring
3. ✅ Add analytics
4. ✅ Configure backups
5. ✅ Add custom domain

---

## Support

If you face any issues:
1. Check Render logs
2. Check MongoDB Atlas metrics
3. Review this guide
4. Ask me for help!

---

**🎉 Congratulations! Your app is now live on the internet!**

Share your URL with friends and start getting users! 🚀
