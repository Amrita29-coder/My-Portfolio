const PROJECTS = [
  {
    title: 'ShopStream — E-Commerce API',
    cat: 'Full-Stack · Backend',
    emoji: '🌿',
    bg: 'pt-3',
    desc: 'A production-grade REST API powering a multi-vendor e-commerce platform. Supports inventory management, real-time order tracking, and Stripe payment processing.',
    features: [
      'Multi-vendor product and inventory management',
      'Stripe payment integration with webhooks',
      'Real-time order tracking via WebSockets',
      'Redis caching for sub-50ms response times',
      'Comprehensive API documentation with Swagger'
    ],
    tech: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'Redis',
      'Stripe API',
      'Docker',
      'Swagger'
    ],
    live: '#',
    code: '#'
  },
  {
    title: 'ChatFlow — AI Chat Interface',
    cat: 'React · Frontend',
    emoji: '🤖',
    bg: 'pt-4',
    desc: 'A beautiful, streaming-first chat interface for LLM APIs. Features real-time response streaming, markdown rendering, syntax-highlighted code blocks, and conversation history.',
    features: [
      'Streaming response rendering (SSE)',
      'Markdown with syntax-highlighted code blocks',
      'Multi-conversation session management',
      'Model switcher (GPT-4, Claude, Gemini)',
      'Smooth Framer Motion micro-animations'
    ],
    tech: [
      'React',
      'OpenAI API',
      'Framer Motion',
      'React Markdown',
      'Prism.js'
    ],
    live: '#',
    code: '#'
  },
]

// ── LOADER ────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader')
    loader.classList.add('hide')
    setTimeout(() => loader.remove(), 600)
  }, 900)
})

// ── CUSTOM CURSOR ─────────────────────────────────────────────────────────
const dot = document.getElementById('cursorDot')
const ring = document.getElementById('cursorRing')
let mouseX = 0,
  mouseY = 0,
  ringX = 0,
  ringY = 0
window.addEventListener('mousemove', e => {
  mouseX = e.clientX
  mouseY = e.clientY
  dot.style.transform =
    'translate(' + (mouseX - 4) + 'px,' + (mouseY - 4) + 'px)'
})
function animateRing () {
  ringX += (mouseX - ringX - 18) * 0.14
  ringY += (mouseY - ringY - 18) * 0.14
  ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px)'
  requestAnimationFrame(animateRing)
}
animateRing()
document
  .querySelectorAll(
    'a,button,.chip,.proj-card,.cert-card,.ach-card,.svc-card,.stat-box,.filter-tab,.tl-card'
  )
  .forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'))
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'))
  })

// ── THEME ─────────────────────────────────────────────────────────────────
const html = document.documentElement
const themeBtn = document.getElementById('themeBtn')
const savedTheme = localStorage.getItem('portfolioTheme') || 'dark'
let isDark = savedTheme === 'dark'
function applyTheme (dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light')
  themeBtn.textContent = dark ? '🌙' : '☀️'
  localStorage.setItem('portfolioTheme', dark ? 'dark' : 'light')
}
applyTheme(isDark)
themeBtn.addEventListener('click', () => {
  isDark = !isDark
  applyTheme(isDark)
})

// ── NAV SCROLL ────────────────────────────────────────────────────────────
const mainNav = document.getElementById('mainNav')
const backTop = document.getElementById('backTop')
window.addEventListener('scroll', () => {
  const s = window.scrollY
  mainNav.classList.toggle('scrolled', s > 50)
  backTop.classList.toggle('show', s > 400)
})

// ── MOBILE NAV ────────────────────────────────────────────────────────────
const mobileNav = document.getElementById('mobileNav')
document
  .getElementById('hamburger')
  .addEventListener('click', () => mobileNav.classList.add('open'))
document
  .getElementById('mobileClose')
  .addEventListener('click', () => mobileNav.classList.remove('open'))
document
  .querySelectorAll('.mobile-link')
  .forEach(a =>
    a.addEventListener('click', () => mobileNav.classList.remove('open'))
  )

// ── SCROLL SPY ────────────────────────────────────────────────────────────
const navAnchors = document.querySelectorAll('.nav-links a')
const spySections = document.querySelectorAll('section[id]')
const spyObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'))
        const link = document.querySelector(
          '.nav-links a[href="#' + e.target.id + '"]'
        )
        if (link) link.classList.add('active')
      }
    })
  },
  { threshold: 0.3 }
)
spySections.forEach(s => spyObs.observe(s))

// ── TYPEWRITER ────────────────────────────────────────────────────────────
const roles = [
  'Full Stack Developer',
  'Node.js Engineer',
  'UI/UX Craftsman',
  'Java Developer'
]
let ri = 0,
  ci = 0,
  del = false
const tw = document.getElementById('typewriterEl')
function typeLoop () {
  const word = roles[ri]
  if (del) {
    ci--
  } else {
    ci++
  }
  tw.textContent = word.slice(0, ci)
  let t = del ? 55 : 85
  if (!del && ci === word.length) {
    t = 1800
    del = true
  } else if (del && ci === 0) {
    del = false
    ri = (ri + 1) % roles.length
    t = 300
  }
  setTimeout(typeLoop, t)
}
setTimeout(typeLoop, 1200)

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────
const revEls = document.querySelectorAll('.reveal')
const revObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        revObs.unobserve(e.target)
      }
    })
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
)
revEls.forEach(el => revObs.observe(el))

// ── COUNT UP ──────────────────────────────────────────────────────────────
const countEls = document.querySelectorAll('[data-count]')
const countObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const el = e.target
      const target = +el.dataset.count
      let current = 0
      const step = Math.max(1, Math.ceil(target / 60))
      const timer = setInterval(() => {
        current = Math.min(current + step, target)
        el.textContent = current + '+'
        if (current >= target) clearInterval(timer)
      }, 20)
      countObs.unobserve(el)
    })
  },
  { threshold: 0.5 }
)
countEls.forEach(el => countObs.observe(el))

// ── PROJECT FILTER ────────────────────────────────────────────────────────
const filterTabs = document.querySelectorAll('.filter-tab')
const projCards = document.querySelectorAll('.proj-card')
filterTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    filterTabs.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    const f = btn.dataset.filter
    projCards.forEach(card => {
      const cats = card.dataset.category || ''
      const show = f === 'all' || cats.includes(f)
      card.style.display = show ? '' : 'none'
    })
  })
})

// ── PROJECT MODAL ─────────────────────────────────────────────────────────
const modal = document.getElementById('projectModal')
const modalClose = document.getElementById('modalClose')
function openModal (idx) {
  const p = PROJECTS[idx]
  document.getElementById('modalBg').className = 'proj-thumb-bg ' + p.bg
  document.getElementById('modalEmoji').textContent = p.emoji
  document.getElementById('modalCat').textContent = p.cat
  document.getElementById('modalTitle').textContent = p.title
  document.getElementById('modalDesc').textContent = p.desc
  const fl = document.getElementById('modalFeatures')
  fl.innerHTML = p.features.map(f => '<li>' + f + '</li>').join('')
  const tl = document.getElementById('modalTechs')
  tl.innerHTML = p.tech
    .map(t => '<span class="modal-tech">' + t + '</span>')
    .join('')
  const al = document.getElementById('modalActions')
  al.innerHTML =
    '<a href="' +
    p.live +
    '" target="_blank" rel="noopener noreferrer" class="btn btn-primary">↗ Live Demo</a><a href="' +
    p.code +
    '" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">{ } Source Code</a>'
  modal.classList.add('open')
  document.body.style.overflow = 'hidden'
}
function closeModal () {
  modal.classList.remove('open')
  document.body.style.overflow = ''
}
projCards.forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('.proj-link')) return
    openModal(+card.dataset.project)
  })
})
modalClose.addEventListener('click', closeModal)
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal()
})
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal()
})

// ── COPY EMAIL ────────────────────────────────────────────────────────────
function copyEmail () {
  navigator.clipboard.writeText('shivamsaini46324@gmail.com').then(() => {
    const btn = document.getElementById('copyEmailBtn')
    btn.textContent = '✓ copied'
    btn.style.color = 'var(--emerald)'
    btn.style.borderColor = 'var(--emerald)'
    setTimeout(() => {
      btn.textContent = 'copy'
      btn.style.color = ''
      btn.style.borderColor = ''
    }, 2000)
  })
}

// ── CONTACT FORM ──────────────────────────────────────────────────────────
const form = document.getElementById('contactForm')
function setErr (id, errId, hasErr) {
  document.getElementById(id).classList.toggle('err', hasErr)
  document.getElementById(errId).classList.toggle('show', hasErr)
}
form.addEventListener('submit', async e => {
  e.preventDefault()
  const name = document.getElementById('fname').value.trim()
  const email = document.getElementById('femail').value.trim()
  const subject = document.getElementById('fsubject').value.trim()
  const message = document.getElementById('fmessage').value.trim()
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  let valid = true
  setErr('fname', 'fnameErr', !name)
  if (!name) valid = false
  setErr('femail', 'femailErr', !email || !emailRx.test(email))
  if (!email || !emailRx.test(email)) valid = false
  setErr('fsubject', 'fsubjectErr', !subject)
  if (!subject) valid = false
  setErr('fmessage', 'fmessageErr', message.length < 10)
  if (message.length < 10) valid = false
  if (!valid) return
  const btn = document.getElementById('submitBtn')
  const txt = document.getElementById('submitBtnText')
  btn.disabled = true
  txt.textContent = 'Sending...'
  document.getElementById('formSuccess').classList.remove('show')
  document.getElementById('formError').classList.remove('show')
  await new Promise(r => setTimeout(r, 1400))
  // Simulated success (replace with real EmailJS/Formspree call)
  const success = Math.random() > 0.1
  if (success) {
    document.getElementById('formSuccess').classList.add('show')
    form.reset()
  } else {
    document.getElementById('formError').classList.add('show')
  }
  btn.disabled = false
  txt.textContent = 'Send Message →'
})
