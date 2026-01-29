import type { VercelRequest, VercelResponse } from "vercel"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.query.url as string
  if (!url) return res.status(400).end()

  const r = await fetch(url)
  const buf = await r.arrayBuffer()

  res.setHeader("Content-Type", r.headers.get("content-type") || "image/jpeg")
  res.setHeader("Cache-Control", "public, s-maxage=86400")
  res.send(Buffer.from(buf))
}