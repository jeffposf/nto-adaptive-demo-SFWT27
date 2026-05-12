import './style.css'
import { STATES } from './data/scenarios.js'
import { PRODUCTS, BIJOUX, SPOTLIGHT } from './data/products.js'

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let currentState = 0
let chatOpen = false
let selectedDate = 'Vendredi 13 juin'
let selectedTime = '14h30'
let likedProducts = new Set()
let msgTime = 0

function getTime() {
  const base = 10 * 60 + 17 + msgTime
  const h = Math.floor(base / 60)
  const m = base % 60
  msgTime += 1
  return `${h}:${m.toString().padStart(2, '0')}`
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyState(0)
  const apptBtn = document.getElementById('appt-cta-btn')
  if (apptBtn) apptBtn.addEventListener('click', () => openApptModal())
  document.addEventListener('click', (e) => {
    if (e.target.matches('.spotlight-cta-secondary')) openApptModal()
    if (e.target.matches('.spotlight-cta-primary')) window.location.href = '/product.html'
  })
})

/* ══════════════════════════════════════
   APPLY STATE
══════════════════════════════════════ */
function applyState(stateId) {
  const state = STATES[stateId]
  if (!state) return

  currentState = stateId
  document.body.setAttribute('data-state', stateId)

  if (stateId === 6) { openApptModal(); updateChatConversation(state.chat); return }
  if (stateId === 7) { showConfirmation(); updateChatConversation(state.chat); return }


  const main = document.getElementById('main-content')
  main.style.opacity = '0'

  setTimeout(() => {
    renderMemberBar(state)
    renderPromoBanner(state)
    renderNav(state)

    const isCategoryMode = stateId >= 4
    toggleSections(isCategoryMode)

    if (isCategoryMode) {
      renderCategoryHeader(state)
      renderJewelleryGrid(state.jewelleryScoreKey || 'default')
      renderInsightBar(state)
    } else {
      renderHero(state)
      renderEditorial(state)
      renderProducts(state)
    }

    renderAppointmentSection(state)
    updateChatConversation(state.chat)

    main.style.transition = 'opacity 0.4s ease'
    main.style.opacity = '1'
  }, 350)
}

/* ══════════════════════════════════════
   TOGGLE SECTIONS
══════════════════════════════════════ */
function toggleSections(categoryMode) {
  const hero      = document.getElementById('hero-section')
  const editorial = document.getElementById('editorial-section')
  const products  = document.getElementById('product-section')
  const category  = document.getElementById('category-section')
  if (categoryMode) {
    hero.classList.add('hidden')
    editorial.classList.add('hidden')
    products.classList.add('hidden')
    category.classList.remove('hidden')
  } else {
    hero.classList.remove('hidden')
    editorial.classList.remove('hidden')
    products.classList.remove('hidden')
    category.classList.add('hidden')
  }
}

/* ══════════════════════════════════════
   RENDER HELPERS
══════════════════════════════════════ */
function renderMemberBar(state) {
  const bar = document.getElementById('member-bar')
  const txt = document.getElementById('member-bar-text')
  if (state.memberBar) { txt.textContent = state.memberBar; bar.classList.remove('hidden') }
  else bar.classList.add('hidden')
}

function renderPromoBanner(state) {
  const banner = document.getElementById('promo-banner')
  const txt    = document.getElementById('promo-banner-text')
  if (state.promoBanner) { txt.textContent = state.promoBannerText || ''; banner.classList.remove('hidden') }
  else banner.classList.add('hidden')
}

function renderNav(state) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active', 'dimmed')
    if (state.nav.active && link.dataset.cat === state.nav.active) link.classList.add('active')
    else if (state.nav.dimmed && state.nav.active && link.dataset.cat && link.dataset.cat !== state.nav.active) link.classList.add('dimmed')
  })
}

function renderHero(state) {
  document.getElementById('hero-bg').className = 'hero-bg ' + (state.hero.bgClass || 'bg-state-0')
  document.getElementById('hero-category').textContent = state.hero.category || ''
  const titleEl = document.getElementById('hero-title')
  titleEl.textContent = ''
  ;(state.hero.title || '').split('\n').forEach((line, i) => {
    if (i > 0) titleEl.appendChild(document.createElement('br'))
    titleEl.appendChild(document.createTextNode(line))
  })
  const cta = document.getElementById('hero-cta')
  cta.textContent = state.hero.cta || 'DÉCOUVRIR'
  if (state.hero.ctaHref) cta.href = state.hero.ctaHref
}

function renderEditorial(state) {
  ;(state.editorial || []).forEach((panel, i) => {
    const n = i + 1
    const cat   = document.getElementById(`editorial-cat-${n}`)
    const title = document.getElementById(`editorial-title-${n}`)
    const bg    = document.getElementById(`editorial-bg-${n}`)
    if (cat)   cat.textContent   = panel.category || ''
    if (title) title.textContent = panel.title    || ''
    if (bg)    bg.className      = `editorial-bg editorial-bg-${n}` + (panel.bgExtra ? ` ${panel.bgExtra}` : '')
  })
}

function renderProducts(state) {
  const grid  = document.getElementById('product-grid')
  const title = document.getElementById('product-section-title')
  title.textContent = state.productSectionTitle || 'NOS ESSENTIELS'
  if (state.products === 'spotlight') { renderSpotlight(grid); return }
  const products = PRODUCTS[state.products] || PRODUCTS.mix
  grid.textContent = ''
  products.forEach(p => grid.appendChild(buildProductCard(p)))
}

function buildStars(rating) {
  const wrap = document.createElement('span')
  wrap.className = 'stars'
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement('span')
    if (i <= Math.floor(rating)) {
      s.className = 'star full'
      s.textContent = '★'
    } else if (i - 0.5 <= rating) {
      s.className = 'star half'
      s.textContent = '★'
    } else {
      s.className = 'star empty'
      s.textContent = '★'
    }
    wrap.appendChild(s)
  }
  return wrap
}

function buildProductCard(p) {
  const card = document.createElement('div')
  card.className = 'product-card'

  const wrapper = document.createElement('div')
  wrapper.className = 'product-image-wrapper'

  if (p.badge) {
    const badge = document.createElement('span')
    badge.className = 'product-badge'
    badge.textContent = p.badge
    wrapper.appendChild(badge)
  }

  if (p.img) {
    const img = document.createElement('img')
    img.src = p.img
    img.alt = p.name
    img.className = 'product-image'
    img.loading = 'lazy'
    wrapper.appendChild(img)
  } else {
    const ph = document.createElement('div')
    ph.className = 'product-placeholder'
    const icon = document.createElement('div')
    icon.className = 'product-placeholder-icon'
    icon.textContent = p.icon
    const name = document.createElement('div')
    name.className = 'product-placeholder-name'
    name.textContent = p.name
    ph.appendChild(icon)
    ph.appendChild(name)
    wrapper.appendChild(ph)
  }

  const info = document.createElement('div')
  info.className = 'product-info'
  const nm = document.createElement('p')
  nm.className = 'product-name'
  nm.textContent = p.name
  const sub = document.createElement('p')
  sub.className = 'product-subname'
  sub.textContent = p.sub
  info.appendChild(nm)
  info.appendChild(sub)

  if (p.stars != null) {
    const starsEl = document.createElement('div')
    starsEl.className = 'product-stars'
    starsEl.appendChild(buildStars(p.stars))
    const rev = document.createElement('span')
    rev.className = 'product-reviews'
    rev.textContent = `(${p.reviews})`
    starsEl.appendChild(rev)
    info.appendChild(starsEl)
  }

  const price = document.createElement('p')
  price.className = 'product-price'
  price.textContent = p.price
  info.appendChild(price)

  const btn = document.createElement('button')
  btn.className = 'product-add-btn'
  btn.textContent = 'AJOUTER AU PANIER'

  card.appendChild(wrapper)
  card.appendChild(info)
  card.appendChild(btn)
  return card
}

function renderSpotlight(grid) {
  const s = SPOTLIGHT
  grid.textContent = ''

  const spotlight = document.createElement('div')
  spotlight.className = 'product-spotlight'

  const imgWrap = document.createElement('div')
  imgWrap.className = 'spotlight-image-wrapper'
  if (s.img) {
    const img = document.createElement('img')
    img.src = s.img
    img.alt = s.name
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;'
    imgWrap.appendChild(img)
  } else {
    const ph = document.createElement('div')
    ph.className = 'spotlight-placeholder'
    const icon = document.createElement('div')
    icon.className = 'spotlight-placeholder-icon'
    icon.textContent = s.icon
    ph.appendChild(icon)
    imgWrap.appendChild(ph)
  }

  const infoEl = document.createElement('div')
  infoEl.className = 'spotlight-info'

  const eyebrow = document.createElement('p')
  eyebrow.className = 'spotlight-eyebrow'
  eyebrow.textContent = s.eyebrow

  const tag = document.createElement('span')
  tag.className = 'spotlight-tag'
  tag.textContent = s.tag

  const nameEl = document.createElement('h2')
  nameEl.className = 'spotlight-name'
  nameEl.textContent = s.name

  const subname = document.createElement('p')
  subname.className = 'spotlight-subname'
  subname.textContent = s.subname

  const whyTitle = document.createElement('p')
  whyTitle.className = 'spotlight-why-title'
  whyTitle.textContent = 'POURQUOI CE PRODUIT ?'

  const why = document.createElement('p')
  why.className = 'spotlight-why'
  why.textContent = s.why

  const priceEl = document.createElement('p')
  priceEl.className = 'spotlight-price'
  priceEl.textContent = s.price

  const actions = document.createElement('div')
  actions.className = 'spotlight-actions'
  const ctaPrimary = document.createElement('a')
  ctaPrimary.href = '/product.html'
  ctaPrimary.className = 'spotlight-cta-primary'
  ctaPrimary.textContent = s.ctaPrimary
  const ctaSecondary = document.createElement('button')
  ctaSecondary.className = 'spotlight-cta-secondary'
  ctaSecondary.textContent = s.ctaSecondary
  actions.appendChild(ctaPrimary)
  actions.appendChild(ctaSecondary)

  const recoTag = document.createElement('p')
  recoTag.className = 'spotlight-reco-tag'
  recoTag.textContent = '✦ Recommandé pour vous · Basé sur votre profil NTO'

  infoEl.appendChild(eyebrow)
  infoEl.appendChild(tag)
  infoEl.appendChild(nameEl)
  infoEl.appendChild(subname)
  infoEl.appendChild(whyTitle)
  infoEl.appendChild(why)
  infoEl.appendChild(priceEl)
  infoEl.appendChild(actions)
  infoEl.appendChild(recoTag)

  spotlight.appendChild(imgWrap)
  spotlight.appendChild(infoEl)
  grid.appendChild(spotlight)
}

function renderAppointmentSection(state) {
  const s = document.getElementById('appointment-section')
  state.appointmentSection ? s.classList.remove('hidden') : s.classList.add('hidden')
}

/* ══════════════════════════════════════
   CATEGORY MODE
══════════════════════════════════════ */
function renderCategoryHeader(state) {
  const nameEl  = document.getElementById('category-name')
  const countEl = document.getElementById('category-count')
  if (nameEl)  nameEl.textContent  = state.categoryName || 'ÉQUIPEMENT TRAIL & OUTDOOR'
  if (countEl) countEl.textContent = `${BIJOUX.length} produits`
}

function renderInsightBar(state) {
  const bar = document.getElementById('sf-insight-bar')
  const txt = document.getElementById('sf-insight-text')
  if (state.insightText && bar && txt) { txt.textContent = state.insightText; bar.style.display = 'flex' }
}

function renderJewelleryGrid(scoreKey) {
  const grid = document.getElementById('jewellery-grid')
  if (!grid) return
  const sorted = [...BIJOUX].sort((a, b) => (b.scores[scoreKey] ?? 1) - (a.scores[scoreKey] ?? 1))
  grid.textContent = ''
  sorted.forEach(p => grid.appendChild(buildJewelCard(p, scoreKey)))
}

function buildJewelCard(p, scoreKey) {
  const score     = p.scores[scoreKey] ?? 1
  const sizeClass = score === 2 ? 'featured' : score === 0 ? 'faded' : 'normal'
  const isLiked   = likedProducts.has(p.id)

  const card = document.createElement('div')
  card.className = `jewel-card ${sizeClass}`
  card.dataset.id = p.id

  const imgWrap = document.createElement('div')
  imgWrap.className = 'jewel-image-wrap'

  if (p.badge) {
    const badge = document.createElement('span')
    badge.className = 'jewel-badge'
    badge.textContent = p.badge
    imgWrap.appendChild(badge)
  }

  const heartBtn = document.createElement('button')
  heartBtn.className = `jewel-heart-btn${isLiked ? ' liked' : ''}`
  heartBtn.setAttribute('aria-label', 'Ajouter aux favoris')
  heartBtn.setAttribute('onclick', `toggleHeart('${p.id}', event)`)
  heartBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
  imgWrap.appendChild(heartBtn)

  if (p.img) {
    const img = document.createElement('img')
    img.src = p.img
    img.alt = p.name
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;'
    imgWrap.appendChild(img)
  } else {
    const ph = document.createElement('div')
    ph.className = 'jewel-placeholder'
    const icon = document.createElement('span')
    icon.className = 'jewel-icon'
    icon.textContent = p.icon
    ph.appendChild(icon)
    imgWrap.appendChild(ph)
  }

  const info = document.createElement('div')
  info.className = 'jewel-info'

  const nameEl = document.createElement('p')
  nameEl.className = 'jewel-name'
  nameEl.textContent = p.name

  const sub = document.createElement('p')
  sub.className = 'jewel-sub'
  sub.textContent = p.sub

  const from = document.createElement('span')
  from.className = 'jewel-price-from'
  from.textContent = 'à partir de'

  const priceEl = document.createElement('span')
  priceEl.className = 'jewel-price'
  priceEl.textContent = p.price

  const addBtn = document.createElement('button')
  addBtn.className = 'jewel-add-btn'
  addBtn.textContent = 'AJOUTER AU PANIER'

  const recoTag = document.createElement('p')
  recoTag.className = 'jewel-reco-tag'
  recoTag.textContent = '✦ Recommandé pour vous · NTO AI'

  info.appendChild(nameEl)
  info.appendChild(sub)
  info.appendChild(from)
  info.appendChild(priceEl)
  info.appendChild(addBtn)
  info.appendChild(recoTag)

  card.appendChild(imgWrap)
  card.appendChild(info)
  return card
}

function animateGridTransition(scoreKey) {
  const grid = document.getElementById('jewellery-grid')
  if (!grid) return
  grid.style.opacity = '0'
  grid.style.transition = 'opacity 0.25s ease'
  setTimeout(() => { renderJewelleryGrid(scoreKey); grid.style.opacity = '1' }, 280)
}

/* ══════════════════════════════════════
   HEART
══════════════════════════════════════ */
window.toggleHeart = function(productId, event) {
  event.stopPropagation()
  const btn      = event.currentTarget
  const wasLiked = likedProducts.has(productId)
  if (wasLiked) { likedProducts.delete(productId); btn.classList.remove('liked') }
  else          { likedProducts.add(productId);    btn.classList.add('liked')    }
  const product = BIJOUX.find(p => p.id === productId)
  if (!product) return
  const text = wasLiked
    ? `J'ai noté que ${product.name} n'est pas pour vous.`
    : `♥ Vous aimez ${product.name}. Je note vos préférences.`
  appendAgentBubble(text)
  openChatPanel()
}

/* ══════════════════════════════════════
   CHAT
══════════════════════════════════════ */
window.toggleChat = function() {
  chatOpen = !chatOpen
  const card      = document.getElementById('chat-card')
  const toggleBtn = document.getElementById('chat-toggle-btn')
  if (chatOpen) {
    card.classList.remove('hidden')
    toggleBtn.classList.add('hidden')
    if (currentState === 0) applyState(1)
  } else {
    card.classList.add('hidden')
    toggleBtn.classList.remove('hidden')
  }
}

function openChatPanel() {
  if (!chatOpen) {
    chatOpen = true
    document.getElementById('chat-card').classList.remove('hidden')
    document.getElementById('chat-toggle-btn').classList.add('hidden')
  }
}

window.toggleStartBtn = function() {
  const checkbox = document.getElementById('chat-agree-checkbox')
  const btn      = document.getElementById('chat-start-btn')
  btn.disabled = !checkbox.checked
}

function updateChatConversation(chatData) {
  if (!chatData) return

  if (currentState === 1) {
    document.getElementById('chat-privacy-screen').classList.remove('hidden')
    document.getElementById('chat-conversation').classList.add('hidden')
    return
  }

  document.getElementById('chat-privacy-screen').classList.add('hidden')
  document.getElementById('chat-conversation').classList.remove('hidden')

  const messagesEl = document.getElementById('chat-messages')
  const buttonsEl  = document.getElementById('chat-buttons')

  if (chatData.message) {
    messagesEl.textContent = ''
    appendAgentBubble(chatData.message)
  }

  if (chatData.buttons && chatData.buttons.length > 0) {
    buttonsEl.classList.remove('hidden')
    buttonsEl.textContent = ''
    chatData.buttons.forEach(btn => buttonsEl.appendChild(buildChatButton(btn)))
  } else {
    buttonsEl.classList.add('hidden')
    buttonsEl.textContent = ''
  }
}

function buildChatButton(btnData) {
  const btn = document.createElement('button')
  btn.className = 'chat-btn'
  btn.addEventListener('click', () => handleChatBtn(btnData.nextState, btnData.label))

  const iconEl = document.createElement('span')
  iconEl.className = 'chat-btn-icon'
  iconEl.textContent = btnData.icon || '✦'

  const labelEl = document.createElement('span')
  labelEl.className = 'chat-btn-label'
  labelEl.textContent = btnData.label

  const chevron = document.createElement('span')
  chevron.className = 'chat-btn-chevron'
  chevron.textContent = '›'

  btn.appendChild(iconEl)
  btn.appendChild(labelEl)
  btn.appendChild(chevron)
  return btn
}

function appendAgentBubble(text) {
  const messagesEl = document.getElementById('chat-messages')
  if (!messagesEl) return
  const t = getTime()

  const wrapper = document.createElement('div')
  wrapper.className = 'chat-msg'

  const bubble = document.createElement('div')
  bubble.className = 'chat-bubble-agent'
  text.split('\n').forEach((line, i) => {
    if (i > 0) bubble.appendChild(document.createElement('br'))
    bubble.appendChild(document.createTextNode(line))
  })

  const ts = document.createElement('span')
  ts.className = 'chat-timestamp'
  ts.textContent = `Alex, Conseiller NTO · ${t}`

  wrapper.appendChild(bubble)
  wrapper.appendChild(ts)
  messagesEl.appendChild(wrapper)
  messagesEl.scrollTop = messagesEl.scrollHeight
}

function appendClientBubble(text) {
  const messagesEl = document.getElementById('chat-messages')
  if (!messagesEl) return
  const t = getTime()

  const wrapper = document.createElement('div')
  wrapper.className = 'chat-msg'

  const bubble = document.createElement('div')
  bubble.className = 'chat-bubble-client'
  bubble.textContent = text

  const ts = document.createElement('span')
  ts.className = 'chat-timestamp client-ts'
  ts.textContent = `Vous · ${t}`

  wrapper.appendChild(bubble)
  wrapper.appendChild(ts)
  messagesEl.appendChild(wrapper)
  messagesEl.scrollTop = messagesEl.scrollHeight
}

window.handleEmailSubmit = function() {
  const checkbox = document.getElementById('chat-agree-checkbox')
  if (!checkbox.checked) return

  document.getElementById('chat-privacy-screen').classList.add('hidden')
  document.getElementById('chat-conversation').classList.remove('hidden')

  const messagesEl = document.getElementById('chat-messages')
  messagesEl.textContent = ''

  const loadingMsg = document.createElement('div')
  loadingMsg.className = 'chat-msg'
  const loadingDots = document.createElement('div')
  loadingDots.className = 'chat-msg-loading'
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div')
    dot.className = 'chat-dot-anim'
    loadingDots.appendChild(dot)
  }
  loadingMsg.appendChild(loadingDots)
  messagesEl.appendChild(loadingMsg)

  setTimeout(() => applyState(2), 1400)
}

function handleChatBtn(nextState, label) {
  if (nextState === 'product') { window.location.href = '/product.html'; return }

  appendClientBubble(label)

  const buttonsEl = document.getElementById('chat-buttons')
  buttonsEl.textContent = ''
  const loadingWrap = document.createElement('div')
  loadingWrap.style.cssText = 'padding:8px 16px'
  const loadingDots = document.createElement('div')
  loadingDots.className = 'chat-msg-loading'
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div')
    dot.className = 'chat-dot-anim'
    loadingDots.appendChild(dot)
  }
  loadingWrap.appendChild(loadingDots)
  buttonsEl.appendChild(loadingWrap)

  const nextStateData = STATES[nextState]
  if (nextStateData && nextStateData.jewelleryScoreKey && currentState >= 4) {
    setTimeout(() => {
      applyState(nextState)
      setTimeout(() => animateGridTransition(nextStateData.jewelleryScoreKey), 400)
    }, 900)
  } else {
    setTimeout(() => applyState(nextState), 900)
  }
}

/* ══════════════════════════════════════
   MODAL CALENDRIER
══════════════════════════════════════ */
window.openApptModal = function() {
  document.getElementById('appt-modal').classList.remove('hidden')
}

window.closeApptModal = function() {
  document.getElementById('appt-modal').classList.add('hidden')
}

window.selectDate = function(el) {
  document.querySelectorAll('.cal-day.selected').forEach(d => d.classList.remove('selected'))
  el.classList.add('selected')
  const labels = {
    '6':  'Vendredi 6 juin',
    '7':  'Samedi 7 juin',
    '13': 'Vendredi 13 juin',
    '14': 'Samedi 14 juin',
  }
  selectedDate = labels[el.dataset.date] || `${el.dataset.date} juin`
  const label = document.getElementById('selected-date-label')
  if (label) label.textContent = selectedDate
}

window.selectSlot = function(el) {
  document.querySelectorAll('.slot.selected').forEach(s => s.classList.remove('selected'))
  el.classList.add('selected')
  selectedTime = el.textContent
}

window.confirmAppointment = function() {
  document.getElementById('appt-modal').classList.add('hidden')
  applyState(7)
}

/* ══════════════════════════════════════
   CONFIRMATION
══════════════════════════════════════ */
function showConfirmation() {
  const screen = document.getElementById('confirmation-screen')
  document.getElementById('conf-date').textContent = `${selectedDate} 2025`
  document.getElementById('conf-time').textContent = selectedTime
  screen.classList.remove('hidden')
}

/* ══════════════════════════════════════
   RESET
══════════════════════════════════════ */
window.resetDemo = function() {
  document.getElementById('confirmation-screen').classList.add('hidden')
  document.getElementById('appt-modal').classList.add('hidden')
  document.getElementById('chat-card').classList.add('hidden')
  document.getElementById('chat-toggle-btn').classList.remove('hidden')

  const email    = document.getElementById('chat-email-input')
  const checkbox = document.getElementById('chat-agree-checkbox')
  const startBtn = document.getElementById('chat-start-btn')
  if (email)    email.value       = ''
  if (checkbox) checkbox.checked  = false
  if (startBtn) startBtn.disabled = true

  chatOpen     = false
  selectedDate = 'Vendredi 13 juin'
  selectedTime = '14h30'
  msgTime      = 0
  likedProducts.clear()

  const main = document.getElementById('main-content')
  main.style.opacity = '0'
  setTimeout(() => {
    applyState(0)
    main.style.transition = 'opacity 0.4s ease'
    main.style.opacity = '1'
  }, 200)
}
