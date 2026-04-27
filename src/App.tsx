/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Users, 
  Building2, 
  Calendar, 
  Instagram, 
  Facebook,
  Linkedin,
  Mail, 
  ArrowRight,
  ArrowLeft,
  HardHat,
  MonitorPlay,
  MapPin,
  Phone,
  Send
} from 'lucide-react';

// --- Types & Constants ---
interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Accueil', href: '#home' },
  { name: 'À propos', href: '#about' },
  { name: 'Projets', href: '#activities' },
  { name: 'Équipe', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

interface Activity {
  title: string;
  description: string;
  icon: typeof Building2;
}

const activities: Activity[] = [
  {
    title: 'Conférences Inspirantes',
    description: 'Venez écouter des experts de l\'architecture durable et de l\'urbanisme écologique partager leurs visions du futur.',
    icon: MonitorPlay,
  },
  {
    title: 'Formations Pratiques',
    description: "Le Master BD2EAT partage son savoir-faire : workshops, retours d'expérience et échanges avec des acteurs du bâtiment responsable.",
    icon: HardHat,
  },
  {
    title: 'Visites de Chantiers',
    description: 'Découvrez les coulisses des projets de construction les plus innovants et écologiques de la région.',
    icon: MapPin,
  },
];

interface TeamMember {
  name: string;
  role: string;
}

const team: TeamMember[] = [
  { name: 'Salka Mouchain', role: 'Présidente - M1 BD2EAT' },
  { name: 'Oussama Bounou', role: 'Vice-Président - M1 BD2EAT' },
  { name: 'Ikram El Ibrahimi', role: 'Secrétaire - M1 BD2EAT' },
  { name: 'Anass Jourfi', role: 'Membre actif - M1 BD2EAT' },
  { name: 'Aya Berdi', role: 'Trésorière - M1 BD2EAT' },
  { name: 'Nada Bou-Imesmaren', role: 'Responsable Communication - M1 BD2EAT' },
  { name: 'Ahlam El Aidouni', role: 'Responsable Événements - M1 BD2EAT' },
  { name: 'Assif Ahmed', role: 'Membre actif - M1 BD2EAT' },
  { name: 'Yassine Mebrouk', role: 'Membre actif - M1 BD2EAT' },
  { name: 'Oussama Abarji', role: 'Membre actif - M1 BD2EAT' },
  
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Eco Build Club" className="w-16 h-16 object-contain" />
          <span className="text-xl font-bold tracking-tight text-forest">Eco Build Club</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-forest/80 hover:text-moss font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfhc-_cne2Hil7cw1osd0jK0AzuEKHIM91HWR9ZPEfZ4moOXQ/viewform" target="_blank" rel="noopener noreferrer" className="bg-forest text-white px-5 py-2.5 rounded-full font-medium hover:bg-moss transition-colors shadow-md">
            Rejoindre
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-forest"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-cream shadow-xl md:hidden border-t border-forest/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-forest/70"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-forest/10" />
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfhc-_cne2Hil7cw1osd0jK0AzuEKHIM91HWR9ZPEfZ4moOXQ/viewform" target="_blank" rel="noopener noreferrer" className="bg-forest text-white w-full py-3 rounded-xl font-bold">
                Rejoindre le club
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Subtle decorative background elements */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-sage/5 -z-10 rounded-l-[100px]" />
    <div className="absolute bottom-10 left-10 w-64 h-64 bg-earth/5 -z-10 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1 rounded-full bg-sage/20 text-moss font-semibold text-sm mb-6 border border-sage/30">
          Innovation & Durabilité
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-forest leading-[1.1] mb-6">
          Bâtir le Futur avec <span className="text-moss italic">La Nature</span>.
        </h1>
        <p className="text-lg md:text-xl text-forest/70 mb-10 max-w-lg leading-relaxed">
          Le Eco Build Club rassemble les étudiants passionnés par la construction durable et l'architecture biosourcée. Rejoignez-nous pour concevoir aujourd'hui les bâtiments de demain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfhc-_cne2Hil7cw1osd0jK0AzuEKHIM91HWR9ZPEfZ4moOXQ/viewform" target="_blank" rel="noopener noreferrer" className="bg-forest text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-moss transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 group">
            Rejoindre le club
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="border-2 border-forest/20 text-forest px-8 py-4 rounded-2xl font-bold text-lg hover:border-forest/40 transition-colors">
            Voir nos projets
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
           <img 
            src="/fste.png" 
            alt="FSTE - École d'Architecture" 
            className="w-full h-full object-contain bg-cream"
          />
          <div className="absolute inset-0 bg-forest/10 mix-blend-multiply" />
        </div>
        
        {/* Floating badge */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 max-w-[200px]"
        >
          <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
            <Users className="text-moss w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-forest leading-none">20+</p>
            <p className="text-sm text-forest/60">Membres actifs</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-white/40">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-forest mb-8 underline decoration-earth/30 decoration-4 underline-offset-8">
          Notre Vision
        </h2>
        <p className="text-xl text-forest/80 leading-relaxed italic">
          "Étudiants du Master BD2EAT, nous partageons la conviction que construire autrement est possible. Au sein du club, nous imaginons une architecture plus durable, plus intelligente et plus proche de la nature, et nous agissons collectivement pour y parvenir."
        </p>
      </motion.div>
    </div>
  </section>
);

const Activities = () => (
  <section id="activities" className="py-24 max-w-7xl mx-auto px-6">
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-forest mb-4">Nos Activités</h2>
      <div className="w-24 h-1 bg-moss rounded-full" />
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {activities.map((activity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all group hover:-translate-y-2 border border-forest/5"
        >
          <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sage/20 transition-colors">
            <activity.icon className="text-moss w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-forest mb-4">{activity.title}</h3>
          <p className="text-forest/70 leading-relaxed">
            {activity.description}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4;
  const maxIndex = Math.max(0, team.length - cardsPerView);

  const scrollLeft = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const scrollRight = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section id="team" className="py-24 bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Le Bureau</h2>
          <p className="text-cream/60">Les visages derrière l'initiative</p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-cream rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-6 h-6 text-forest rotate-180" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-12">
            <div
              className="flex gap-8 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-[0_0_25%] min-w-[250px] bg-white/10 backdrop-blur-sm p-8 rounded-3xl text-center border border-white/5 hover:bg-white/20 transition-colors"
                >
                  <div className="w-20 h-20 bg-cream/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-10 h-10 text-cream" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-sm text-cream/70 uppercase tracking-widest">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            disabled={currentIndex === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-cream rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-6 h-6 text-forest" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = new URLSearchParams();
    
    formData.forEach((value, key) => {
      data.append(key, value as string);
    });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString()
    })
    .then(() => {
      alert("✅ Merci ! Votre message a bien été envoyé à l'Eco Build Club.");
      form.reset();
    })
    .catch(() => {
      alert("Oups, une erreur s'est produite lors de l'envoi.");
    });
  };

  return (
    <section id="contact-form" className="py-24 bg-cream/30">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-forest mb-8">Envoyez-nous un message</h2>
          
          <form 
            ref={formRef}
            name="contact" 
            method="POST" 
            data-netlify="true"
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-forest">Nom complet *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Votre nom" 
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-forest">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="votre@email.com" 
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-semibold text-forest">Sujet *</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Sujet de votre message" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-forest">Message *</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Votre message..." 
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all resize-none"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-forest text-white px-6 py-4 rounded-md font-semibold hover:bg-moss transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Envoyer le message
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-500 mt-4">* Champs obligatoires</p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-forest text-white py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        
        {/* Colonne 1: À propos */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Eco Build Club" className="w-14 h-14 object-contain bg-white/10 rounded-xl p-2" />
            <span className="text-2xl font-bold tracking-tight">Eco Build Club</span>
          </div>
          <p className="text-white/70 leading-relaxed">
            Construire l'avenir avec la nature.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/ecobuild_club_fste/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white hover:scale-110">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://web.facebook.com/people/ECO-Build-Club-FST-Errachidia/61563228913721/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white hover:scale-110">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@ecobuildclub.fste" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white hover:scale-110">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.04-4.98 4.83 4.83 0 0 1 3.71 4.23l.01-3.63a4.83 4.83 0 0 1 4.8-4.15h1.9zm-6.08 3.38a3.39 3.39 0 0 0 1.27-2.23V6.08h1.8a4.83 4.83 0 0 1 0 9.66h-1.8v2.38a3.39 3.39 0 0 0-1.27-2.23z"/>
              </svg>
            </a>
            <a href="mailto:hello@ecobuild.club" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white hover:scale-110">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Colonne 2: Contactez-nous */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold">Contact</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/80">
              <MapPin className="w-5 h-5 text-sage flex-shrink-0" />
              <span>Faculté des Sciences et Techniques (FSTE), Errachidia</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Phone className="w-5 h-5 text-sage flex-shrink-0" />
              <span>+212 6 00 00 00 00</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Mail className="w-5 h-5 text-sage flex-shrink-0" />
              <a href="mailto:hello@ecobuild.club" className="hover:text-white transition-colors">hello@ecobuild.club</a>
            </div>
          </div>
        </div>

        {/* Colonne 3: OÃ¹ nous trouver */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold">Où nous trouver</h3>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.5!2d-4.4583608!3d31.9392593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd984a4049c831d7%3A0x39802ab7bd2b9d05!2sFacult%C3%A9%20des%20Sciences%20et%20Techniques%20d%27Errachidia!5e1!3m2!1sfr!2sma!4v1"
            width="100%"
            height="192"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg w-full h-48"
            title="Carte Eco Build Club"
          />
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
        <p>© 2026 Eco Build Club - Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-moss selection:text-white scroll-smooth focus:scroll-auto">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Activities />
        <Team />
      </main>
      <ContactForm />
      <Footer />
    </div>
  );
}
