# 📋 Deployment Checklist

## Before You Start
- [ ] Code is working locally
- [ ] All changes committed to Git
- [ ] GitHub repository is up to date

## Step 1: MongoDB Atlas Setup (10 minutes)
- [ ] Create MongoDB Atlas account
- [ ] Create FREE cluster (M0)
- [ ] Create database user
- [ ] Allow network access (0.0.0.0/0)
- [ ] Copy connection string
- [ ] Replace `<password>` in connection string

## Step 2: Prepare Code (2 minutes)
- [ ] Push all code to GitHub
  ```bash
  git add .
  git commit -m "Ready for production"
  git push origin main
  ```

## Step 3: Render Account (2 minutes)
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] Authorize Render

## Step 4: Deploy Backend (10 minutes)
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure backend settings
- [ ] Add environment variables:
  - [ ] NODE_ENV=production
  - [ ] PORT=5000
  - [ ] MONGODB_URI=(your connection string)
  - [ ] JWT_SECRET=(generate random string)
  - [ ] JWT_EXPIRE=7d
- [ ] Click "Create Web Service"
- [ ] Wait for deployment
- [ ] Copy backend URL

## Step 5: Deploy Frontend (10 minutes)
- [ ] Create new Static Site
- [ ] Connect GitHub repository
- [ ] Configure frontend settings
- [ ] Add environment variable:
  - [ ] VITE_API_URL=(your backend URL)
- [ ] Click "Create Static Site"
- [ ] Wait for deployment
- [ ] Copy frontend URL

## Step 6: Test Everything (5 minutes)
- [ ] Visit frontend URL
- [ ] Register new user
- [ ] Login
- [ ] Test main features
- [ ] Check if data saves to database

## Step 7: Share Your App! 🎉
- [ ] Share URL with friends
- [ ] Get feedback
- [ ] Celebrate! 🎊

---

## Quick Commands

### Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Push to GitHub:
```bash
git add .
git commit -m "Production ready"
git push origin main
```

---

## Your URLs (fill these in):

**Backend API:** `https://_____________________.onrender.com`

**Frontend:** `https://_____________________.onrender.com`

**MongoDB:** `mongodb+srv://_____________________.mongodb.net`

---

## Total Time: ~40 minutes
## Total Cost: FREE (₹0)

---

**Need Help?** Check DEPLOYMENT_GUIDE.md for detailed instructions!
