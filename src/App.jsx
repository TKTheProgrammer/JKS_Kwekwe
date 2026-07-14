import { useState, useEffect, useRef } from 'react'
import './App.css'

// ── Asset imports ──────────────────────────────────────────────────────────
// NOTE: Vite imports local assets by their exact filename.
// Check your actual filenames in src/assets/ and update these if needed.

import heroBg from './assets/hero.png'

// Events
import event1 from './assets/Events/event1.jpg'
import event2 from './assets/Events/event2.jpeg'

// Kata tutorials
import kata3 from './assets/Kata_tutorials/kata3.mp4'

// ── Scroll-reveal hook ─────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// ── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#disciplines', label: 'Disciplines' },
    { href: '#sensei',      label: 'Sensei' },
    { href: '#programs',    label: 'Programs' },
    { href: '#kata',        label: 'Kata' },
    { href: '#tournaments', label: 'Tournaments' },
    { href: '#events',      label: 'Events' },
    { href: '#enrol',       label: 'Enrol' },
  ]

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">JKS • Kwekwe</div>
        <ul className="nav-links">
          {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
        <button className="nav-hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile${open ? ' open' : ''}`}>
        <button
          onClick={() => setOpen(false)}
          style={{ position:'absolute', top:'1.5rem', right:'1.5rem', background:'none', border:'none', color:'#f5f0e8', fontSize:'1.5rem', cursor:'pointer' }}
          aria-label="Close menu"
        >✕</button>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  )
}

// ── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="hero"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay" />
      <div className="hero-rising-sun" />

      <p className="hero-badge">Japan Karate Association Zimbabwe · Est. Kwekwe</p>
      <h1 className="hero-title">Open<br /><span>Hand</span></h1>
      <p className="hero-subtitle">JKS Shotokan Karate College · Kwekwe</p>
      <p className="hero-tagline">Where ancient discipline meets modern strength — welcoming all ages from 3 to 80.</p>
      <div className="hero-cta">
        <a href="#enrol"  className="btn-primary">Begin Training</a>
        <a href="#sensei" className="btn-outline">Meet Sensei</a>
      </div>
    </section>
  )
}

// ── STATS ──────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { number: '5th', label: 'Dan Black Belt' },
    { number: '3+',  label: 'Age 3 Welcome' },
    { number: '5',   label: 'Disciplines' },
    { number: 'ZIM', label: 'National Team Coach' },
  ]
  return (
    <div className="stats-strip">
      {stats.map(s => (
        <div className="stat-item" key={s.label}>
          <span className="stat-number">{s.number}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── DISCIPLINES ────────────────────────────────────────────────────────────
const disciplines = [
  { icon: '🥋', name: 'Traditional Karate', desc: 'Rooted in centuries-old Japanese Shotokan tradition. Kata, kihon, and the philosophy of Do.' },
  { icon: '🏆', name: 'Sport Karate',        desc: 'Competitive kumite and kata for those aiming at regional, national, and international championships.' },
  { icon: '🛡️', name: 'Self-Defence',        desc: 'Practical, real-world techniques for personal safety. Empowering women, youth, and families.' },
  { icon: '💃', name: 'Kaerobics',           desc: 'High-energy aerobic training fused with karate movements. Fun, dynamic, and transformative.' },
  { icon: '💪', name: 'Fitness Training',    desc: 'Strength, flexibility, endurance — martial-arts-inspired conditioning for peak physical health.' },
]

function DisciplineCard({ icon, name, desc, delay }) {
  const ref = useReveal()
  return (
    <div className="discipline-card" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <span className="disc-icon">{icon}</span>
      <div className="disc-name">{name}</div>
      <p className="disc-desc">{desc}</p>
    </div>
  )
}

function Disciplines() {
  return (
    <section id="disciplines" className="disciplines-section">
      <div className="section-header">
        <div className="section-label">The Way of the Open Hand</div>
        <h2 className="section-title">Our <span>Disciplines</span></h2>
      </div>
      <div className="disciplines-grid">
        {disciplines.map((d, i) => (
          <DisciplineCard key={d.name} {...d} delay={i * 100} />
        ))}
      </div>
    </section>
  )
}

// ── SENSEI ─────────────────────────────────────────────────────────────────
function Sensei() {
  return (
    <section id="sensei" className="sensei-section">
      <div className="sensei-inner">
        <div className="sensei-portrait-wrap">
          <div className="sensei-portrait">
            <div className="dan-rank">五段</div>
            <div className="portrait-inner">
              <div className="portrait-role">Chief Instructor</div>
              <div className="portrait-icon">🥷</div>
              <div className="portrait-name">Shepherd Ziwira</div>
              <div className="portrait-rank">5th Dan Black Belt</div>
            </div>
            <div className="belt-display">
              <div className="belt belt-black" />
              <div className="belt belt-black" />
              <div className="belt belt-red" />
              <div className="belt belt-black" />
              <div className="belt belt-gold" />
              <div className="belt belt-black" />
            </div>
          </div>
          <div className="portrait-caption">Sensei Ziwira · JKS Zimbabwe</div>
        </div>

        <div>
          <div className="sensei-label">Chief Instructor &amp; Founder</div>
          <h2 className="sensei-name">Shepherd<br />Ziwira</h2>
          <div className="sensei-rank">5th Dan Black Belt · National Team Coach</div>
          <p className="sensei-bio">
            Born and raised in Harare's Glen Norah suburb, Sensei Ziwira began his karate
            journey at 16 — motivated not by competition, but by a desire to protect the
            vulnerable from bullies. Today, he is one of Zimbabwe's most celebrated martial artists.
          </p>
          <p className="sensei-bio">
            Renowned for using karate as a tool to fight drug and alcohol abuse among the youth
            of Midlands Province, Ziwira has built not just a club — but a movement. His family
            dynasty is testament to his values: his wife and three children all hold black belt ranks.
          </p>
          <div className="credentials">
            {[
              'Chief Instructor, Japan Karate Association of Zimbabwe',
              'Technical Director, Midlands Karate Union',
              'Zimbabwe National Karate Team Coach',
              'Organiser, Annual Kwekwe Invitational Karate Championship',
              'Organiser, Midlands Karate Championships',
            ].map(c => (
              <div className="credential-item" key={c}>
                <div className="credential-dot" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PROGRAMS ───────────────────────────────────────────────────────────────
const programs = [
  { name: 'Little Tigers',        age: '3 – 6 yrs',   level: 'Beginner',                focus: 'Balance, coordination, fun movement, discipline foundations' },
  { name: 'Junior Karate',        age: '7 – 12 yrs',  level: 'Beginner – Intermediate', focus: 'Kata, kihon, character development, anti-bullying' },
  { name: 'Youth Champions',      age: '13 – 17 yrs', level: 'All levels',              focus: 'Sport karate, self-discipline, drug & alcohol resistance' },
  { name: 'Adults – Traditional', age: '18 – 55 yrs', level: 'All levels',              focus: 'Traditional Shotokan, self-defence, fitness, competition' },
  { name: 'Kaerobics',            age: '16 – 65 yrs', level: 'No experience needed',    focus: 'Cardio fitness, fun, karate-inspired aerobics' },
  { name: 'Silver Warriors',      age: '55 – 80 yrs', level: 'Gentle pace',             focus: 'Flexibility, balance, mental sharpness, social wellness' },
]

function Programs() {
  return (
    <section id="programs" className="programs-section">
      <div className="section-header">
        <div className="section-label">For Every Stage of Life</div>
        <h2 className="section-title">Training <span>Programs</span></h2>
      </div>
      <table className="programs-table">
        <thead>
          <tr><th>Program</th><th>Age Group</th><th>Level</th><th>Focus</th></tr>
        </thead>
        <tbody>
          {programs.map(p => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td><span className="age-badge">{p.age}</span></td>
              <td>{p.level}</td>
              <td>{p.focus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

// ── KATA TUTORIALS ─────────────────────────────────────────────────────────
const kataData = [
  { src: kata3, title: 'Kata Demonstration', desc: 'Sensei Ziwira demonstrates fundamental kata form with precision and power.' },
]

function KataTutorials() {
  const [active, setActive] = useState(0)
  const ref = useReveal()

  return (
    <section id="kata" className="kata-section">
      <div className="section-header">
        <div className="section-label">Learn from the Master</div>
        <h2 className="section-title">Kata <span>Tutorials</span></h2>
        <p className="section-intro">
          Watch Sensei Ziwira perform traditional Shotokan kata — study the form,
          the breathing, and the spirit behind every movement.
        </p>
      </div>

      <div className="kata-inner" ref={ref}>
        {/* Main video player */}
        <div className="kata-player-wrap">
          <video
            key={kataData[active].src}
            className="kata-player"
            controls
            playsInline
          >
            <source src={kataData[active].src} type="video/mp4" />
            Your browser does not support video playback.
          </video>
          <div className="kata-player-info">
            <div className="kata-player-title">{kataData[active].title}</div>
            <div className="kata-player-desc">{kataData[active].desc}</div>
          </div>
        </div>

        {/* Thumbnail / playlist rail */}
        <div className="kata-rail">
          {kataData.map((k, i) => (
            <button
              key={i}
              className={`kata-thumb${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="kata-thumb-num">{active === i ? '▶' : String(i + 1).padStart(2,'0')}</div>
              <div className="kata-thumb-text">
                <div className="kata-thumb-title">{k.title}</div>
                <div className="kata-thumb-desc">{k.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── TOURNAMENTS ────────────────────────────────────────────────────────────
const tournaments = [
  {
    watermark: '★',
    type: 'Annual · Flagship Event',
    name: 'Kwekwe Invitational Karate Championship',
    desc: 'Our premier annual competition drawing karatekas from across Zimbabwe — a showcase of discipline, skill, and sportsmanship.',
  },
  {
    watermark: '◆',
    type: 'Regional · Midlands Province',
    name: 'Midlands Karate Championships',
    desc: 'The definitive regional competition for Midlands Province — developing young talent and creating pathways to national selection.',
  },
  {
    watermark: '▲',
    type: 'Development · Youth Focus',
    name: 'Youth Grading & Development Tournaments',
    desc: 'Regular in-house grading events and inter-club competitions focused on youth development and belt progression.',
  },
]

function TournamentCard({ watermark, type, name, desc, delay }) {
  const ref = useReveal()
  return (
    <div className="tournament-card" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="tournament-watermark">{watermark}</div>
      <div className="tournament-type">{type}</div>
      <div className="tournament-name">{name}</div>
      <p className="tournament-desc">{desc}</p>
    </div>
  )
}

function Tournaments() {
  return (
    <section id="tournaments" className="tournaments-section">
      <div className="tournaments-inner">
        <div className="section-header">
          <div className="section-label">Competitive Excellence</div>
          <h2 className="section-title">Our <span>Tournaments</span></h2>
        </div>
        <div className="tournament-cards">
          {tournaments.map((t, i) => (
            <TournamentCard key={t.name} {...t} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── EVENTS ─────────────────────────────────────────────────────────────────
const eventData = [
  {
    img:   event1,
    title: 'Kwekwe Invitational Karate Championship',
    date:  'August 1, 2026',
    venue: 'Kwekwe, Midlands Province',
    desc:  'The annual flagship tournament returns! Open to all grades and age groups. Come compete, support, and celebrate the spirit of karate.',
    badge: 'Upcoming',
  },
  {
    img:   event2,
    title: 'JKS Midlands Open Tournament',
    date:  'August 1, 2026',
    venue: 'Kwekwe, Midlands Province',
    desc:  'Join us for a day of elite competition, community, and the martial arts spirit. All clubs from the Midlands region are welcome.',
    badge: 'Register Now',
  },
]

function EventCard({ img, title, date, venue, desc, badge, delay }) {
  const ref = useReveal()
  return (
    <div className="event-card" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="event-img-wrap">
        <img src={img} alt={title} className="event-img" />
        <div className="event-badge">{badge}</div>
      </div>
      <div className="event-body">
        <div className="event-meta">
          <span className="event-date">📅 {date}</span>
          <span className="event-venue">📍 {venue}</span>
        </div>
        <h3 className="event-title">{title}</h3>
        <p className="event-desc">{desc}</p>
        <a href="#enrol" className="btn-primary event-btn">Register Interest</a>
      </div>
    </div>
  )
}

function Events() {
  return (
    <section id="events" className="events-section">
      <div className="section-header">
        <div className="section-label">Mark Your Calendar</div>
        <h2 className="section-title">Upcoming <span>Events</span></h2>
      </div>
      <div className="events-grid">
        {eventData.map((e, i) => (
          <EventCard key={e.title} {...e} delay={i * 150} />
        ))}
      </div>
    </section>
  )
}

// ── MISSION ────────────────────────────────────────────────────────────────
function Mission() {
  return (
    <section id="mission" className="mission-section">
      <div className="mission-bg" />
      <div className="mission-content">
        <div className="mission-kanji">空手道</div>
        <p className="mission-quote">
          "Karate is not just a sport — it is a <span>shield</span> against the darkness
          of substance abuse, violence, and despair."
        </p>
        <p className="mission-sub">
          At JKS College of Open Hand, every kick, every kata, every breath of focused
          effort is a step away from destructive paths — and toward a life of honour,
          health, and community.
        </p>
        <a href="#enrol" className="btn-primary">Join the Dojo</a>
      </div>
    </section>
  )
}

// ── ENROL ──────────────────────────────────────────────────────────────────
const programOptions = [
  'Little Tigers (3–6 yrs)',
  'Junior Karate (7–12 yrs)',
  'Youth Champions (13–17 yrs)',
  'Adults – Traditional Karate',
  'Kaerobics',
  'Self-Defence',
  'Silver Warriors (55–80 yrs)',
  'Fitness Training',
]

function Enrol() {
  const [form, setForm]           = useState({ name:'', age:'', program:'', phone:'', email:'', message:'' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Enquiry submitted:', form)
    setSubmitted(true)
    setForm({ name:'', age:'', program:'', phone:'', email:'', message:'' })
    setTimeout(() => setSubmitted(false), 6000)
  }

  return (
    <section id="enrol" className="enrol-section">
      <div className="section-header">
        <div className="section-label">Begin Your Journey</div>
        <h2 className="section-title">Enrol <span>Today</span></h2>
      </div>
      <div className="enrol-grid">
        <div className="enrol-info">
          <h3>Contact &amp; Location</h3>
          <ul className="info-list">
            <li>📍 Kwekwe, Midlands Province, Zimbabwe</li>
            <li>🥋 JKS Shotokan Karate College of Open Hand</li>
            <li>👤 Chief Instructor: Sensei Shepherd Ziwira</li>
            <li>🎽 Ages 3 to 80 welcome — all levels</li>
            <li>🗓️ Classes run throughout the week</li>
            <li>🌍 Affiliated: Japan Karate Association of Zimbabwe</li>
          </ul>
        </div>
        <form className="enrol-form" onSubmit={handleSubmit}>
          {submitted && (
            <div className="form-success">
              ✓ Thank you! Your enquiry has been received. Sensei Ziwira will be in touch shortly.
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input id="age" name="age" type="number" placeholder="Age (3 – 80)" min="3" max="80" value={form.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="program">Program of Interest</label>
            <select id="program" name="program" value={form.program} onChange={handleChange} required>
              <option value="">Select a program…</option>
              {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone / WhatsApp</label>
            <input id="phone" name="phone" type="tel" placeholder="+263 …" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email (optional)</label>
            <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message (optional)</label>
            <textarea id="message" name="message" rows="3" placeholder="Any questions or details…" value={form.message} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop:'0.5rem', border:'none', width:'100%' }}>
            Send Enquiry ›
          </button>
        </form>
      </div>
    </section>
  )
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">JKS · Open Hand</div>
      <div className="footer-text">Traditional Karate · Kwekwe, Zimbabwe · For all ages</div>
      <ul className="footer-links">
        {[
          ['#disciplines','Disciplines'],
          ['#sensei','Sensei'],
          ['#kata','Kata'],
          ['#events','Events'],
          ['#enrol','Enrol'],
        ].map(([href, label]) => (
          <li key={href}><a href={href}>{label}</a></li>
        ))}
      </ul>
    </footer>
  )
}

// ── APP ROOT ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Disciplines />
        <Sensei />
        <Programs />
        <KataTutorials />
        <Tournaments />
        <Events />
        <Mission />
        <Enrol />
      </main>
      <Footer />
    </>
  )
}