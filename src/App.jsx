import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Phone, MessageCircle, Users, Check, Menu, X, 
  Globe, Shield, Zap, ChevronRight, Star, 
  ArrowRight, Mail, Clock, Plus, Minus, XCircle, CheckCircle,
  Briefcase, TrendingUp, Lock, Headphones, HelpCircle, BarChart3
} from 'lucide-react';

// --- COMPONENTES SVG PARA LOGOS DE MARCAS (Prueba Social Realista) ---
const BrandLogo1 = () => (
  <svg className="h-8" viewBox="0 0 120 30" fill="currentColor">
    <path d="M10,15 L20,5 L30,15 L20,25 Z" opacity="0.8"/>
    <text x="40" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">NexTalk</text>
  </svg>
);
const BrandLogo2 = () => (
  <svg className="h-8" viewBox="0 0 120 30" fill="currentColor">
    <circle cx="15" cy="15" r="10" opacity="0.8"/>
    <text x="35" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">GlobalVoIP</text>
  </svg>
);
const BrandLogo3 = () => (
  <svg className="h-8" viewBox="0 0 120 30" fill="currentColor">
    <rect x="5" y="5" width="20" height="20" rx="5" opacity="0.8"/>
    <text x="35" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">SecureCall</text>
  </svg>
);
const BrandLogo4 = () => (
  <svg className="h-8" viewBox="0 0 120 30" fill="currentColor">
    <path d="M5,25 L15,5 L25,25" stroke="currentColor" strokeWidth="3" fill="none"/>
    <text x="35" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">ApexCRM</text>
  </svg>
);

const App = () => {
  // --- ESTADOS ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Iniciamos en 1, pero ahora permitiremos bajar a 0
  const [voipAgents, setVoipAgents] = useState(1);
  const [waAgents, setWaAgents] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Estados para Modales y Notificaciones
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('demo'); 
  const [showToast, setShowToast] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // --- EFECTOS ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animación de entrada con Retraso (Staggered)
  const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return (
      <div 
        ref={ref} 
        className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };

  // --- LÓGICA DE PRECIOS OPTIMIZADA (useMemo) ---
  const prices = useMemo(() => {
    // Precio Regular (Sin descuentos)
    const regularVoip = voipAgents * 120000;
    const regularWa = waAgents * 40000;

    // Precio con Descuentos (Lógica real)
    let finalVoip = voipAgents < 10 ? regularVoip : 1000000 + (voipAgents - 10) * 100000;
    let finalWa = waAgents < 10 ? regularWa : 200000 + (waAgents - 10) * 20000;

    const totalRegular = regularVoip + regularWa;
    const totalFinal = finalVoip + finalWa;
    const savings = totalRegular - totalFinal;

    return {
      voip: finalVoip,
      wa: finalWa,
      total: totalFinal,
      usd: Math.round(totalFinal / 4000),
      savings: savings,
      regularTotal: totalRegular
    };
  }, [voipAgents, waAgents]);

  const formatCOP = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  const formatUSD = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // --- MANEJADORES ---
  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setFormStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStep(2);
    setTimeout(() => {
      setIsModalOpen(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 1500);
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- COMPONENTE CONTADOR (Modificado para permitir 0) ---
  const Counter = ({ value, setValue, label, icon: Icon, color }) => (
    <div className={`bg-white p-5 rounded-xl border shadow-sm hover:shadow-lg transition duration-300 group relative overflow-hidden ${value === 0 ? 'border-slate-100 opacity-80' : 'border-slate-200'}`}>
      {/* Background decorative circle */}
      <div className={`absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-10 transition-transform group-hover:scale-150 ${color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg transition-colors ${value === 0 ? 'bg-slate-100 text-slate-400' : (color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white')}`}>
            <Icon size={22} />
          </div>
          <div>
            <span className={`block font-bold text-sm md:text-base ${value === 0 ? 'text-slate-400' : 'text-slate-700'}`}>{label}</span>
            <span className="text-xs text-slate-400 font-medium">
              {value === 0 ? 'No incluido' : (value < 10 ? 'Tarifa Estándar' : 'Tarifa Mayorista')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-slate-50 rounded-lg p-1.5 border border-slate-100 relative z-10">
        <button 
          onClick={() => setValue(Math.max(0, value - 1))} 
          className={`w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm transition active:scale-95 border border-transparent hover:border-slate-200 ${value === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
          disabled={value === 0}
        >
          <Minus size={18} />
        </button>
        <span className={`text-2xl font-bold w-12 text-center font-mono ${value === 0 ? 'text-slate-300' : 'text-slate-800'}`}>{value}</span>
        <button 
          onClick={() => setValue(value + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-md shadow-sm text-white transition active:scale-95 ${color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-slate-700 bg-slate-50 scroll-smooth antialiased selection:bg-blue-200 selection:text-blue-900">
      
      {/* --- TOAST NOTIFICATION --- */}
      <div className={`fixed top-24 right-5 z-[60] transition-all duration-500 transform ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 flex items-center gap-4 min-w-[320px]">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">¡Solicitud Recibida!</h4>
            <p className="text-xs text-slate-500 mt-0.5">Un asesor senior revisará tu caso en breve.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-auto text-slate-400 hover:text-slate-600 p-1"><X size={16} /></button>
        </div>
      </div>

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 ring-1 ring-slate-900/5">
            <div className="bg-slate-900 px-8 py-6 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
              <h3 className="text-white font-bold text-xl flex items-center gap-3 relative z-10">
                {modalType === 'demo' && <><div className="bg-yellow-500/20 p-2 rounded-lg"><Star className="text-yellow-400" size={20} /></div> Demo Premium Gratis</>}
                {modalType === 'buy' && <><div className="bg-blue-500/20 p-2 rounded-lg"><Zap className="text-blue-400" size={20} /></div> Configurar Plan</>}
                {modalType === 'call' && <><div className="bg-green-500/20 p-2 rounded-lg"><Phone className="text-green-400" size={20} /></div> Agendar Llamada</>}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition bg-white/10 hover:bg-white/20 rounded-full p-2"><X size={20} /></button>
            </div>
            
            <div className="p-8">
              {formStep === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-sm text-slate-600 mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
                    <Globe className="text-blue-500 flex-shrink-0" size={20} />
                    <span>Déjanos tus datos corporativos para asignarte un ingeniero especializado.</span>
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Nombre</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Empresa</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="Nombre Empresa" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">WhatsApp Corporativo</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="+57 300..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Correo Empresarial</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="nombre@empresa.com" />
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition transform active:scale-[0.98] flex justify-center items-center gap-2">
                      {modalType === 'buy' ? 'Continuar al Checkout' : 'Confirmar Solicitud'} <ArrowRight size={18} />
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-slate-400 flex justify-center items-center gap-1">
                    <Lock size={10} /> Datos encriptados y protegidos.
                  </p>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="text-blue-600 fill-blue-600" size={20} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Conectando con CRM...</h4>
                  <p className="text-slate-500 text-sm">Estamos validando tu solicitud prioritaria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-2 border-b border-slate-100' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('inicio')}>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-2.5 rounded-xl shadow-lg shadow-blue-900/20 group-hover:shadow-blue-600/40 transition-all duration-300">
              <Phone size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className={`text-2xl font-extrabold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>InnovaCall</span>
              <span className={`block text-[10px] uppercase tracking-[0.2em] font-bold ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>Solutions</span>
            </div>
          </div>
          
          {/* Desktop Links */}
          <div className={`hidden md:flex items-center space-x-8 font-medium text-sm ${scrolled ? 'text-slate-600' : 'text-blue-100'}`}>
            {['Inicio', 'Cotizador', 'Nosotros', 'FAQ'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'faq' ? 'faq' : item.toLowerCase() === 'cotizador' ? 'calculadora' : item.toLowerCase() === 'nosotros' ? 'confianza' : 'inicio')} 
                className={`relative hover:text-blue-500 transition py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {item}
              </button>
            ))}
            <button onClick={() => handleOpenModal('demo')} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-green-500/40 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
              <Star size={16} fill="currentColor" className="text-green-200" /> Demo Gratis
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden p-2 rounded-lg transition ${scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu (Glassmorphism) */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full top-full left-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl animate-in slide-in-from-top-5 z-40">
             <div className="flex flex-col p-6 space-y-4 font-medium text-slate-600">
               <button className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 flex items-center gap-3 transition" onClick={() => scrollToSection('inicio')}><Globe size={18}/> Inicio</button>
               <button className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 flex items-center gap-3 transition" onClick={() => scrollToSection('calculadora')}><TrendingUp size={18}/> Cotizador</button>
               <button className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 flex items-center gap-3 transition" onClick={() => scrollToSection('confianza')}><Shield size={18}/> Nosotros</button>
               <div className="h-px bg-slate-100 my-2"></div>
               <button onClick={() => { handleOpenModal('demo'); setIsMenuOpen(false); }} className="bg-blue-600 text-white py-4 rounded-xl font-bold shadow-md flex justify-center items-center gap-2">
                 Solicitar Demo Ahora
               </button>
             </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="inicio" className="relative min-h-screen flex items-center pt-24 bg-slate-900 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-slate-950 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Background" 
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
          {/* Animated Orbs */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text (7 cols) */}
            <div className="lg:col-span-7 text-white space-y-8">
              <RevealOnScroll>
                <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-blue-200 backdrop-blur-md mb-4">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Software #1 en Colombia para Call Centers
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={100}>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                  Revoluciona tu operación con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">IA y Automatización</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                  Centraliza WhatsApp, VoIP y CRM en una sola plataforma. Diseñado para emprendedores ambiciosos y empresas que escalan rápido.
                </p>
              </RevealOnScroll>
              
              <RevealOnScroll delay={300} className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => handleOpenModal('demo')}
                  className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)] transition transform hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  Prueba Gratis 3 Días <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <button 
                  onClick={() => scrollToSection('calculadora')}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/20 text-lg font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm transition flex items-center justify-center hover:border-white/40"
                >
                  Ver Planes y Precios
                </button>
              </RevealOnScroll>
              
              <RevealOnScroll delay={400} className="flex items-center gap-6 pt-4 text-sm text-slate-400 border-t border-white/10 mt-8">
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> Sin cláusulas</div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> Soporte 24/7</div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> Activación Flash</div>
              </RevealOnScroll>
            </div>

            {/* Hero Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6 perspective-1000">
              
              {/* Card Emprendedores */}
              <RevealOnScroll delay={200} className="transform transition-all hover:-translate-y-2 duration-500">
                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6 shadow-2xl cursor-pointer group" onClick={() => handleOpenModal('buy')}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg"><Briefcase className="text-blue-400" size={20}/></div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Emprendedores</h3>
                        <p className="text-slate-400 text-xs">Pack Inicial Todo-en-Uno</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-white">$160.000</span>
                      <span className="block text-xs text-slate-400 font-medium">~ $40 USD</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><Check size={14} className="text-green-400"/> VoIP Ilimitado (Nacional)</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-green-400"/> CRM WhatsApp Multiagente</li>
                    <li className="flex items-center gap-2"><Star size={14} className="text-yellow-400"/> 1 Mes Predictivo Gratis</li>
                  </ul>
                  <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/4 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Card Empresas */}
              <RevealOnScroll delay={400} className="transform transition-all hover:-translate-y-2 duration-500 relative z-10">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-0.5 shadow-[0_20px_50px_-12px_rgba(234,179,8,0.3)] cursor-pointer" onClick={() => handleOpenModal('buy')}>
                  <div className="bg-slate-900 rounded-[22px] p-6 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">Oferta Limitada</div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-yellow-500/20 p-2 rounded-lg"><Users className="text-yellow-400" size={24}/></div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Pack Corporativo</h3>
                        <p className="text-slate-400 text-xs">Para equipos de 10+ personas</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-slate-800 p-3 rounded-xl text-center border border-slate-700">
                        <div className="text-lg font-bold text-white">10</div>
                        <div className="text-[10px] text-slate-400 uppercase">VoIP Ilimitado</div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-xl text-center border border-slate-700">
                        <div className="text-lg font-bold text-white">10</div>
                        <div className="text-[10px] text-slate-400 uppercase">WhatsApp CRM</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-800 pt-4">
                      <div>
                        <p className="text-xs text-slate-500 line-through mb-0.5">$1.400.000</p>
                        <p className="text-3xl font-bold text-white leading-none">$1.200.000</p>
                        <p className="text-xs text-slate-400 mt-1 font-medium">~ $300 USD / mes</p>
                      </div>
                      <div className="bg-yellow-500 text-slate-900 p-2 rounded-full hover:bg-yellow-400 transition shadow-lg">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

            </div>
          </div>
        </div>
      </header>

      {/* --- TRUST STRIP (Mejorado con SVGs) --- */}
      <div className="bg-white border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Tecnología elegida por líderes de la industria</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <BrandLogo1 />
            <BrandLogo2 />
            <BrandLogo3 />
            <BrandLogo4 />
          </div>
        </div>
      </div>

      {/* --- CALCULATOR SECTION (Lógica Avanzada) --- */}
      <section id="calculadora" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decoracion de fondo */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Diseña tu ecosistema</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ajusta los recursos según tu equipo. Nuestro algoritmo aplica automáticamente los descuentos por volumen para maximizar tu rentabilidad.
            </p>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs (8 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <RevealOnScroll delay={100}>
                <Counter 
                  value={voipAgents} 
                  setValue={setVoipAgents} 
                  label="Agentes VoIP (Llamadas)" 
                  icon={Headphones} 
                  color="blue" 
                />
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <Counter 
                  value={waAgents} 
                  setValue={setWaAgents} 
                  label="Agentes WhatsApp (Chat)" 
                  icon={MessageCircle} 
                  color="green" 
                />
              </RevealOnScroll>

              {/* Advisory Box */}
              <RevealOnScroll delay={300} className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-blue-600"><HelpCircle size={24}/></div>
                <div>
                  <h4 className="font-bold text-blue-900">¿Necesitas una integración compleja?</h4>
                  <p className="text-sm text-blue-700 mt-1 mb-3">
                    Conectamos con Salesforce, HubSpot, Zoho y más. Agenda una sesión técnica gratuita.
                  </p>
                  <button onClick={() => handleOpenModal('call')} className="text-xs font-bold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Hablar con Ingeniero
                  </button>
                </div>
              </RevealOnScroll>
            </div>

            {/* Sticky Summary (4 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <RevealOnScroll delay={400}>
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
                     {/* Pattern */}
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                     
                     <h3 className="relative z-10 text-lg font-bold flex items-center gap-2">
                       <BarChart3 size={18} className="text-blue-400"/> Proyección Mensual
                     </h3>
                  </div>

                  <div className="p-8">
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                        <span className="text-slate-500">Infraestructura VoIP</span>
                        <span className="font-bold text-slate-700">{formatCOP(prices.voip)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                        <span className="text-slate-500">Plataforma WhatsApp</span>
                        <span className="font-bold text-slate-700">{formatCOP(prices.wa)}</span>
                      </div>
                      
                      {/* SAVINGS ALERT */}
                      {prices.savings > 0 && (
                        <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center justify-between animate-pulse">
                          <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                            <TrendingUp size={14}/> Ahorro por volumen
                          </span>
                          <span className="text-sm font-bold text-green-600">-{formatCOP(prices.savings)}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right mb-6">
                      {prices.savings > 0 && (
                        <p className="text-sm text-slate-400 line-through mb-1 decoration-red-400 decoration-2">
                          {formatCOP(prices.regularTotal)}
                        </p>
                      )}
                      <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {formatCOP(prices.total)}
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        Aprox. {formatUSD(prices.usd)} USD / mes + IVA
                      </p>
                    </div>

                    <button 
                      onClick={() => handleOpenModal('buy')}
                      className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl transition transform hover:scale-[1.02] flex justify-center items-center gap-2 group"
                    >
                      Comenzar Ahora <ChevronRight size={18} className="group-hover:translate-x-1 transition"/>
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400 mt-4 flex justify-center items-center gap-1">
                      <Shield size={10}/> Garantía de satisfacción de 30 días.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* --- FEATURES GRID (Staggered Animation) --- */}
      <section id="confianza" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-20">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">¿Por qué elegirnos?</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Infraestructura de Nivel Empresarial</h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: Shield,
                color: "text-blue-600",
                bg: "bg-blue-100",
                title: "Cifrado Bancario",
                desc: "Tus datos viajan seguros. Cumplimos con la normativa local de Habeas Data y estándares GDPR."
              },
              {
                icon: Zap,
                color: "text-yellow-600",
                bg: "bg-yellow-100",
                title: "Latencia Ultrabaja",
                desc: "Servidores locales optimizados para que la voz se escuche cristalina, sin retardos ni robots."
              },
              {
                icon: Globe,
                color: "text-purple-600",
                bg: "bg-purple-100",
                title: "Soporte Humano",
                desc: "Ingenieros reales en Bogotá. Nada de tickets que tardan semanas. Resolvemos en minutos."
              }
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 150} className="h-full">
                <div className="group p-8 h-full rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300">
                  <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL --- */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 transform origin-top-right"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <RevealOnScroll>
             <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-16 shadow-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-12">
               <div className="md:w-1/3 relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Cliente Feliz" 
                    className="w-48 h-48 rounded-full object-cover border-4 border-slate-600 shadow-xl mx-auto relative z-10"
                  />
                  <div className="absolute -bottom-4 right-10 bg-white text-slate-900 p-2 rounded-lg shadow-lg z-20">
                    <Star size={20} className="text-yellow-400 fill-yellow-400" />
                  </div>
               </div>
               <div className="md:w-2/3 text-center md:text-left">
                 <h3 className="text-2xl md:text-3xl font-medium text-white italic leading-relaxed mb-8">
                   "Pasamos de perder el 30% de las llamadas a tener una tasa de respuesta del 98%. La integración de WhatsApp con el marcador predictivo fue la clave del éxito."
                 </h3>
                 <div>
                   <p className="text-white font-bold text-lg tracking-wide">Ricardo Gómez</p>
                   <p className="text-blue-400 font-medium">Director de Operaciones, Cobranzas Ágiles</p>
                 </div>
               </div>
             </div>
           </RevealOnScroll>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg"><Phone size={18} className="text-white" /></div>
              <span className="text-xl font-bold">InnovaCall</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-500">
              Empoderando a las empresas colombianas con tecnología de comunicación de clase mundial.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Producto</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">PBX Cloud</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">WhatsApp API</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Marcador Predictivo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Habeas Data</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Globe size={16} className="mt-1 text-blue-600" />
                <span>Bogotá, Colombia<br/>World Trade Center</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-600" />
                <span>hola@innovacall.co</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-8 text-center text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center px-4">
          <p>&copy; 2023 InnovaCall Solutions. Hecho con ❤️ en Colombia.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             {/* Fake social icons */}
             <div className="w-6 h-6 bg-slate-900 rounded hover:bg-blue-600 transition cursor-pointer"></div>
             <div className="w-6 h-6 bg-slate-900 rounded hover:bg-blue-400 transition cursor-pointer"></div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING CTA --- */}
      <a 
        href="https://wa.me/573000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition transform hover:scale-110 flex items-center gap-2 group"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap font-bold pl-0 group-hover:pl-2 text-sm">
          Soporte Ventas
        </span>
      </a>

    </div>
  );
};

export default App;