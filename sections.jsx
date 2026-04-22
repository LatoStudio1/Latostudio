// Page sections: Navbar, Hero, StartSection, FeaturesChess, FeaturesGrid, Stats, Testimonials, CtaFooter

const { useRef, useEffect, useState } = React;

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const sections = [
      ["Home", null],
      ["Capabilities", "capabilities"],
      ["Work", "our-work"],
      ["FAQ", "faq"],
      ["Contacts", "contact"],
    ];
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      if (atBottom) { setActive("Contacts"); return; }
      let current = "Home";
      for (const [label, id] of sections) {
        if (!id) continue;
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = label;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between py-3" style={{ transition: "all 0.3s ease" }}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center">
          <span className="font-heading italic text-white text-lg leading-none">L</span>
        </div>
        <span className="font-heading italic text-white text-lg hidden sm:block">Lato Studio</span>
      </div>

      {/* Center nav pill */}
      <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1 items-center gap-1">
        {[["Home","#"],["Capabilities","#capabilities"],["Work","#our-work"],["FAQ","#faq"],["Contacts","#contact"]].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="px-3 py-2 text-sm font-medium font-body transition-all rounded-full"
            style={{
              color: active === label ? "#000" : "rgba(255,255,255,0.75)",
              background: active === label ? "#fff" : "transparent",
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Mobile CTA */}
      <a href="#contact" className="md:hidden flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body">
        Contacts
      </a>
    </nav>
  );
}

// ── CreatorsCarousel ───────────────────────────────────────────────────────
const creators = [
  { name: "Ninna e Matti",   subs: "2,6M subscribers",  img: "https://yt3.googleusercontent.com/KFZVoYTrTISUy1POqnB0KBs_P3YUCrlt0DxHgH6JDf6Vx7NIaQ_pxpQGAN9zAxqkzFLM7Ll5=s900-c-k-c0x00ffffff-no-rj" },
  { name: "Marcello Ascani", subs: "1,06M subscribers", img: "https://cdn-magazine.startupitalia.eu/wp-content/uploads/2024/07/30075347/Screenshot-2024-07-30-075245-1.jpg" },
  { name: "Breakfast Club",  subs: "307K subscribers",  img: "https://i.scdn.co/image/ab6761610000e5ebd87575f2800fa708e0e06c23" },
  { name: "Giada e Mamma",   subs: "740K subscribers",  img: "https://yt3.googleusercontent.com/phWRKiXE8F9Cm4vwg5-1Jz8PvSDN4mgfRBi_UXO_N-vcEQEPoJrr2YcUAWAu6B2HzCw0PuGn=s900-c-k-c0x00ffffff-no-rj" },
  { name: "Jack Nobile",     subs: "1,48M subscribers", img: "https://jacknobile.it/wp-content/uploads/elementor/thumbs/fotoprofilo11-1-r5g2ocy52o1kk4wb8onbbyzqpmg0j5ce7joof33ioo.jpg" },
];

function CreatorsCarousel() {
  // triple for seamless loop — animate exactly one third back
  const items = [...creators, ...creators, ...creators];
  return (
    <div className="w-full" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", overflowX: "hidden", overflowY: "visible", paddingTop: "12px", paddingBottom: "12px" }}>
      <div
        className="flex gap-5"
        style={{
          animation: "carousel-scroll 28s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((c, i) => (
          <div
            key={i}
            className="liquid-glass rounded-2xl flex flex-col items-center gap-4 px-8 py-7 flex-shrink-0"
            style={{ width: "220px", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src={c.img}
              alt={c.name}
              className="w-20 h-20 rounded-full object-cover"
              style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
            />
            <div className="text-center">
              <p className="text-white font-body font-medium text-base leading-tight">{c.name}</p>
              <p className="text-white/50 font-body font-light text-sm mt-1">{c.subs}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const fadeStyle = (delay) => ({
    opacity: mounted ? 1 : 0,
    filter: mounted ? "blur(0px)" : "blur(10px)",
    transform: mounted ? "translateY(0px)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}ms, filter 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <section className="relative overflow-hidden" style={{ height: "1000px" }}>
      {/* Background video */}
      <video
        autoPlay loop muted playsInline
        poster="/images/hero_bg.jpeg"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ objectPosition: "center center" }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
        style={{ height: "300px", background: "linear-gradient(to bottom, transparent, black)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center" style={{ paddingTop: "150px" }}>
        {/* Heading */}
        <div className="max-w-3xl mx-auto px-4 mb-6">
          <BlurText
            text="The Thumbnails Your Channel Deserves"
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-hero font-bold text-white leading-[0.85] tracking-[-3px]"
            delay={100}
          />
        </div>

        {/* Subtext */}
        <p
          className="text-sm md:text-base text-white/70 font-body font-light leading-relaxed max-w-md mx-auto mb-8 px-4"
          style={fadeStyle(800)}
        >
          High-click visuals. Stronger first impressions. Designed with AI, refined by experts. This is thumbnail design, wildly reimagined.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4" style={fadeStyle(1100)}>
          <a
            href="#our-work"
            className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium font-body text-white flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            Our Work
          </a>
          <a
            href="#contact"
            className="text-white/80 text-sm font-body font-light hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Creators bar */}
        <div className="mt-auto pt-20 pb-12 w-full flex flex-col items-center gap-8" style={fadeStyle(1400)}>
          <p className="font-heading italic text-white text-2xl md:text-3xl lg:text-4xl text-center px-4" style={{ textWrap: "balance" }}>
            Trusted by creators with millions of followers.
          </p>
          <CreatorsCarousel />
        </div>
      </div>
    </section>
  );
}

// ── StartSection ───────────────────────────────────────────────────────────
function StartSection() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "600px" }}>
      <HLSVideo
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, black 0%, transparent 200px)" }} />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(to top, black 0%, transparent 200px)" }} />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4" style={{ minHeight: "600px" }}>
        <FadeIn className="mb-5">
          <SectionBadge>How It Works</SectionBadge>
        </FadeIn>
        <FadeIn delay={100} className="mb-6">
          <BlurText
            text="You post it. We make it click."
            className="text-4xl md:text-5xl lg:text-6xl font-hero font-bold text-white tracking-tight leading-[0.9]"
            delay={80}
          />
        </FadeIn>
        <FadeIn delay={250} className="mb-8 max-w-lg">
          <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed">
            Share your video topic. Our AI handles research, concepts, layout, and visual direction. Then experts refine every detail into a thumbnail built to perform.
          </p>
        </FadeIn>
        <FadeIn delay={400}>
          <a href="#" className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium font-body text-white flex items-center gap-2 hover:bg-white/10 transition-colors">
            Get Started <IconArrowUpRight size={15} />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ── FeaturesChess ──────────────────────────────────────────────────────────
function FeaturesChess() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => { setHasScrolled(true); window.removeEventListener("scroll", onScroll); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rows = [
    {
      title: "Designed to stop the scroll.",
      body: "Every thumbnail is built with intent. Our AI studies patterns across high-performing videos, then helps craft visuals made to earn attention instantly.",
      cta: "Learn more",
      gif: "https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif",
      reverse: false,
    },
    {
      title: "It gets sharper over time.",
      body: "Your creative direction evolves with performance. We analyze packaging patterns, test visual approaches, and improve what gets people to click.",
      cta: "See how it works",
      gif: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
      reverse: true,
    },
  ];

  return (
    <section id="capabilities" className="relative z-10 py-24 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-20">
          {hasScrolled && <SectionBadge>Capabilities</SectionBadge>}
          {hasScrolled && <BlurText
            text="Pro thumbnails. Zero guesswork."
            className="text-4xl md:text-5xl lg:text-6xl font-hero font-bold text-white tracking-tight leading-[0.9] mt-4"
            delay={80}
          />}
        </FadeIn>

        {/* Rows */}
        <div className="flex flex-col gap-24">
          {rows.map((row, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className={`flex flex-col ${row.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-16`}>
                {/* Content */}
                <div className="flex-1 flex flex-col gap-5">
                  <h3 className="text-3xl md:text-4xl font-heading italic text-white leading-tight">{row.title}</h3>
                  <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed max-w-md">{row.body}</p>
                  <div>
                    <a href="#" className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium font-body text-white inline-flex items-center gap-2 hover:bg-white/10 transition-colors">
                      {row.cta} <IconArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
                {/* GIF */}
                <div className="flex-1 w-full">
                  <div className="liquid-glass rounded-2xl overflow-hidden aspect-video">
                    <img src={row.gif} alt={row.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────
const faqItems = [
  { q: "How do you create your thumbnails?", a: "We combine AI-powered design research with expert human refinement. Our process starts with analysing top-performing videos in your niche, then crafting compositions, color and typography built to earn clicks." },
  { q: "What kind of channels do you work with?", a: "We specialise in IRL, gaming, finance, lifestyle and educational content — but we're versatile and can adapt our visual direction to any niche or brand identity." },
  { q: "How can a professionally designed thumbnail benefit my channel?", a: "A well-designed thumbnail is the single highest-leverage asset for your video. It directly influences click-through rate, watch time, and how the algorithm surfaces your content to new audiences." },
  { q: "How fast is the turnaround?", a: "Most thumbnails are delivered within 24 hours of briefing. Rush delivery is available for tight upload schedules." },
  { q: "Do you offer revisions?", a: "Yes — every project includes revision rounds until you're fully satisfied with the result. We iterate quickly based on your feedback." },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="relative z-10 py-20 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-12">
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="text-4xl md:text-5xl font-hero font-bold text-white mt-4 tracking-tight">Common questions.</h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="liquid-glass rounded-2xl overflow-hidden divide-y divide-white/10">
            {faqItems.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-body font-medium text-sm md:text-base">{item.q}</span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full liquid-glass-strong flex items-center justify-center text-white/70 transition-transform"
                    style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="6" y1="0" x2="6" y2="12"/><line x1="0" y1="6" x2="12" y2="6"/>
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: open === i ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p className="px-6 pb-5 pt-1 text-white/60 font-body font-light text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── OurWork ───────────────────────────────────────────────────────────────
const row1imgs = [
  "uploads/pozzo2.jpg",
  "uploads/zucca2.jpg",
  "uploads/YELLOWJACKETS.jpg",
  "uploads/COLLASSO.jpg",
  "uploads/VERSIONE 3.jpg",
  "uploads/CAP.jpg",
  "uploads/DTI22.jpg",
  "uploads/24672.jpg",
  "uploads/control anger.jpg",
];
const row2imgs = [
  "uploads/just.jpg",
  "uploads/SUCCEDE.jpg",
  "uploads/CR3.png",
  "uploads/EURO.jpg",
  "uploads/HUNTRIX.jpg",
  "uploads/MBH.jpg",
  "uploads/mcdonalds4.jpg",
  "uploads/stranger2.jpg",
];
const row3imgs = [
  "uploads/FIUME1.jpg",
  "uploads/COLORIKPOP1.jpg",
  "uploads/BAMBOLA2.jpg",
  "uploads/grtttt-4b1bce61.png",
  "uploads/maxresdefault (6).jpg",
  "uploads/vergogna.jpg",
  "uploads/MUAI22.jpg",
  "uploads/MUAY.jpg",
];

function OurWorkRow({ images, reverse, speed }) {
  const items = [...images, ...images, ...images];
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4"
        style={{
          width: "max-content",
          animation: `ow-scroll-${reverse ? "rev" : "fwd"} ${speed} linear infinite`,
        }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: "280px", height: "158px" }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

function OurWork() {
  return (
    <section id="our-work" className="relative z-10 py-24 bg-black overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-14">
        <FadeIn className="text-center">
          <SectionBadge>Our Work</SectionBadge>
          <BlurText
            text="Thumbnails that perform."
            className="text-4xl md:text-5xl lg:text-6xl font-hero font-bold text-white tracking-tight leading-[0.9] mt-4"
            delay={80}
          />
        </FadeIn>
      </div>

      <div
        className="flex flex-col gap-4"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <OurWorkRow images={row1imgs} reverse={false} speed="60s" />
        <OurWorkRow images={row2imgs} reverse={true}  speed="75s" />
        <OurWorkRow images={row3imgs} reverse={false} speed="68s" />
      </div>

      <style>{`
        @keyframes ow-scroll-fwd { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        @keyframes ow-scroll-rev { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(0); } }
      `}</style>
    </section>
  );
}

// ── FeaturesGrid ───────────────────────────────────────────────────────────
function FeaturesGrid() {
  const cards = [
    { icon: IconZap, title: "Fast Turnaround", body: "From idea to finished thumbnail in a timeframe that keeps up with your upload schedule." },
    { icon: IconPalette, title: "Obsessively Crafted", body: "Every composition, facial expression, contrast choice, and hierarchy refined for maximum visual impact." },
    { icon: IconBarChart3, title: "Built to Click", body: "Creative decisions informed by performance logic, audience behavior, and packaging strategy." },
    { icon: IconShield, title: "Consistent by Default", body: "Strong visual identity across your channel, so every upload feels sharper, stronger, and more recognizable." },
  ];

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <SectionBadge>Why Us</SectionBadge>
          <BlurText
            text="The difference is everything."
            className="text-4xl md:text-5xl lg:text-6xl font-hero font-bold text-white tracking-tight leading-[0.9] mt-4"
            delay={80}
          />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="liquid-glass rounded-2xl p-6 h-full flex flex-col gap-4">
                <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <card.icon size={18} className="text-white" />
                </div>
                <h4 className="text-white font-body font-medium text-base">{card.title}</h4>
                <p className="text-white/60 font-body font-light text-sm leading-relaxed">{card.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Stats ──────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: "500+", label: "Thumbnails delivered" },
    { value: "96%", label: "Client satisfaction" },
    { value: "3.4×", label: "Higher CTR potential" },
    { value: "24h", label: "Average turnaround" },
  ];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "500px" }}>
      <HLSVideo
        src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
        desaturate
      />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, black 0%, transparent 200px)" }} />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(to top, black 0%, transparent 200px)" }} />
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center py-28 px-6">
        <FadeIn className="w-full max-w-4xl">
          <div className="liquid-glass rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
              {stats.map((s, i) => (
                <div key={i} className="text-center flex flex-col gap-2">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-none">{s.value}</span>
                  <span className="text-white/60 font-body font-light text-xs md:text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote: "We changed the packaging and the difference was immediate. Better clicks, stronger branding, and a much more premium feel.",
      name: "Sarah Chen",
      role: "Creator, Luminary",
    },
    {
      quote: "CTR went up dramatically. The thumbnails finally looked like they belonged to a serious channel.",
      name: "Marcus Webb",
      role: "Growth Lead, Arcline",
    },
    {
      quote: "They didn't just make thumbnails. They helped define the visual identity of the whole channel.",
      name: "Elena Voss",
      role: "Brand Director, Helix",
    },
  ];

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <SectionBadge>What They Say</SectionBadge>
          <BlurText
            text="Don't take our word for it."
            className="text-4xl md:text-5xl lg:text-6xl font-hero font-bold text-white tracking-tight leading-[0.9] mt-4"
            delay={80}
          />
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="liquid-glass rounded-2xl p-8 flex flex-col gap-5 h-full">
                <p className="text-white/80 font-body font-light text-sm italic leading-relaxed flex-1">"{t.quote}"</p>
                <div>
                  <p className="text-white font-body font-medium text-sm">{t.name}</p>
                  <p className="text-white/50 font-body font-light text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ContactForm ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  const inputStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1.4px solid rgba(255,255,255,0.15)",
    borderRadius: "14px",
    color: "white",
    padding: "14px 18px",
    width: "100%",
    outline: "none",
    fontFamily: "'Barlow', sans-serif",
    fontSize: "14px",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="relative z-10 py-28 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-2xl mx-auto">
        <FadeIn className="text-center mb-12">
          <SectionBadge>Contact</SectionBadge>
          <h2 className="text-5xl md:text-6xl font-hero font-bold text-white mt-4 tracking-tight">Let's talk.</h2>
        </FadeIn>
        {sent ? (
          <FadeIn>
            <div className="liquid-glass rounded-2xl p-12 text-center">
              <p className="text-white font-hero font-bold text-2xl mb-2">Message sent!</p>
              <p className="text-white/60 font-body font-light text-sm">We'll get back to you shortly.</p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={100}>
            <form onSubmit={submit} className="liquid-glass rounded-2xl p-8 flex flex-col gap-4">
              <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handle} required style={inputStyle} onFocus={e => e.target.style.borderColor="rgba(255,255,255,0.4)"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.15)"} />
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handle} required style={inputStyle} onFocus={e => e.target.style.borderColor="rgba(255,255,255,0.4)"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.15)"} />
              <textarea name="message" placeholder="Write your message" value={form.message} onChange={handle} required rows={5} style={{ ...inputStyle, resize: "none" }} onFocus={e => e.target.style.borderColor="rgba(255,255,255,0.4)"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.15)"} />
              <button type="submit" className="w-full bg-white text-black font-hero font-bold text-sm rounded-2xl py-4 hover:bg-white/90 transition-colors mt-1">Submit</button>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

// ── CtaFooter ──────────────────────────────────────────────────────────────
function CtaFooter() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "300px" }}>
      <HLSVideo
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, black 0%, transparent 200px)" }} />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-end h-full py-10 px-6" style={{ minHeight: "300px" }}>
        <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <span className="text-white/40 text-xs font-body">© 2026 Lato Studio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="text-white/40 text-xs font-body hover:text-white/70 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────
Object.assign(window, {
  Navbar, Hero, StartSection, FeaturesChess, FeaturesGrid, OurWork, FAQ, Stats, Testimonials, ContactForm, CtaFooter,
});
