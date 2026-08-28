export default async function handler(req, res) {
  // Allow requests from your test page, website, or Chrome extension
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle browser preflight check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    // This is where you will later use your secret API key safely:
    // const apiKey = process.env.YOUR_SECRET_API_KEY;

    // For now, this echoes back your text to verify connection
    return res.status(200).json({ 
      success: true, 
      receivedPrompt: prompt,
      message: "Successfully connected to your Vercel backend!" 
    });
    
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
