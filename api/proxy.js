export default async function handler(req, res) {
  try {
    // Build the target URL
    const targetUrl = 'http://64.227.179.189:8000' + req.url.replace('/api/proxy', '')

    // Forward the request
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined, 
      },
      body: ['GET', 'HEAD'].includes(req.method) ? null : req.body,
    })

    // Get JSON response
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    res.status(500).json({ error: 'Proxy failed', details: err.message })
  }
}