import './style.css'
import dayjs from 'dayjs'

const url = 'https://kqhurmuqzeadcrycdami.supabase.co/rest/v1/article'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxaHVybXVxemVhZGNyeWNkYW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTA5MDAsImV4cCI6MjA5NTM2NjkwMH0.9juGmAsNsI8r4TBwqizjh-QDi8lE8y4cL5Jek-mJaJY'

async function loadArticles() {
  const order = document.getElementById('sort').value
  const response = await fetch(url + '?select=*&order=' + order, {
    headers: {
      apikey: key,
    }
  })
  const data = await response.json()
  const container = document.getElementById('articles')

  if (data.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center">Brak artykułów.</p>'
    return
  }

  let html = ''
  for (let i = 0; i < data.length; i++) {
    const article = data[i]
    const date = dayjs(article.created_at).format('DD-MM-YYYY')
    html += `
      <div class="bg-white rounded shadow p-6">
        <h2 class="text-xl font-bold">${article.title}</h2>
        <p class="text-gray-500 text-sm">${article.subtitle}</p>
        <p class="text-gray-400 text-xs mb-3">Autor: ${article.author} · ${date}</p>
        <p>${article.content}</p>
      </div>
    `
  }
  container.innerHTML = html
}

document.getElementById('sort').addEventListener('change', function() {
  loadArticles()
})

document.getElementById('form').addEventListener('submit', async function(e) {
  e.preventDefault()

  const title = document.getElementById('title').value
  const subtitle = document.getElementById('subtitle').value
  const author = document.getElementById('author').value
  const content = document.getElementById('content').value
  const created_at = document.getElementById('created_at').value

  const body = { title, subtitle, author, content }
  if (created_at) {
    body.created_at = created_at
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })

  if (response.status !== 201) {
    console.error('Błąd przy dodawaniu artykułu')
    return
  }

  document.getElementById('form-message').classList.remove('hidden')
  e.target.reset()
  loadArticles()
})

loadArticles()
