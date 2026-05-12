import './style.css'
import './loyalty.css'

/* ── DATA ──────────────────────────────────────────── */
const REWARDS = [
  { icon: '☕', name: 'Café offert',              pts: 200,  available: true  },
  { icon: '🎒', name: 'Housse de sac offerte',    pts: 500,  available: true  },
  { icon: '🚚', name: 'Livraison express',        pts: 800,  available: true  },
  { icon: '🧴', name: 'Kit entretien équipement', pts: 1200, available: true  },
  { icon: '🛍', name: "Bon d'achat 20 €",         pts: 2000, available: true  },
  { icon: '🧭', name: 'Conseiller dédié 1h',      pts: 3000, available: true  },
  { icon: '⛺', name: 'Sortie trail guidée',       pts: 5000, available: false },
  { icon: '🏔️', name: 'Expédition VIP',           pts: 8000, available: false },
]

const BADGES = [
  { icon: '⭐', name: 'Fidèle',       unlocked: true  },
  { icon: '🧥', name: 'Trail',        unlocked: true  },
  { icon: '🏔️', name: 'Summit',       unlocked: true  },
  { icon: '🌟', name: 'Expert',       unlocked: false },
  { icon: '🏆', name: 'Ambassadeur',  unlocked: false },
  { icon: '🦅', name: 'Everest',      unlocked: false },
]

const TRAIL = [
  { icon: '✓', name: 'Inscription au programme',     desc: 'Compte créé et activé',                pts: '+50 pts',        done: true  },
  { icon: '✓', name: 'Premier achat',                 desc: 'Veste Softshell Ascent — nov. 2024',   pts: '+220 pts',       done: true  },
  { icon: '✓', name: 'Niveau Ascent atteint',         desc: 'Cumul 1 000 pts',                      pts: '+100 pts bonus', done: true  },
  { icon: '✓', name: 'Niveau Summit atteint',         desc: 'Cumul 2 500 pts',                      pts: '+250 pts bonus', done: true  },
  { icon: '🎯', name: 'Compléter votre profil sport', desc: '5 préférences à renseigner',           pts: '+80 pts',        done: false, active: true },
  { icon: '🎯', name: 'Atteindre le niveau Peak',     desc: '1 760 points restants',                pts: '+500 pts bonus', done: false },
]

const TRANSACTIONS = [
  { icon: '🧥', name: 'Achat — Veste Softshell Ascent',    date: '18 nov. 2024', pts: '+220',    earn: true  },
  { icon: '👟', name: 'Achat — Chaussures Trail GTX',       date: '3 mars 2025',  pts: '+185',    earn: true  },
  { icon: '🎰', name: 'Gain roue de la chance',             date: '1 avr. 2025',  pts: '+50',     earn: true  },
  { icon: '🎁', name: "Utilisation — Bon 20 €",             date: '12 avr. 2025', pts: '−2 000',  earn: false },
  { icon: '🎒', name: 'Achat — Sac à dos Trail 40L',        date: '28 avr. 2025', pts: '+149',    earn: true  },
  { icon: '✨', name: 'Bonus défi mensuel',                 date: '30 avr. 2025', pts: '+200',    earn: true  },
]

const VOUCHERS = [
  { eyebrow: "Bon d'achat",       value: '20 €',  desc: 'Valable en boutique et sur northerntrailoutfitters.com', exp: 'Expire le 30 juin 2026' },
  { eyebrow: 'Avantage équipement', value: '−15%',desc: 'Sur toute la gamme vestes & sacs',                       exp: 'Expire le 31 mai 2026'  },
  { eyebrow: 'Offre Summit',      value: '2× pts',desc: 'Points doublés sur les achats équipement ce mois-ci',    exp: 'Expire le 31 mai 2026'  },
]

const SPIN_PRIZES = ['50 pts', '100 pts', 'Cadeau', '200 pts', 'Rejouer', '500 pts']

/* ── INIT ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderRewards()
  renderBadges()
  renderTrail()
  renderTransactions()
  renderVouchers()
  setTimeout(() => {
    const fill = document.getElementById('loy-progress-fill')
    if (fill) fill.style.width = '64.8%'
  }, 500)
  setTimeout(() => {
    document.getElementById('loy-chat-panel').classList.remove('hidden')
  }, 1800)
})

/* ── RENDER REWARDS ────────────────────────────────── */
function renderRewards() {
  const grid = document.getElementById('loy-rewards-grid')
  if (!grid) return
  REWARDS.forEach(r => {
    const card = document.createElement('div')
    card.className = 'reward-card'

    const img = document.createElement('div')
    img.className = 'reward-img'
    img.textContent = r.icon

    const body = document.createElement('div')
    body.className = 'reward-body'

    const name = document.createElement('p')
    name.className = 'reward-name'
    name.textContent = r.name

    const pts = document.createElement('p')
    pts.className = 'reward-pts'
    pts.textContent = r.pts.toLocaleString('fr-FR') + ' pts'

    const btn = document.createElement('button')
    btn.className = 'reward-btn'
    btn.textContent = r.available ? 'ÉCHANGER' : 'BIENTÔT'
    if (!r.available) btn.disabled = true
    btn.addEventListener('click', () => {
      showToast(r.available ? r.name + ' — échange confirmé !' : 'Bientôt disponible')
    })

    body.appendChild(name)
    body.appendChild(pts)
    body.appendChild(btn)
    card.appendChild(img)
    card.appendChild(body)
    grid.appendChild(card)
  })
}

/* ── RENDER BADGES ─────────────────────────────────── */
function renderBadges() {
  const grid = document.getElementById('loy-badge-grid')
  if (!grid) return
  BADGES.forEach((b, i) => {
    const item = document.createElement('div')
    item.className = 'badge-item ' + (b.unlocked ? 'unlocked' : 'locked')
    item.id = 'badge-' + i

    const icon = document.createElement('div')
    icon.className = 'badge-icon'
    icon.textContent = b.icon

    const name = document.createElement('p')
    name.className = 'badge-name'
    name.textContent = b.name

    item.appendChild(icon)
    item.appendChild(name)
    grid.appendChild(item)
  })
}

/* ── RENDER TRAIL ──────────────────────────────────── */
function renderTrail() {
  const list = document.getElementById('loy-trail-list')
  if (!list) return
  TRAIL.forEach(t => {
    const item = document.createElement('div')
    item.className = 'trail-item' + (t.done ? ' done' : '') + (t.active ? ' active' : '')

    const dot = document.createElement('div')
    dot.className = 'trail-dot'
    dot.textContent = t.done ? '✓' : t.icon

    const body = document.createElement('div')
    body.className = 'trail-body'

    const nameEl = document.createElement('p')
    nameEl.className = 'trail-name'
    nameEl.textContent = t.name

    const desc = document.createElement('p')
    desc.className = 'trail-desc'
    desc.textContent = t.desc

    const pts = document.createElement('p')
    pts.className = 'trail-pts'
    pts.textContent = t.pts

    body.appendChild(nameEl)
    body.appendChild(desc)
    body.appendChild(pts)
    item.appendChild(dot)
    item.appendChild(body)
    list.appendChild(item)
  })
}

/* ── RENDER TRANSACTIONS ───────────────────────────── */
function renderTransactions() {
  const list = document.getElementById('loy-tx-list')
  if (!list) return
  TRANSACTIONS.forEach(t => {
    const row = document.createElement('div')
    row.className = 'tx-row'

    const icon = document.createElement('div')
    icon.className = 'tx-icon'
    icon.textContent = t.icon

    const body = document.createElement('div')
    body.className = 'tx-body'

    const name = document.createElement('p')
    name.className = 'tx-name'
    name.textContent = t.name

    const date = document.createElement('p')
    date.className = 'tx-date'
    date.textContent = t.date

    const pts = document.createElement('p')
    pts.className = 'tx-pts ' + (t.earn ? 'earn' : 'spend')
    pts.textContent = t.pts + ' pts'

    body.appendChild(name)
    body.appendChild(date)
    row.appendChild(icon)
    row.appendChild(body)
    row.appendChild(pts)
    list.appendChild(row)
  })
}

/* ── RENDER VOUCHERS ───────────────────────────────── */
function renderVouchers() {
  const row = document.getElementById('loy-voucher-row')
  if (!row) return
  VOUCHERS.forEach(v => {
    const card = document.createElement('div')
    card.className = 'voucher-card'

    const eyebrow = document.createElement('p')
    eyebrow.className = 'voucher-eyebrow'
    eyebrow.textContent = v.eyebrow

    const value = document.createElement('p')
    value.className = 'voucher-value'
    value.textContent = v.value

    const desc = document.createElement('p')
    desc.className = 'voucher-desc'
    desc.textContent = v.desc

    const exp = document.createElement('p')
    exp.className = 'voucher-exp'
    exp.textContent = v.exp

    const btn = document.createElement('button')
    btn.className = 'voucher-use'
    btn.textContent = 'UTILISER'
    btn.addEventListener('click', () => showToast('Bon appliqué au panier'))

    card.appendChild(eyebrow)
    card.appendChild(value)
    card.appendChild(desc)
    card.appendChild(exp)
    card.appendChild(btn)
    row.appendChild(card)
  })
}

/* ── INTERACTIONS ──────────────────────────────────── */
let hasJoined = false
window.handleLoyaltyJoin = function() {
  if (hasJoined) return
  hasJoined = true
  const btn = document.getElementById('loy-join-btn')
  btn.textContent = 'BIENVENUE CHEZ NORTHERN TRAIL ✦'
  btn.classList.add('joined')
  showToast('Bienvenue chez NTO — 50 points offerts !')
}

let spinDone = false
window.doSpin = function() {
  if (spinDone) return
  spinDone = true
  const btn = document.getElementById('loy-spin-btn')
  btn.disabled = true
  const wheel = document.getElementById('loy-spin-wheel')
  const deg = 1440 + Math.floor(Math.random() * 360)
  wheel.style.transform = 'rotate(' + deg + 'deg)'
  setTimeout(() => {
    const prize = SPIN_PRIZES[Math.floor(Math.random() * SPIN_PRIZES.length)]
    const result = document.getElementById('loy-spin-result')
    result.textContent = 'Résultat : ' + prize + ' 🎉'
    result.style.color = 'var(--gold)'
    showToast('Roue — vous avez gagné : ' + prize)
  }, 3100)
}

let scratchDone = false
window.doScratch = function() {
  if (scratchDone) return
  scratchDone = true
  const prizes = [
    { icon: '🎁', label: '50 POINTS' },
    { icon: '🌸', label: 'MINIATURE PARFUM' },
    { icon: '✨', label: '200 POINTS' },
    { icon: '☕', label: 'CAFÉ OFFERT' },
  ]
  const prize = prizes[Math.floor(Math.random() * prizes.length)]
  document.getElementById('loy-scratch-prize').textContent = prize.icon
  document.getElementById('loy-scratch-label').textContent = prize.label
  document.getElementById('loy-scratch-cover').classList.add('revealed')
  const result = document.getElementById('loy-scratch-result')
  result.textContent = 'Vous avez gagné : ' + prize.label
  result.style.color = 'var(--gold)'
  showToast('Carte grattée — ' + prize.label + ' !')
}

window.unlockBadge = function() {
  const badge = document.getElementById('badge-4')
  if (!badge) return
  if (badge.classList.contains('unlocked')) { showToast('Badge déjà débloqué !'); return }
  badge.classList.remove('locked')
  badge.classList.add('unlocked')
  showToast('Badge "Ambassadeur" débloqué ! +100 pts')
}

window.toggleLoyaltyChat = function() {
  const panel = document.getElementById('loy-chat-panel')
  const btn = document.getElementById('loy-chat-toggle')
  const hidden = panel.classList.contains('hidden')
  panel.classList.toggle('hidden', !hidden)
  btn.classList.toggle('hidden', hidden)
}

/* ── TOAST ─────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('loy-toast')
  if (!t) return
  t.textContent = msg
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 3000)
}
