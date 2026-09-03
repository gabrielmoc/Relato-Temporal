import cors from 'cors'
import express from 'express'
import { posts } from './posts.js'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/posts', (_request, response) => {
  response.json({ data: posts })
})

app.get('/api/posts/:slug', (request, response) => {
  const post = posts.find((item) => item.slug === request.params.slug)

  if (!post) return response.status(404).json({ error: 'Post não encontrado.' })

  return response.json({ data: post })
})

app.listen(port, () => {
  console.log(`Relato API disponível em http://localhost:${port}`)
})
