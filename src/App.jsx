import { useState, useEffect, useRef } from 'react'
import './App.css'

// ── Asset imports ──────────────────────────────────────────────────────────
import heroBg      from './assets/hero.png'
import senseiPhoto from './assets/profile/WhatsApp Image 2026-07-23 at 07.16.41.jpeg'
import starPupils  from './assets/Star_Pupils/WhatsApp Image 2026-07-23 at 09.28.52.jpeg'
import event1      from './assets/Events/event1.jpg'
import event2      from './assets/Events/event2.jpeg'
import kata3       from './assets/Kata_tutorials/kata3.mp4'
import watermarkLogo from './assets/international-shotokan-karate-federation-international-shotokan-karate-federation-martial-arts-kata-karate-c62d54cdb300898f4da4345ce3a00af0.png'

// Pull in every image inside src/assets/Gallery automatically — no need to
// import each file by name, and no need to touch this code when photos are
// added or removed from that folder.
const galleryModules = import.meta.glob(
  './assets/Gallery/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' }
)
const galleryImages = Object.entries(galleryModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src], i) => ({
    src,
    alt: `JKS Shotokan Karate College gallery photo ${i + 1}`,
  }))

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
    { href: '#sensei',      label: 'Sensei'       },
    { href: '#pupils',      label: 'Pupils'       },
    { href: '#programs',    label: 'Programs'     },
    { href: '#kata',        label: 'Kata'         },
    { href: '#tournaments', label: 'Tournaments'  },
    { href: '#events',      label: 'Events'       },
    { href: '#gallery',     label: 'Gallery'      },
    { href: '#enrol',       label: 'Enrol'        },
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
      style={{ backgroundImage:`url(${heroBg})`, backgroundSize:'cover', backgroundPosition:'center' }}
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
    { number: '5th', label: 'Dan Black Belt'     },
    { number: '3+',  label: 'Age 3 Welcome'      },
    { number: '5',   label: 'Disciplines'         },
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
    <div className="discipline-card" ref={ref} style={{ transitionDelay:`${delay}ms` }}>
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

        {/* Portrait + quick profile */}
        <div className="sensei-portrait-wrap">
          <div className="sensei-portrait" style={{ padding:0, overflow:'hidden' }}>
            <img
              src={senseiPhoto}
              alt="Sensei Shepherd Ziwira and his wife"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }}
            />
          </div>
          <div className="portrait-caption">Sensei Ziwira &amp; Family · JKS Zimbabwe</div>

          <div className="sensei-profile-card">
            <div className="profile-card-title">Quick Profile</div>
            {[
              { label: 'Full Name', value: 'Shepherd Ziwira'                  },
              { label: 'Age',       value: '53 years old'                     },
              { label: 'Rank',      value: '5th Dan Black Belt — JKS Shotokan'},
              { label: 'Based',     value: 'Kwekwe, Midlands Province'        },
              { label: 'Origin',    value: 'Glen Norah, Harare'               },
            ].map(({ label, value }) => (
              <div className="profile-card-row" key={label}>
                <span className="profile-card-label">{label}</span>
                <span className="profile-card-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="sensei-content">
          <div className="sensei-label">Chief Instructor &amp; Founder</div>
          <h2 className="sensei-name">Shepherd<br />Ziwira</h2>
          <div className="sensei-rank">5th Dan Black Belt · National Team Coach</div>

          <p className="sensei-bio">
            One of Zimbabwe's most respected karate instructors and community leaders,
            Sensei Ziwira began his journey in <strong style={{ color:'#c9a84c' }}>1988</strong> as
            a quiet high school student in Glen Norah, Harare — taking up martial arts not for
            glory, but to defend women and children from bullies.
          </p>
          <p className="sensei-bio">
            He trained first in <em>Kyokushin Kai</em> under Sensei Jimmy Mageza, then moved
            through <em>Shukokai</em> in the 1990s, before committing fully to <em>Shotokan</em> after
            relocating to Kwekwe — where he trained under legends Amos Chihlava, Gibson Sangweni,
            and Bearn Mavhiya.
          </p>

          <div className="sensei-pillars">
            {[
              {
                icon: '🥋',
                heading: 'Coaching & Administration',
                text: 'Runs karate clubs across the Midlands and serves as JKS Shotokan Technical Director for the region, developing the next generation of fighters.',
              },
              {
                icon: '🤝',
                heading: 'Community Work',
                text: 'Uses karate as a tool to fight drug and alcohol abuse among youth — keeping kids off the streets through discipline and sport.',
              },
              {
                icon: '🏆',
                heading: 'Tournaments',
                text: 'Organises events including the JKS Invitational National Karate Championships in Kwekwe.',
              },
              {
                icon: '👨‍👩‍👦',
                heading: 'Family Legacy',
                text: 'Sons Tinashe, Tanyaradzwa, and Tamuka Ziwira are all karatekas — holding 2nd and 3rd dan black belts and regional national gold medals.',
              },
            ].map(p => (
              <div className="sensei-pillar" key={p.heading}>
                <div className="sensei-pillar-icon">{p.icon}</div>
                <div>
                  <div className="sensei-pillar-heading">{p.heading}</div>
                  <div className="sensei-pillar-text">{p.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="credentials">
            {[
              'Chief Instructor, Japan Karate Association of Zimbabwe',
              'JKS Shotokan Technical Director — Midlands Karate Union',
              'Zimbabwe National Karate Team Coach & Senior Referee',
              'Chief Referee, Midlands Karate Union',
              'Organiser, JKS Invitational National Karate Championships',
            ].map(c => (
              <div className="credential-item" key={c}>
                <div className="credential-dot" />
                <span>{c}</span>
              </div>
            ))}
          </div>

          <div className="sensei-quote">
            <span className="sensei-quote-mark">"</span>
            Karate built my life — it took me from the tough streets of Glen Norah
            to becoming a national coach and mentor.
            <span className="sensei-quote-mark">"</span>
            <div className="sensei-quote-attr">— Sensei Shepherd Ziwira</div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── STAR PUPILS ────────────────────────────────────────────────────────────
const pupilNames = ['Lovemore', 'Ardon', 'Lance', 'Tanyaradzwa', 'Lucky', 'TBA']

function StarPupils() {
  return (
    <section id="pupils" className="pupils-section">
      <div className="section-header">
        <div className="section-label">Pride of the Dojo</div>
        <h2 className="section-title">Star <span>Pupils</span></h2>
        <p className="section-intro">
          The next generation of JKS champions — trained under Sensei Ziwira
          and representing the college with honour and discipline.
        </p>
      </div>

      <div className="pupils-inner">
        <div className="pupils-photo-wrap">
          <img src={starPupils} alt="JKS Star Pupils" className="pupils-photo" />
          <div className="pupils-name-strip">
            {pupilNames.map((name, i) => (
              <div className="pupil-label" key={i}>
                <div className="pupil-label-num">{i + 1}</div>
                <div className="pupil-label-name">
                  {name === 'TBA'
                    ? <em style={{ color:'var(--mgrey)', fontSize:'0.8rem' }}>Name pending</em>
                    : name
                  }
                </div>
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
  { name: 'Junior Karate',        age: '7 – 12 yrs',  level: 'Beginner – Intermediate', focus: 'Kata, kihon, character development, anti-bullying'           },
  { name: 'Youth Champions',      age: '13 – 17 yrs', level: 'All levels',              focus: 'Sport karate, self-discipline, drug & alcohol resistance'    },
  { name: 'Adults – Traditional', age: '18 – 55 yrs', level: 'All levels',              focus: 'Traditional Shotokan, self-defence, fitness, competition'    },
  { name: 'Kaerobics',            age: '16 – 65 yrs', level: 'No experience needed',    focus: 'Cardio fitness, fun, karate-inspired aerobics'               },
  { name: 'Silver Warriors',      age: '55 – 80 yrs', level: 'Gentle pace',             focus: 'Flexibility, balance, mental sharpness, social wellness'     },
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
// Only one video currently — rail is hidden when there is only 1 item
const kataData = [
  { src: kata3, title: 'Kata Demonstration', desc: 'Sensei Ziwira demonstrates fundamental kata form with precision and power.' },
]

function KataTutorials() {
  const [active, setActive] = useState(0)
  const ref = useReveal()
  const hasMultiple = kataData.length > 1

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

      {/* Single-video: full-width player. Multiple: player + rail side by side */}
      <div className={`kata-inner${hasMultiple ? '' : ' kata-single'}`} ref={ref}>
        <div className="kata-player-wrap">
          <video key={kataData[active].src} className="kata-player" controls playsInline>
            <source src={kataData[active].src} type="video/mp4" />
            Your browser does not support video playback.
          </video>
          <div className="kata-player-info">
            <div className="kata-player-title">{kataData[active].title}</div>
            <div className="kata-player-desc">{kataData[active].desc}</div>
          </div>
        </div>

        {/* Only render the rail when there are multiple videos */}
        {hasMultiple && (
          <div className="kata-rail">
            {kataData.map((k, i) => (
              <button
                key={i}
                className={`kata-thumb${active === i ? ' active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="kata-thumb-num">{active === i ? '▶' : String(i + 1).padStart(2, '0')}</div>
                <div className="kata-thumb-text">
                  <div className="kata-thumb-title">{k.title}</div>
                  <div className="kata-thumb-desc">{k.desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}
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
    <div className="tournament-card" ref={ref} style={{ transitionDelay:`${delay}ms` }}>
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
    <div className="event-card" ref={ref} style={{ transitionDelay:`${delay}ms` }}>
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

// ── GALLERY ────────────────────────────────────────────────────────────────
function GalleryThumb({ src, alt, delay, onClick }) {
  const ref = useReveal()
  return (
    <button
      className="gallery-thumb"
      ref={ref}
      style={{ transitionDelay:`${delay}ms` }}
      onClick={onClick}
      aria-label={`Open ${alt} in full size`}
    >
      <img src={src} alt={alt} loading="lazy" />
    </button>
  )
}

function GalleryLightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape')    onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onPrev, onNext])

  const current = images[index]

  return (
    <div className="gallery-lightbox" onClick={onClose}>
      <button
        className="gallery-lightbox-close"
        onClick={onClose}
        aria-label="Close gallery viewer"
      >✕</button>

      <button
        className="gallery-lightbox-nav gallery-lightbox-prev"
        onClick={e => { e.stopPropagation(); onPrev() }}
        aria-label="Previous photo"
      >‹</button>

      <img
        key={current.src}
        src={current.src}
        alt={current.alt}
        className="gallery-lightbox-img"
        onClick={e => e.stopPropagation()}
      />

      <button
        className="gallery-lightbox-nav gallery-lightbox-next"
        onClick={e => { e.stopPropagation(); onNext() }}
        aria-label="Next photo"
      >›</button>

      <div className="gallery-lightbox-counter">
        {index + 1} / {images.length}
      </div>
    </div>
  )
}

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  const open  = i => setActiveIndex(i)
  const close = () => setActiveIndex(null)
  const prev  = () => setActiveIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)
  const next  = () => setActiveIndex(i => (i + 1) % galleryImages.length)

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-header">
        <div className="section-label">Moments from the Dojo</div>
        <h2 className="section-title">Photo <span>Gallery</span></h2>
        <p className="section-intro">
          Training sessions, gradings, and tournaments — a look at life at
          JKS Shotokan Karate College of Open Hand.
        </p>
      </div>

      {galleryImages.length === 0 ? (
        <p className="gallery-empty">
          Photos coming soon — check back after our next event.
        </p>
      ) : (
        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <GalleryThumb
              key={img.src}
              src={img.src}
              alt={img.alt}
              delay={(i % 8) * 60}
              onClick={() => open(i)}
            />
          ))}
        </div>
      )}

      {activeIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
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

const SENSEI_EMAIL    = 'kwekweshotokan@gmail.com'
const SENSEI_WHATSAPP = '263772214281'

function Enrol() {
  const [form, setForm] = useState({
    name: '', age: '', program: '', phone: '', email: '', message: ''
  })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  // Sends via the user's default email app
  const handleEmailSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Enrolment Enquiry – ${form.name}`)
    const body = encodeURIComponent(
`New enrolment enquiry from the JKS Karate website.

Name:    ${form.name}
Age:     ${form.age}
Program: ${form.program}
Phone:   ${form.phone}
Email:   ${form.email || '(not provided)'}

Message:
${form.message || '(none)'}`)

    window.location.href = `mailto:${SENSEI_EMAIL}?subject=${subject}&body=${body}`
  }

  // Sends via WhatsApp
  const handleWhatsAppSubmit = e => {
    e.preventDefault()
    const text = encodeURIComponent(
`Hello Sensei Ziwira, I found your website and would like to enquire about joining JKS Karate.

*Name:*    ${form.name}
*Age:*     ${form.age}
*Program:* ${form.program}
*Phone:*   ${form.phone}
*Email:*   ${form.email || '(not provided)'}

*Message:*
${form.message || '(none)'}`)

    window.open(`https://wa.me/${SENSEI_WHATSAPP}?text=${text}`, '_blank')
  }

  return (
    <section id="enrol" className="enrol-section">
      <div className="section-header">
        <div className="section-label">Begin Your Journey</div>
        <h2 className="section-title">Enrol <span>Today</span></h2>
      </div>

      <div className="enrol-grid">

        {/* Contact info */}
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

          {/* Direct contact buttons */}
          <div className="enrol-direct">
            <div className="enrol-direct-title">Reach Us Directly</div>

            <a
              href={`mailto:${SENSEI_EMAIL}`}
              className="enrol-contact-btn enrol-email"
            >
              <span className="enrol-contact-icon">✉</span>
              <div>
                <div className="enrol-contact-label">Email</div>
                <div className="enrol-contact-value">{SENSEI_EMAIL}</div>
              </div>
            </a>

            <a
              href={`https://wa.me/${SENSEI_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="enrol-contact-btn enrol-whatsapp"
            >
              <span className="enrol-contact-icon">💬</span>
              <div>
                <div className="enrol-contact-label">WhatsApp</div>
                <div className="enrol-contact-value">+263 77 221 4281</div>
              </div>
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="enrol-form-wrap">
          <p className="enrol-form-hint">
            Fill in your details, then choose how to send — by email or WhatsApp.
          </p>

          <form className="enrol-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" placeholder="Your full name"
                value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input id="age" name="age" type="number" placeholder="Age (3 – 80)"
                min="3" max="80" value={form.age} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="program">Program of Interest</label>
              <select id="program" name="program" value={form.program}
                onChange={handleChange} required>
                <option value="">Select a program…</option>
                {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone / WhatsApp</label>
              <input id="phone" name="phone" type="tel" placeholder="+263 …"
                value={form.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (optional)</label>
              <input id="email" name="email" type="email" placeholder="your@email.com"
                value={form.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (optional)</label>
              <textarea id="message" name="message" rows="3"
                placeholder="Any questions or details…"
                value={form.message} onChange={handleChange} />
            </div>

            {/* Two submit buttons — email or WhatsApp */}
            <div className="form-submit-row">
              <button
                type="button"
                className="btn-submit-email"
                onClick={handleEmailSubmit}
              >
                ✉ Send via Email
              </button>
              <button
                type="button"
                className="btn-submit-whatsapp"
                onClick={handleWhatsAppSubmit}
              >
                💬 Send via WhatsApp
              </button>
            </div>

          </form>
        </div>
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
          ['#disciplines', 'Disciplines'],
          ['#sensei',      'Sensei'      ],
          ['#pupils',      'Pupils'      ],
          ['#kata',        'Kata'        ],
          ['#events',      'Events'      ],
          ['#gallery',     'Gallery'     ],
          ['#enrol',       'Enrol'       ],
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
      <div
        className="site-watermark"
        style={{ backgroundImage: `url(${watermarkLogo})` }}
        aria-hidden="true"
      />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Disciplines />
        <Sensei />
        <StarPupils />
        <Programs />
        <KataTutorials />
        <Tournaments />
        <Events />
        <Gallery />
        <Mission />
        <Enrol />
      </main>
      <Footer />
    </>
  )
}