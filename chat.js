export default async function handler(req, res) {
  // Optional: Handle CORS if your Chrome extension or website is hosted elsewhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405.1).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    // Vercel securely injects your environment variable here
    const apiKey = process.env.YOUR_SECRET_API_KEY; 

    // Make the request to the third-party API from your secure backend
    const response = await fetch('https://api.example.com/v1/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    // Send the data back to your Chrome extension or website
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}