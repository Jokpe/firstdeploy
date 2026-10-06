const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Visitor data file
const VISITORS_FILE = path.join(__dirname, 'data', 'visitors.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Initialize visitors file if it doesn't exist
async function initializeVisitorsFile() {
  try {
    await fs.access(VISITORS_FILE);
  } catch {
    const initialData = {
      totalVisitors: 0,
      uniqueVisitors: 0,
      visits: [],
      dailyStats: {},
      referrerStats: {}
    };
    await fs.writeFile(VISITORS_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Get visitor data
async function getVisitorData() {
  try {
    const data = await fs.readFile(VISITORS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading visitor data:', error);
    return null;
  }
}

// Save visitor data
async function saveVisitorData(data) {
  try {
    await fs.writeFile(VISITORS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving visitor data:', error);
  }
}

// Track visitor
app.post('/api/track-visitor', async (req, res) => {
  try {
    const { userAgent, referrer, timestamp } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress;
    
    let visitorData = await getVisitorData();
    if (!visitorData) {
      return res.status(500).json({ error: 'Failed to load visitor data' });
    }

    const visit = {
      ip: clientIp,
      userAgent: userAgent,
      referrer: referrer || 'direct',
      timestamp: timestamp || new Date().toISOString(),
      date: new Date(timestamp || Date.now()).toISOString().split('T')[0]
    };

    // Add visit record
    visitorData.visits.push(visit);
    visitorData.totalVisitors = visitorData.visits.length;

    // Count unique visitors (by IP)
    const uniqueIps = new Set(visitorData.visits.map(v => v.ip));
    visitorData.uniqueVisitors = uniqueIps.size;

    // Update daily stats
    const dateKey = visit.date;
    if (!visitorData.dailyStats[dateKey]) {
      visitorData.dailyStats[dateKey] = 0;
    }
    visitorData.dailyStats[dateKey]++;

    // Update referrer stats
    const referrerKey = visit.referrer;
    if (!visitorData.referrerStats[referrerKey]) {
      visitorData.referrerStats[referrerKey] = 0;
    }
    visitorData.referrerStats[referrerKey]++;

    // Keep only last 10,000 visits to avoid file bloat
    if (visitorData.visits.length > 10000) {
      visitorData.visits = visitorData.visits.slice(-10000);
    }

    await saveVisitorData(visitorData);

    res.json({
      success: true,
      message: 'Visit tracked successfully',
      visitorCount: visitorData.totalVisitors
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ error: 'Failed to track visitor' });
  }
});

// Get visitor statistics
app.get('/api/visitor-stats', async (req, res) => {
  try {
    const visitorData = await getVisitorData();
    if (!visitorData) {
      return res.status(500).json({ error: 'Failed to load visitor data' });
    }

    // Calculate additional stats
    const stats = {
      totalVisits: visitorData.totalVisitors,
      uniqueVisitors: visitorData.uniqueVisitors,
      lastVisit: visitorData.visits.length > 0 
        ? visitorData.visits[visitorData.visits.length - 1].timestamp 
        : null,
      dailyStats: visitorData.dailyStats,
      referrerStats: visitorData.referrerStats,
      topReferrers: Object.entries(visitorData.referrerStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([referrer, count]) => ({ referrer, count }))
    };

    res.json(stats);
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    res.status(500).json({ error: 'Failed to get visitor statistics' });
  }
});

// Get recent visitors
app.get('/api/recent-visitors', async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const visitorData = await getVisitorData();
    if (!visitorData) {
      return res.status(500).json({ error: 'Failed to load visitor data' });
    }

    const recentVisits = visitorData.visits
      .slice(-limit)
      .reverse()
      .map(({ ip, referrer, timestamp, date }) => ({
        ip: ip.split(':').pop(), // Get last part of IP for privacy
        referrer,
        timestamp,
        date
      }));

    res.json(recentVisits);
  } catch (error) {
    console.error('Error getting recent visitors:', error);
    res.status(500).json({ error: 'Failed to get recent visitors' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize and start server
async function startServer() {
  await ensureDataDir();
  await initializeVisitorsFile();

  app.listen(PORT, () => {
    console.log(`✨ Portfolio server running on http://localhost:${PORT}`);
    console.log(`📊 Visitor stats available at http://localhost:${PORT}/api/visitor-stats`);
  });
}

startServer();

module.exports = app;
