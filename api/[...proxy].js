export default async function handler(req, res) {
  try {
    const { proxy } = req.query; // e.g., ['proxy', 'best-sellers']
    const path = proxy.slice(1).join('/'); // removes 'proxy'
    const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';

    const targetUrl = `http://64.227.179.189:8000/api/${path}${query}`;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined,
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