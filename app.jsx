const { useState, useEffect } = React;

// Tweaks defaults
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentGlow": true,
  "glassStrength": "medium",
  "heroParallax": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const updateTweak = (key, value) => {
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: value } }, "*");
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="bg-black">
          <FeaturesChess />
          <OurWork />
          <FAQ />
          <FeaturesGrid />
          <Stats />
          <Testimonials />
          <ContactForm />
          <CtaFooter />
        </div>
      </div>

      {/* Tweaks Panel */}
      {tweaksOpen && (
        <div className="fixed bottom-6 right-6 z-[999] liquid-glass-strong rounded-2xl p-5 w-64 text-white font-body">
          <h3 className="font-medium text-sm mb-4 text-white/90">Tweaks</h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-between text-xs text-white/70">
              Accent glow
              <button
                onClick={() => updateTweak("accentGlow", !tweaks.accentGlow)}
                className={`w-9 h-5 rounded-full transition-colors relative ${tweaks.accentGlow ? "bg-white/30" : "bg-white/10"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${tweaks.accentGlow ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </label>
            <label className="flex flex-col gap-1.5 text-xs text-white/70">
              Glass strength
              <select
                value={tweaks.glassStrength}
                onChange={(e) => updateTweak("glassStrength", e.target.value)}
                className="bg-white/10 text-white text-xs rounded-lg px-2 py-1.5 border border-white/10 outline-none"
              >
                <option value="subtle">Subtle</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </label>
            <label className="flex items-center justify-between text-xs text-white/70">
              Hero parallax
              <button
                onClick={() => updateTweak("heroParallax", !tweaks.heroParallax)}
                className={`w-9 h-5 rounded-full transition-colors relative ${tweaks.heroParallax ? "bg-white/30" : "bg-white/10"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${tweaks.heroParallax ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
