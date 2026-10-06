# firstdeploy Portfolio

A beautiful, modern portfolio page for Fekpe John - full-stack & creative developer.

## Features

✨ **Responsive Design** - Works on all devices with glassmorphism UI  
🌓 **Dark Mode** - Toggle between light and dark themes with localStorage persistence  
📊 **Visitor Analytics** - Track page visits with multiple backend options  
🎯 **Interactive Elements** - Smooth animations and hover effects  
📱 **Mobile Optimized** - Full responsive layout for mobile, tablet, and desktop  

## Quick Start (GitHub Pages)

Your portfolio is already live on GitHub Pages:
- **URL**: https://Jokpe.github.io/firstdeploy/

No setup needed! The site works immediately.

## Analytics Options

### Option 1: Google Analytics (FREE, Recommended for GitHub Pages)
**Best for**: GitHub Pages users who want immediate analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your site
3. Get your Measurement ID (looks like `G-XXXXXXXXXX`)
4. I can add the tracking code to your page

### Option 2: Plausible Analytics (Privacy-Focused, Paid)
**Best for**: Privacy-conscious developers

- No cookies, GDPR compliant
- Simple, beautiful dashboard
- ~$9/month for small sites
- Website: https://plausible.io/

### Option 3: Umami (Self-Hosted or Cloud, Free)
**Best for**: Full control + analytics

- Open source
- Privacy-focused
- Free cloud tier available
- Website: https://umami.is/

### Option 4: Local Backend (Full Control, Requires Hosting)
**Best for**: Complete custom solution

Your `server.js` is ready! To deploy it:

**Deploy on Render (FREE tier available):**
1. Push your repo to GitHub (already done ✓)
2. Go to [Render.com](https://render.com)
3. Connect your GitHub repo
4. Create a new Web Service
5. Set start command: `node server.js`
6. Deploy!

**Deploy on Railway (FREE $5/month):**
1. Go to [Railway.app](https://railway.app)
2. Connect GitHub repo
3. Select `server.js` as entrypoint
4. Deploy!

**Deploy on Heroku:**
1. Create account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Run: `heroku create your-app-name`
4. Run: `git push heroku main`

## File Structure

```
firstdeploy/
├── index.html          # Main portfolio page
├── css/
│   └── main.css        # Glassmorphism styling
├── js/
│   └── app.js          # Dark mode, interactions, visitor tracking
└── server.js           # Express backend (optional, for backend deployment)
```

## Customization

Edit `index.html` to:
- Change your name and bio
- Update your skills
- Modify project cards
- Add your social links

Edit `css/main.css` to:
- Change colors (look for hex codes like `#6c5ce7`)
- Adjust spacing and sizes
- Modify animations

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Glassmorphism, animations, dark mode
- **JavaScript** - Dark mode toggle, tracking, interactions
- **Express.js** - Optional backend server
- **Font Awesome** - Icons
- **Google Fonts** - Inter typeface

## Next Steps

Pick one analytics option above and let me know which you prefer. I can:

1. **Add Google Analytics** → Instant setup, works on GitHub Pages
2. **Add Plausible/Umami** → Privacy-focused alternative
3. **Deploy the backend** → Help you deploy `server.js` to Render/Railway
4. **Create a dashboard** → Build a visitor stats page to view analytics

Which would you like? 🚀
