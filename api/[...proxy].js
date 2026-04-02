
export default async function handler(req, res) {
  try {
    const { proxy } = req.query; // e.g., ['proxy', 'best-sellers']
    const path = proxy.slice(1).join('/'); // removes 'proxy' from path

    // Preserve query string
    const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';

    // Build full backend URL
    const targetUrl = `http://64.227.179.189:8000/api/${path}${query}`;

    // Forward request
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined, // avoid sending the frontend host
      },
      body: ['GET', 'HEAD'].includes(req.method) ? null : req.body,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
}