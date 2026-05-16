const { useState, useEffect, useRef, useMemo } = React;

// ---------- DATA ----------
const ATHLETES = [
  {
    id: "lasara",
    name: "Lasara",
    role: "Capitã",
    num: "01",
    tag: "A Líder",
    spec: "Mente Tática",
    quote: "Eu não jogo pra participar. Eu jogo pra vencer.",
    stats: [["Box Jumps", "60"], ["Snatch", "55kg"], ["WODs", "∞"]],
    photo: "assets/lasara.png",
    accent: "var(--teal)",
    pos: "50% 18%",
  },
  {
    id: "gabrielzinho",
    name: "Gabrielzinho",
    role: "Atleta",
    num: "02",
    tag: "O Atlas",
    spec: "Força Bruta",
    quote: "Peso na barra é só número. Vontade é o que ergue.",
    stats: [["Back Squat", "180kg"], ["Clean", "120kg"], ["DL", "220kg"]],
    photo: "assets/gabrielzinho.jpg",
    accent: "var(--teal)",
    pos: "50% 35%",
  },
  {
    id: "brunao",
    name: "Brunão",
    role: "Atleta",
    num: "03",
    tag: "O Mestre",
    spec: "Resiliência",
    quote: "Cada rep conta. Cada respiração também.",
    stats: [["Rowing", "2km / 7'12''"], ["Pull-ups", "45"], ["Anos", "08"]],
    photo: "assets/brunao.png",
    accent: "var(--teal)",
    pos: "50% 30%",
  },
  {
    id: "aghata",
    name: "Aghata",
    role: "Atleta",
    num: "04",
    tag: "A Forja",
    spec: "Overhead & Mobilidade",
    quote: "A barra não me intimida. Eu intimido a barra.",
    stats: [["OHS", "60kg"], ["Snatch", "55kg"], ["Pull-ups", "30"]],
    photo: "assets/aghata.jpg",
    accent: "var(--magenta)",
    pos: "55% 35%",
  },
  {
    id: "fran-lyra",
    name: "Fran Lyra",
    role: "Atleta",
    num: "05",
    tag: "A Garra",
    spec: "Força & Foco",
    quote: "Pé no chão é detalhe. Cabeça em jogo é tudo.",
    stats: [["Front Sq.", "85kg"], ["Clean", "70kg"], ["Burpees", "100"]],
    photo: "assets/fran-lyra.jpg",
    accent: "var(--teal)",
    pos: "50% 32%",
  },
  {
    id: "melina",
    name: "Melina",
    role: "Atleta",
    num: "06",
    tag: "A Estratégia",
    spec: "Endurance & Ritmo",
    quote: "Cabeça fria, ritmo quente. É assim que se ganha.",
    stats: [["5km Run", "23'40''"], ["Burpees", "100"], ["HSPU", "20"]],
    photo: "assets/melina.jpg",
    accent: "var(--magenta)",
    pos: "50% 22%",
  },
];

// ---------- HOOKS ----------
function useCountdown(targetISO) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000); diff -= mins * 60000;
  const secs = Math.floor(diff / 1000);
  return { days, hours, mins, secs };
}

function pad(n, w = 2) { return String(n).padStart(w, "0"); }

// ---------- SVG / DECOR ----------
function PaintSplatter({ className = "", color = "var(--magenta)", seed = 1 }) {
  // pseudo-random splatter
  const dots = useMemo(() => {
    const rnd = (() => { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); })();
    return Array.from({ length: 38 }, () => ({
      cx: rnd() * 100,
      cy: rnd() * 100,
      r: 0.4 + rnd() * 3.2,
      o: 0.25 + rnd() * 0.65,
    }));
  }, [seed]);
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={color} opacity={d.o} />
      ))}
    </svg>
  );
}

function ArrowDown({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
    </svg>
  );
}

function Shield({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 48" fill="none" aria-hidden="true">
      <path d="M20 2 L36 8 V24 C36 34 28 42 20 46 C12 42 4 34 4 24 V8 Z" stroke="var(--teal)" strokeWidth="2.5" fill="rgba(24,184,192,0.06)"/>
      <path d="M20 14 L24 22 L20 30 L16 22 Z" fill="var(--teal)"/>
    </svg>
  );
}

// ---------- TICKER ----------
function Ticker({ items, speed = 36 }) {
  const list = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track" style={{ animationDuration: `${speed}s` }}>
        {list.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- HERO ----------
function Hero({ onScrollToAthletes }) {
  const cd = useCountdown("2026-06-06T08:00:00-03:00");
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-grain" />
      <PaintSplatter className="hero-splat hero-splat-1" color="var(--magenta)" seed={3} />
      <PaintSplatter className="hero-splat hero-splat-2" color="var(--teal)" seed={11} />

      <div className="hero-grid">
        <div className="hero-left">
          <div className="kicker">
            <Shield size={20}/>
            <span>TIME 10 — CROSSFIT SILVER FERN</span>
          </div>

          <h1 className="hero-title">
            <span className="word word-team">
              <span className="letter">T</span>
              <span className="letter">E</span>
              <span className="letter">A</span>
              <span className="letter">M</span>
            </span>
            <span className="word word-lasinha">
              <span className="letter teal">L</span>
              <span className="letter teal">A</span>
              <span className="letter teal">S</span>
              <span className="letter teal">I</span>
              <span className="letter teal">N</span>
              <span className="letter teal">H</span>
              <span className="letter teal">A</span>
            </span>
          </h1>

          <p className="hero-sub">
            Seis atletas. Uma capitã. Um único objetivo:
            <span className="sub-strong"> dominar o Campeonato Interno SilverFern 2026.</span>
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onScrollToAthletes}>
              CONHEÇA O TIME
              <ArrowDown size={16}/>
            </button>
            <a className="btn btn-ghost" href="#campeonato">
              EVENTO · 06.06.2026
            </a>
          </div>

          <div className="hero-meta">
            <div>
              <div className="meta-label">LOCAL</div>
              <div className="meta-val">CrossFit Silver Fern</div>
            </div>
            <div>
              <div className="meta-label">CATEGORIA</div>
              <div className="meta-val">Time Misto · Interno</div>
            </div>
            <div>
              <div className="meta-label">OBJETIVO</div>
              <div className="meta-val">Ser os Campeões</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="banner-frame">
            <img src="assets/banner.png" alt="Team Lasinha" />
            <a
              className="banner-dl"
              href="assets/banner.png"
              download="team-lasinha-banner.png"
              title="Baixar banner"
              aria-label="Baixar banner"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="countdown-bar">
        <div className="cd-label">
          <span className="cd-dot" />
          FALTAM PARA O CHAMPIONSHIP
        </div>
        <div className="cd-units">
          <div className="cd-unit"><div className="cd-num">{pad(cd.days, 3)}</div><div className="cd-cap">DIAS</div></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><div className="cd-num">{pad(cd.hours)}</div><div className="cd-cap">HORAS</div></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><div className="cd-num">{pad(cd.mins)}</div><div className="cd-cap">MIN</div></div>
          <span className="cd-sep">:</span>
          <div className="cd-unit"><div className="cd-num">{pad(cd.secs)}</div><div className="cd-cap">SEG</div></div>
        </div>
        <div className="cd-date">
          <div className="cd-date-day">06</div>
          <div className="cd-date-mon">JUN<br/>2026</div>
        </div>
      </div>
    </section>
  );
}

// ---------- MANIFESTO ----------
function Manifesto() {
  return (
    <section className="manifesto" data-screen-label="02 Manifesto">
      <div className="manifesto-inner">
        <div className="manifesto-label">
          <span className="num">/ 01</span>
          <span>O MANIFESTO</span>
        </div>
        <p className="manifesto-text">
          Não é só sobre <em>levantar</em>.<br/>
          É sobre <span className="hl-teal">levantar juntos</span>.<br/>
          Seis atletas, seis rotinas — <br/>
          unidos por um único campeonato.<br/>
          Lasinha é <span className="hl-magenta">guerreira</span>. Lasinha é <span className="hl-teal">games</span>.<br/>
          Lasinha é <span className="hl-teal">foco</span>, força e resiliência.
        </p>
      </div>
    </section>
  );
}

// ---------- ATHLETES ----------
function AthleteCard({ a }) {
  return (
    <div
      className="athlete"
      style={{ "--athlete-accent": a.accent }}
    >
      <div className="athlete-media">
        <div className="athlete-noise" />
        <img src={a.photo} alt={a.name} style={{ objectPosition: a.pos }} />
        <div className="athlete-overlay" />
        <div className="athlete-num">{a.num}</div>
        <div className="athlete-role">{a.role.toUpperCase()}</div>
      </div>
      <div className="athlete-body">
        <div className="athlete-name">{a.name.toUpperCase()}</div>
      </div>
    </div>
  );
}

function AthletePanel({ a }) {
  if (!a) return null;
  return (
    <div className="panel" key={a.id}>
      <div className="panel-photo">
        <img src={a.photo} alt={a.name} style={{ objectPosition: a.pos }} />
        <PaintSplatter className="panel-splat" color={a.accent} seed={a.num * 7}/>
        <div className="panel-photo-meta">
          <span className="panel-num">#{a.num}</span>
          <span className="panel-tag" style={{ background: a.accent }}>{a.tag.toUpperCase()}</span>
        </div>
      </div>
      <div className="panel-info">
        <div className="panel-role">{a.role}</div>
        <div className="panel-name">{a.name}</div>
        <div className="panel-spec">{a.spec}</div>
        <blockquote className="panel-quote">
          <span className="quote-mark" style={{ color: a.accent }}>"</span>
          {a.quote}
        </blockquote>
        <div className="panel-stats">
          {a.stats.map(([k, v], i) => (
            <div className="stat" key={i}>
              <div className="stat-val">{v}</div>
              <div className="stat-key">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Athletes({ refEl }) {
  return (
    <section className="athletes" ref={refEl} id="atletas" data-screen-label="03 Atletas">
      <div className="section-head">
        <div className="manifesto-label">
          <span className="num">/ 02</span>
          <span>O TIME</span>
        </div>
        <h2 className="section-title">
          SEIS NOMES.<br/>
          <span className="hl-teal">UM SÓ TIME.</span>
        </h2>
      </div>

      <div className="athlete-grid">
        {ATHLETES.map((a) => (
          <AthleteCard key={a.id} a={a} />
        ))}
      </div>
    </section>
  );
}

// ---------- MOTTOS BANNERS ----------
function Mottos() {
  return (
    <section className="mottos" data-screen-label="04 Lemas">
      <div className="mottos-inner">
        <div className="motto motto-1">
          <div className="motto-num">01</div>
          <div className="motto-headline">
            O <span className="hl-teal">PÓDIO</span><br/>
            TEM NOSSO<br/>
            NOME.
          </div>
          <div className="motto-foot">PRIMEIRO LUGAR OU NADA</div>
        </div>
        <div className="motto motto-2">
          <div className="motto-num">02</div>
          <div className="motto-headline">
            ELITE.<br/>
            SEM PEDIR<br/>
            <span className="hl-magenta">LICENÇA.</span>
          </div>
          <div className="motto-foot">RX DIVISION · TIME 10</div>
        </div>
        <div className="motto motto-3">
          <div className="motto-num">03</div>
          <div className="motto-headline">
            <span className="hl-teal">SEDE</span><br/>
            DE<br/>
            VITÓRIA.
          </div>
          <div className="motto-foot">A ÚLTIMA REP É NOSSA</div>
        </div>
      </div>
    </section>
  );
}

// ---------- CHAMPIONSHIP ----------
function Championship() {
  return (
    <section id="campeonato" className="champ" data-screen-label="05 Campeonato">
      <PaintSplatter className="champ-splat" color="var(--teal)" seed={31}/>
      <div className="champ-inner">
        <div className="manifesto-label light">
          <span className="num">/ 03</span>
          <span>O CAMPEONATO</span>
        </div>

        <div className="champ-grid">
          <div className="champ-headline">
            <h2 className="champ-title">
              SILVERFERN<br/>
              <span className="outline">2026</span>
            </h2>
            <p className="champ-desc">
              O Campeonato Interno SilverFern 2026 é onde a Lasinha entra como
              <span className="hl-teal"> Time 10</span> — com sede de vitória, foco de bisturi
              e um único destino: <span className="hl-teal">o primeiro lugar do pódio.</span>
            </p>
          </div>

          <div className="champ-card">
            <div className="card-row">
              <div className="card-col">
                <div className="meta-label">DATA</div>
                <div className="card-big">06 · 06 · 26</div>
                <div className="card-sub">SÁBADO</div>
              </div>
              <div className="card-col">
                <div className="meta-label">LOCAL</div>
                <div className="card-big small">SILVER FERN</div>
                <div className="card-sub">Box principal</div>
              </div>
            </div>

            <div className="champ-pillars">
              <div className="pillar">
                <div className="pillar-num">01</div>
                <div className="pillar-word">FORÇA</div>
                <div className="pillar-desc">Que vem de dentro. Que não pede licença.</div>
              </div>
              <div className="pillar">
                <div className="pillar-num">02</div>
                <div className="pillar-word teal">FOCO</div>
                <div className="pillar-desc">Olhos no pódio. Só isso importa.</div>
              </div>
              <div className="pillar">
                <div className="pillar-num">03</div>
                <div className="pillar-word">GARRA</div>
                <div className="pillar-desc">A última rep é nossa. Sempre.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- WAR CRY / CTA ----------
function WarCry() {
  return (
    <section className="warcry" data-screen-label="06 Grito de Guerra">
      <PaintSplatter className="warcry-splat" color="var(--magenta)" seed={97}/>
      <div className="warcry-inner">
        <div className="manifesto-label">
          <span className="num">/ 04</span>
          <span>O GRITO DE GUERRA</span>
        </div>
        <div className="warcry-text">
          <div className="cry">FORÇA.</div>
          <div className="cry teal">FOCO.</div>
          <div className="cry">GARRA.</div>
          <div className="cry magenta">VITÓRIA.</div>
          <div className="cry">TIME</div>
          <div className="cry teal big">LASINHA.</div>
        </div>
        <div className="warcry-foot">
          <div>
            <div className="meta-label">06 · 06 · 2026 · CROSSFIT SILVER FERN</div>
            <div className="warcry-cta-label">TE ESPERAMOS LÁ.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  return (
    <footer className="footer" data-screen-label="07 Footer">
      <div className="footer-inner">
        <div className="foot-brand">
          <Shield size={36}/>
          <div>
            <div className="foot-team">TEAM LASINHA</div>
            <div className="foot-sub">Time 10 · CrossFit Silver Fern</div>
          </div>
        </div>
        <div className="foot-roster">
          {ATHLETES.map((a, i) => (
            <span key={a.id} className="foot-name">{a.name}{i < ATHLETES.length - 1 ? " ·" : ""}</span>
          ))}
        </div>
        <div className="foot-legal">
          © 2026 TEAM LASINHA. FEITO COM SUOR, FARINHA E MUITA TREINO.
        </div>
      </div>
    </footer>
  );
}

// ---------- APP ----------
function App() {
  const athletesRef = useRef(null);
  const tickerItems = [
    "TEAM LASINHA", "TIME 10", "SILVERFERN 2026", "06.06.2026",
    "FORÇA · FOCO · GARRA", "SEDE DE VITÓRIA", "PRIMEIRO LUGAR OU NADA",
    "GUERREIRAS & GUERREIROS", "BRING THE FIRE", "O PÓDIO TEM NOSSO NOME",
  ];
  return (
    <div className="page">
      <nav className="topnav">
        <div className="nav-left">
          <Shield size={22}/>
          <div className="nav-team">
            <div className="nav-name">TEAM LASINHA</div>
            <div className="nav-meta">TIME 10 / SILVERFERN '26</div>
          </div>
        </div>
        <div className="nav-links">
          <a href="#atletas">O TIME</a>
          <a href="#campeonato">CAMPEONATO</a>
          <a href="#campeonato">PROGRAMAÇÃO</a>
        </div>
        <div className="nav-right">
          <span className="nav-pulse"><span className="pulse-dot"/>Em preparação</span>
        </div>
      </nav>

      <Hero onScrollToAthletes={() => athletesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}/>

      <Ticker items={tickerItems}/>

      <Manifesto/>

      <Athletes refEl={athletesRef}/>

      <Mottos/>

      <Championship/>

      <WarCry/>

      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
