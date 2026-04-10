import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MdShield, MdWarning, MdEmail, MdPhone, MdLocationOn,
  MdOutlineInfo, MdArrowForward,
} from 'react-icons/md';
import { FaChartLine, FaCheck } from 'react-icons/fa';
import { CiGrid41 } from 'react-icons/ci';
import { GoHome } from 'react-icons/go';
import { FaRegMessage } from 'react-icons/fa6';
import {
  TbCircleNumber1Filled, TbCircleNumber2Filled,
  TbCircleNumber3Filled, TbCircleNumber4Filled,
} from 'react-icons/tb';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const navigation = [
  { name: 'Home',         href: '#home',         icon: <GoHome size={16} />        },
  { name: 'Features',     href: '#features',     icon: <CiGrid41 size={16} />      },
  { name: 'How it works', href: '#how-it-works', icon: <MdOutlineInfo size={16} /> },
  { name: 'Contact',      href: '#contact',      icon: <FaRegMessage size={14} />  },
];

const features = [
  {
    title: 'Anomaly Detection & Security',
    description: 'Reducing drug theft and tampering, ensuring medications reach only those entitled to them.',
    Icon: MdShield,
    color: '#088395',
    bg: '#EBF4F6',
    accent: 'from-[#088395] to-[#37B7C3]',
  },
  {
    title: 'Drug Interaction Warnings',
    description: 'Real-time warnings when potential interactions between medications are detected.',
    Icon: MdWarning,
    color: '#d97706',
    bg: '#fffbeb',
    accent: 'from-amber-400 to-yellow-300',
  },
  {
    title: 'AI Demand Forecasting',
    description: 'Ensuring uninterrupted supply of vital medicines while reducing waste from accumulation.',
    Icon: FaChartLine,
    color: '#071952',
    bg: '#eef1f9',
    accent: 'from-[#071952] to-[#088395]',
  },
  {
    title: 'Smart Prescription Validation',
    description: 'Speed up dispensing, reduce human error and fully digitise medical records.',
    Icon: FaCheck,
    color: '#37B7C3',
    bg: '#EBF4F6',
    accent: 'from-[#37B7C3] to-teal-300',
  },
];

const steps = [
  { title: 'Verification',       description: 'User enters the recovery card for a patient, or ID card for a worker.',           NumIcon: TbCircleNumber1Filled },
  { title: 'Add Medications',    description: 'The user records all prescribed drugs into the system accurately.',                NumIcon: TbCircleNumber2Filled },
  { title: 'Check Interactions', description: 'The system analyzes medications and automatically detects any conflicts.',         NumIcon: TbCircleNumber3Filled },
  { title: 'Receive Alerts',     description: 'Users receive warnings about medication conflicts or medicines nearing expiry.',   NumIcon: TbCircleNumber4Filled },
];

const contactInfo = [
  { Icon: MdEmail,       label: 'Email',    value: 'psmps@gmail.com'  },
  { Icon: MdLocationOn,  label: 'Location', value: 'Blida, Algeria'   },
  { Icon: MdPhone,       label: 'Phone',    value: '+213XXXXXXXXX'    },
];

/* ─────────────────────────────────────────────
   ANIMATION STYLES
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .home-root { font-family: 'DM Sans', sans-serif; }
  .font-display { font-family: 'Playfair Display', serif; }

  /* Fade-in-up */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-8px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .6; }
    100% { transform: scale(1.8); opacity: 0;  }
  }
  @keyframes draw-line {
    from { width: 0; }
    to   { width: 100%; }
  }

  .anim-fade-up   { animation: fadeUp .65s ease both; }
  .anim-fade-in   { animation: fadeIn .5s ease both;  }
  .anim-float     { animation: float 4s ease-in-out infinite; }

  .delay-1 { animation-delay: .1s; }
  .delay-2 { animation-delay: .2s; }
  .delay-3 { animation-delay: .3s; }
  .delay-4 { animation-delay: .45s; }
  .delay-5 { animation-delay: .6s; }
  .delay-6 { animation-delay: .75s; }

  /* Scroll reveal */
  .reveal { opacity: 0; transform: translateY(32px); transition: opacity .65s ease, transform .65s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left  { opacity: 0; transform: translateX(-32px); transition: opacity .65s ease, transform .65s ease; }
  .reveal-left.visible  { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(32px);  transition: opacity .65s ease, transform .65s ease; }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  /* Gradient text shimmer */
  .gradient-text {
    background: linear-gradient(135deg, #088395 0%, #37B7C3 40%, #071952 70%, #088395 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* Mesh hero bg */
  .hero-mesh {
    background:
      radial-gradient(ellipse 60% 50% at 80% 20%, rgba(55,183,195,0.13) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 10% 80%, rgba(8,131,149,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 80% 80% at 50% 50%, #EBF4F6 0%, #f0f7f9 100%);
  }

  /* Pulse dot ring */
  .pulse-dot::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #37B7C3;
    animation: pulse-ring 1.6s ease-out infinite;
  }

  /* Feature card hover glow */
  .feature-card { transition: all .25s ease; }
  .feature-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(8,131,149,0.12); }

  /* Step card */
  .step-card { transition: all .25s ease; }
  .step-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(7,25,82,0.10); }

  /* Nav link underline */
  .nav-link { position: relative; }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 50%; right: 50%;
    height: 2px; background: #088395; border-radius: 2px;
    transition: left .2s ease, right .2s ease;
  }
  .nav-link:hover::after { left: 0; right: 0; }

  /* Input focus */
  .form-input { transition: border-color .2s, box-shadow .2s; }
  .form-input:focus { border-color: #37B7C3; box-shadow: 0 0 0 3px rgba(55,183,195,0.15); outline: none; }

  /* CTA button shine */
  .btn-primary {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #071952, #088395);
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .btn-primary::after {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left .5s ease;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(8,131,149,0.35); }
  .btn-primary:hover::after { left: 150%; }
`;

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const Home = () => {
  useScrollReveal();

  return (
    <div className="home-root flex flex-col items-center text-[#071952] w-full min-h-screen">
      <style>{styles}</style>

      {/* ── HEADER ── */}
      <header className="w-full sticky top-0 z-50 bg-white backdrop-blur-xl border-b border-[#daeef2]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#071952] to-[#088395] flex items-center justify-center shadow-md shadow-[#088395]/30">
              <MdShield size={16} color="white" />
            </div>
            <span className="font-display font-bold text-lg text-[#071952] tracking-tight">PharmaFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item, i) => (
              <a key={i} href={item.href}
                className="nav-link flex items-center gap-1.5 text-sm font-medium text-[#071952]/60 hover:text-[#088395] px-4 py-2 rounded-lg transition-colors duration-150"
              >
                {item.icon}{item.name}
              </a>
            ))}
          </nav>

          <Link to="/login" className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
            Login
          </Link>
        </div>
      </header>

      <main className="w-full flex flex-col items-center">

        {/* ── HERO ── */}
        <section id="home" className="hero-mesh w-full">
          <div className="max-w-7xl mx-auto px-6 pb-24 md:pb-32 md:pt-16">
            <div className="grid gap-14 md:grid-cols-2 items-center">

              {/* Left */}
              <div>
                <div className="anim-fade-up delay-1 inline-flex items-center gap-2 bg-white border border-[#daeef2] text-[#088395] text-xs font-semibold px-4 py-2 rounded-full shadow-sm mb-8">
                  <span className="pulse-dot relative w-1.5 h-1.5 rounded-full bg-[#37B7C3]" />
                  Trusted by 500+ pharmacies
                </div>

                <h1 className="anim-fade-up delay-2 font-display text-5xl sm:text-6xl font-bold leading-[1.1] mb-4">
                  Smart<br />
                  <span className="gradient-text">Medication</span><br />
                  <span className="text-[#071952]">Record System</span>
                </h1>

                <p className="anim-fade-up delay-3 text-base text-[#071952]/55 max-w-md leading-relaxed mb-10">
                  A comprehensive platform for managing medication records and ensuring patient safety across every stage of care.
                </p>

                <div className="anim-fade-up delay-4 flex flex-wrap items-center gap-3 mb-12">
                  <Link to="/login" className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm">
                    Get Started <MdArrowForward size={16} />
                  </Link>
                  <a href="#features"
                    className="inline-flex items-center gap-2 bg-white border border-[#daeef2] hover:border-[#37B7C3] text-[#071952]/70 hover:text-[#088395] font-medium px-6 py-3.5 rounded-xl text-sm transition-all duration-200 hover:shadow-sm"
                  >
                    Explore Features
                  </a>
                </div>

                {/* Stats */}
                <div className="anim-fade-up delay-5 flex items-center gap-8">
                  {[['500+', 'Pharmacies'], ['99.9%', 'Uptime'], ['< 2s', 'Response']].map(([val, lbl], i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-display text-2xl font-bold text-[#088395]">{val}</span>
                      <span className="text-[11px] font-medium text-[#071952]/45 uppercase tracking-wider mt-0.5">{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — image */}
              <div className="anim-fade-up delay-3 relative anim-float">
                {/* Blurred ring behind image */}
                <div className="absolute inset-4 bg-gradient-to-br from-[#088395]/25 to-[#37B7C3]/15 rounded-3xl blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1585421514738-01798e348b17"
                  alt="Pharmacy"
                  className="relative z-10 rounded-3xl object-cover w-full h-72 sm:h-[420px] shadow-2xl shadow-[#088395]/20"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 z-20 bg-white rounded-2xl px-4 py-3.5 shadow-xl shadow-[#071952]/10 flex items-center gap-3 border border-[#daeef2]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#071952] to-[#088395] flex items-center justify-center flex-shrink-0">
                    <MdShield size={18} color="white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#071952]">HIPAA Compliant</p>
                    <p className="text-[10px] text-slate-400 font-medium">Fully Secure & Verified</p>
                  </div>
                </div>
                {/* Top-right badge */}
                <div className="absolute -top-4 -right-4 z-20 bg-[#071952] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                  <span className="text-lg font-display font-bold text-white">24/7</span>
                  <span className="text-[10px] text-white/60 font-medium leading-tight">System<br/>Uptime</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-24 md:py-32 w-full bg-white">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-16 reveal">
              <p className="text-xs font-bold tracking-[.2em] uppercase text-[#088395] mb-4">Why PharmaFlow</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#071952] mb-4">What makes us special</h2>
              <p className="text-[#071952]/50 max-w-lg mx-auto leading-relaxed">
                Built for modern pharmacies and hospitals that demand precision, speed, and safety.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`feature-card reveal relative bg-[#F7FBFC] border border-[#daeef2] rounded-2xl p-6 overflow-hidden cursor-default`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className={`absolute top-0 inset-x-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${f.accent}`} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mt-1" style={{ background: f.bg }}>
                    <f.Icon size={24} color={f.color} />
                  </div>
                  <h3 className="font-display font-bold text-[#071952] text-base mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-24 md:py-32 w-full" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #f0f8f9 0%, #EBF4F6 100%)' }}>
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-16 reveal">
              <p className="text-xs font-bold tracking-[.2em] uppercase text-[#088395] mb-4">Simple Process</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#071952] mb-4">How it works</h2>
              <p className="text-[#071952]/50 max-w-md mx-auto leading-relaxed">
                A clear and simple process to manage and monitor patient medication with ease.
              </p>
            </div>

            {/* Steps with connector line */}
            <div className="relative">
              {/* Horizontal connector — desktop only */}
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#daeef2] to-transparent" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="step-card reveal bg-white border border-[#daeef2] rounded-2xl px-6 py-8 flex flex-col items-center text-center"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="relative z-10 mb-5 p-1 bg-white rounded-full">
                      <step.NumIcon size={40} color="#088395" />
                    </div>
                    <h3 className="font-display font-bold text-[#071952] text-base mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-14 reveal">
              <Link to="/login" className="btn-primary inline-flex items-center gap-2.5 text-white font-semibold px-9 py-4 rounded-xl text-sm">
                Start managing medications <MdArrowForward size={16} />
              </Link>
            </div>

          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-24 md:py-32 w-full bg-white">
          <div className="max-w-5xl mx-auto px-6">

            <div className="text-center mb-16 reveal">
              <p className="text-xs font-bold tracking-[.2em] uppercase text-[#088395] mb-4">Get in Touch</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#071952]">Contact Us</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Info */}
              <div className="reveal-left bg-[#F7FBFC] border border-[#daeef2] rounded-2xl p-8 flex flex-col gap-6">
                <h4 className="font-display text-xl font-bold text-[#071952]">Contact Information</h4>

                <div className="flex flex-col gap-4">
                  {contactInfo.map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#EBF4F6] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={20} color="#088395" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-[#071952] uppercase tracking-wider">{label}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Demo CTA */}
                <div className="mt-auto bg-gradient-to-br from-[#071952] to-[#088395] rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#37B7C3]/20 pointer-events-none" />
                  <p className="font-display font-bold text-lg mb-1 relative z-10">For hospitals & pharmacies</p>
                  <p className="text-xs text-white/65 mb-5 relative z-10">Request a live demo of the full system</p>
                  <button className="relative z-10 bg-white text-[#088395] text-xs font-bold hover:bg-[#EBF4F6] px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                    Request Demo →
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="reveal-right bg-[#F7FBFC] border border-[#daeef2] rounded-2xl p-8">
                <h4 className="font-display text-xl font-bold text-[#071952] mb-7">Send a Message</h4>
                <form className="flex flex-col gap-4">
                  {[
                    { type: 'text',  placeholder: 'Full Name'  },
                    { type: 'email', placeholder: 'Email'      },
                    { type: 'text',  placeholder: 'Subject'    },
                  ].map(({ type, placeholder }) => (
                    <input
                      key={placeholder}
                      type={type}
                      placeholder={placeholder}
                      className="form-input bg-white border border-[#daeef2] rounded-xl text-[#071952] placeholder-slate-400 text-sm px-4 py-3"
                    />
                  ))}
                  <textarea
                    rows={4}
                    placeholder="Your message…"
                    className="form-input bg-white border border-[#daeef2] rounded-xl text-[#071952] placeholder-slate-400 text-sm px-4 py-3 resize-none"
                  />
                  <button type="submit" className="btn-primary text-white font-semibold py-3.5 rounded-xl text-sm mt-1">
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-[#071952]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <MdShield size={14} color="white" />
            </div>
            <span className="font-display font-bold text-white tracking-tight">PharmaFlow</span>
          </div>
          <p className="text-xs text-white/35 font-medium">© 2025 PharmaFlow. All rights reserved.</p>
          <div className="flex items-center gap-1">
            {navigation.map((item, i) => (
              <a key={i} href={item.href} className="text-xs text-white/40 hover:text-white/80 px-3 py-1.5 rounded-lg transition-colors duration-150">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;