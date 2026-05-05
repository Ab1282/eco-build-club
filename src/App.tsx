/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
  Send,
  Moon,
  Sun,
  ChevronUp
} from 'lucide-react';

// --- Animation Variants ---
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8
    }
  }
};

const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8
    }
  }
};

const fadeInRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8
    }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8
    }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6
    }
  }
};
interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Accueil', href: '#home' },
  { name: 'À propos', href: '#about' },
  { name: 'Projets', href: '#projects' },
  { name: 'Activités', href: '#activities' },
  { name: 'Événements', href: '#events' },
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

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  year: number;
  status: 'completed' | 'ongoing' | 'planned';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Éco-quartier FSTE',
    description: 'Conception d\'un quartier résidentiel durable avec bâtiments passifs et espaces verts intégrés.',
    category: 'Urbanisme',
    image: '/projects/eco-quartier.jpg',
    technologies: ['Bois local', 'Isolation naturelle', 'Énergie solaire'],
    year: 2024,
    status: 'ongoing'
  },
  {
    id: 2,
    title: 'Centre Culturel Biosourcé',
    description: 'Rénovation d\'un bâtiment historique avec matériaux biosourcés et techniques de construction ancestrales.',
    category: 'Rénovation',
    image: '/projects/centre-culturel.jpg',
    technologies: ['Pierre locale', 'Chaux', 'Bois massif'],
    year: 2023,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Maison Passive Prototype',
    description: 'Construction d\'une maison passive servant de modèle pour les futures réalisations étudiantes.',
    category: 'Construction',
    image: '/projects/maison-passive.jpg',
    technologies: ['Isolation paille', 'Ventilation double-flux', 'Pompe à chaleur'],
    year: 2024,
    status: 'completed'
  },
  {
    id: 4,
    title: 'Jardin Productif Urbain',
    description: 'Aménagement d\'espaces agricoles urbains pour favoriser l\'autonomie alimentaire locale.',
    category: 'Aménagement',
    image: '/projects/jardin-urbain.jpg',
    technologies: ['Permaculture', 'Compostage', 'Récupération eaux pluviales'],
    year: 2024,
    status: 'ongoing'
  },
  {
    id: 5,
    title: 'Pavillon d\'Exposition',
    description: 'Structure temporaire en bois pour expositions et événements sur l\'architecture durable.',
    category: 'Temporaire',
    image: '/projects/pavillon-expo.jpg',
    technologies: ['Bois lamellé-collé', 'Assemblage modulaire', 'Recyclable'],
    year: 2023,
    status: 'completed'
  },
  {
    id: 6,
    title: 'École Maternelle Verte',
    description: 'Construction d\'une école maternelle avec critères environnementaux élevés.',
    category: 'Éducation',
    image: '/projects/ecole-maternelle.jpg',
    technologies: ['Matériaux naturels', 'Peintures écologiques', 'Éclairage LED'],
    year: 2025,
    status: 'planned'
  }
];

const projectCategories = ['Tous', 'Construction', 'Rénovation', 'Urbanisme', 'Aménagement', 'Éducation', 'Temporaire'];

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity: number;
  registered: number;
  image: string;
  speakers?: string[];
}

const events: Event[] = [
  {
    id: 1,
    title: 'Conférence : Bâtiment Passif 2026',
    description: 'Découvrez les dernières innovations en matière de bâtiments passifs avec notre expert invité du secteur.',
    date: '2026-05-15',
    time: '18:30',
    location: 'Amphithéâtre FSTE, Errachidia',
    category: 'Conférence',
    capacity: 200,
    registered: 145,
    image: '/events/conference-passive.jpg',
    speakers: ['Dr. Ahmed Mansouri', 'Archi. Sofia Benalaoui']
  },
  {
    id: 2,
    title: 'Workshop : Construction en Paille',
    description: 'Un atelier pratique pour découvrir les techniques de construction avec la paille comme matériau biosourcé.',
    date: '2026-05-22',
    time: '14:00',
    location: 'Laboratoire de Construction, FSTE',
    category: 'Workshop',
    capacity: 50,
    registered: 42,
    image: '/events/workshop-paille.jpg',
    speakers: ['Ing. Marc Dubois']
  },
  {
    id: 3,
    title: 'Visite de Chantier : Projet BD2EAT',
    description: 'Visite guidée d\'un chantier réel utilisant des matériaux biosourcés. Transport fourni.',
    date: '2026-05-29',
    time: '09:00',
    location: 'Départ FSTE',
    category: 'Visite',
    capacity: 35,
    registered: 28,
    image: '/events/visite-chantier.jpg'
  },
  {
    id: 4,
    title: 'Formation : Dimensionnement Thermique',
    description: 'Formation théorique et pratique sur le dimensionnement thermique des bâtiments durables.',
    date: '2026-06-05',
    time: '10:00',
    location: 'Salle 301, Bâtiment B, FSTE',
    category: 'Formation',
    capacity: 80,
    registered: 62,
    image: '/events/formation-thermique.jpg',
    speakers: ['Prof. Karim Lahlou']
  },
  {
    id: 5,
    title: 'Networking : Rencontre avec les Professionnels',
    description: 'Rencontrez les professionnels du secteur de la construction durable. Échanges informels et cocktail.',
    date: '2026-06-10',
    time: '17:00',
    location: 'Hall de l\'école, FSTE',
    category: 'Networking',
    capacity: 150,
    registered: 89,
    image: '/events/networking.jpg'
  },
  {
    id: 6,
    title: 'Séminaire : Impact Environnemental',
    description: 'Séminaire sur l\'analyse du cycle de vie (ACV) et l\'impact environnemental des matériaux de construction.',
    date: '2026-06-17',
    time: '15:00',
    location: 'Amphithéâtre FSTE',
    category: 'Séminaire',
    capacity: 120,
    registered: 95,
    image: '/events/seminaire-acv.jpg',
    speakers: ['Dr. Fatima Al-Mansouri']
  }
];

const eventCategories = ['Tous', 'Conférence', 'Workshop', 'Formation', 'Visite', 'Networking', 'Séminaire'];

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  { name: 'Salka Mouchain', role: 'Présidente - M1 BD2EAT', image: 'salka.jpg' },
  { name: 'Oussama Bounou', role: 'Vice-Président - M1 BD2EAT', image: 'me.jpg' },
  { name: 'Ikram El Ibrahimi', role: 'Secrétaire - M1 BD2EAT', image: 'ikram.jpg' },
  { name: 'Anass Jourfi', role: 'Membre actif - M1 BD2EAT', image: 'anass.jpg' },
  { name: 'Aya Berdi', role: 'Trésorière - M1 BD2EAT', image: 'aya.jpg' },
  { name: 'Nada Bou-Imesmaren', role: 'Responsable Communication - M1 BD2EAT', image: 'nada.jpg' },
  { name: 'Ahlam El Aidouni', role: 'Responsable Événements - M1 BD2EAT', image: 'ahlam.jpg' },
  { name: 'Assif Ahmed', role: 'Membre actif - M1 BD2EAT', image: 'ahmed.jpg' },
  { name: 'Yassine Mebrouk', role: 'Membre actif - M1 BD2EAT', image: 'yassine.jpg' },
  { name: 'Oussama Abarji', role: 'Membre actif - M1 BD2EAT', image: 'oussama.jpg' },
];

// --- Global State for Join Modal ---
const JoinModalContext = createContext<{
  showJoinModal: boolean;
  setShowJoinModal: (show: boolean) => void;
}>({
  showJoinModal: false,
  setShowJoinModal: () => {}
});

const JoinModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  
  return (
    <JoinModalContext.Provider value={{ showJoinModal, setShowJoinModal }}>
      {children}
      <JoinModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />
    </JoinModalContext.Provider>
  );
};

const useJoinModal = () => {
  const context = useContext(JoinModalContext);
  if (!context) {
    throw new Error('useJoinModal must be used within JoinModalProvider');
  }
  return context;
};

// --- Components ---

const Navbar = () => {
  const { setShowJoinModal } = useJoinModal();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Vérifier le mode sauvegardé dans localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

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
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-forest/10 hover:bg-forest/20 transition-colors"
            aria-label="Basculer le mode sombre"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-forest" />
            ) : (
              <Moon className="w-5 h-5 text-forest" />
            )}
          </button>
          <button
            onClick={() => setShowJoinModal(true)}
            className="bg-forest text-white px-5 py-2.5 rounded-full font-medium hover:bg-moss transition-colors shadow-md"
          >
            Rejoindre
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="md:hidden flex items-center gap-3">
          {/* Dark Mode Toggle Mobile */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-forest/10 hover:bg-forest/20 transition-colors"
            aria-label="Basculer le mode sombre"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-forest" />
            ) : (
              <Moon className="w-5 h-5 text-forest" />
            )}
          </button>
          {/* Mobile Toggle */}
          <button 
            className="text-forest"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
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
              <button
                onClick={() => setShowJoinModal(true)}
                className="bg-forest text-white w-full py-3 rounded-xl font-bold"
              >
                Rejoindre le club
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { setShowJoinModal } = useJoinModal();
  const [memberCount, setMemberCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  
  // Animation des compteurs
  useEffect(() => {
    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 20);
    };
    
    // Démarrer les animations après un délai
    setTimeout(() => {
      animateCounter(25, setMemberCount);
      animateCounter(12, setProjectCount);
    }, 1000);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Fond dynamique avec formes animées */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-moss to-sage">
        {/* Formes géométriques animées */}
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-32 left-16 w-48 h-48 bg-sage/20 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-earth/30 rounded-full blur-xl"
        />
      </div>

      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.span 
            variants={fadeInUpVariants}
            className="inline-block px-4 py-1 rounded-full bg-sage/20 text-moss font-semibold text-sm mb-6 border border-sage/30 backdrop-blur-sm"
          >
            Innovation & Durabilité
          </motion.span>
          
          <motion.h1 
            variants={fadeInUpVariants}
            className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg"
          >
            Bâtir le Futur avec{' '}
            <motion.span 
              variants={scaleInVariants}
              className="text-cream italic relative"
            >
              La Nature
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-cream/50 rounded-full"
              />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUpVariants}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-lg leading-relaxed drop-shadow-md"
          >
            Le Eco Build Club rassemble les étudiants passionnés par la construction durable et l'architecture biosourcée. 
            Rejoignez-nous pour concevoir aujourd'hui les bâtiments de demain.
          </motion.p>
          
          <motion.div 
            variants={staggerContainerVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              variants={staggerItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowJoinModal(true)}
              className="bg-white text-forest px-8 py-4 rounded-2xl font-bold text-lg hover:bg-cream transition-all shadow-2xl flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Rejoindre le club</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>
            
            <motion.button 
              variants={staggerItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:border-white/50 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Voir nos projets
            </motion.button>
          </motion.div>

          {/* Statistiques animées */}
          <motion.div 
            variants={staggerContainerVariants}
            className="mt-12 grid grid-cols-2 gap-8"
          >
            <motion.div 
              variants={staggerItemVariants}
              className="text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="text-4xl font-bold text-white mb-2"
              >
                {memberCount}+
              </motion.div>
              <div className="text-white/80 text-sm">Membres actifs</div>
            </motion.div>
            <motion.div 
              variants={staggerItemVariants}
              className="text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                className="text-4xl font-bold text-white mb-2"
              >
                {projectCount}+
              </motion.div>
              <div className="text-white/80 text-sm">Projets réalisés</div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <img 
              src="/fste.png" 
              alt="FSTE - École d'Architecture" 
              className="w-full h-full object-contain bg-cream"
            />
            <div className="absolute inset-0 bg-forest/10 mix-blend-multiply" />
            
            {/* Overlay animé au hover */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent"
            />
          </motion.div>
          
          {/* Floating badge amélioré */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[200px] backdrop-blur-sm border border-white/20"
          >
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center"
            >
              <Users className="text-moss w-6 h-6" />
            </motion.div>
            <div>
              <motion.p 
                className="text-2xl font-bold text-forest leading-none"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                {memberCount}+
              </motion.p>
              <p className="text-sm text-forest/60">Membres actifs</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24 bg-white/40">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 
          variants={fadeInUpVariants}
          className="text-3xl md:text-5xl font-bold text-forest mb-8 underline decoration-earth/30 decoration-4 underline-offset-8"
        >
          Notre Vision
        </motion.h2>
        <motion.p 
          variants={fadeInUpVariants}
          className="text-xl text-forest/80 leading-relaxed italic"
        >
          "Étudiants du Master BD2EAT, nous partageons la conviction que construire autrement est possible. Au sein du club, nous imaginons une architecture plus durable, plus intelligente et plus proche de la nature, et nous agissons collectivement pour y parvenir."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Fermer la modale avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'bg-sage/20 text-moss';
      case 'ongoing': return 'bg-earth/20 text-earth';
      case 'planned': return 'bg-cream/50 text-forest';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'ongoing': return 'En cours';
      case 'planned': return 'Planifié';
      default: return status;
    }
  };

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUpVariants}
            className="text-4xl md:text-5xl font-bold text-forest mb-6"
          >
            Nos Projets
          </motion.h2>
          <motion.p 
            variants={fadeInUpVariants}
            className="text-xl text-forest/70 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez nos réalisations en bâtiment durable : de la conception à la réalisation, 
            nous mettons en pratique les principes de l'architecture biosourcée.
          </motion.p>
        </motion.div>

        {/* Filtres */}
        <motion.div 
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              variants={staggerItemVariants}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-forest text-white shadow-lg'
                  : 'bg-cream/50 text-forest hover:bg-cream/70'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItemVariants}
              className="group cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-forest/5">
                {/* Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-sage/20 to-moss/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-forest text-xs font-medium">
                    {project.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-forest group-hover:text-moss transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-medium text-sage bg-sage/10 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-forest/70 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-cream/50 text-forest px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs bg-cream/50 text-forest px-2 py-1 rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <motion.div 
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-12"
          >
            <p className="text-forest/60 text-lg">Aucun projet trouvé dans cette catégorie.</p>
          </motion.div>
        )}
      </div>

      {/* Modal du projet */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="aspect-[16/9] bg-gradient-to-br from-sage/20 to-moss/20 relative overflow-hidden rounded-t-3xl">
                <div className="absolute top-6 right-6 flex gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                    {getStatusText(selectedProject.status)}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-white/90 text-forest text-sm font-medium">
                    {selectedProject.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-forest mb-2">{selectedProject.title}</h3>
                    <span className="text-sm font-medium text-sage bg-sage/10 px-3 py-1 rounded-full">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                <p className="text-forest/80 text-lg leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-forest mb-3">Technologies utilisées</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-sage/10 text-moss px-3 py-2 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Informations supplémentaires */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-forest/10">
                  <div>
                    <h4 className="text-lg font-semibold text-forest mb-3">Statut du projet</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                      {getStatusText(selectedProject.status)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-forest mb-3">Année</h4>
                    <span className="text-forest/70">{selectedProject.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Activities = () => {
  const activityLinks = [
    { activity: activities[0], path: '/activites/conferences' },
    { activity: activities[1], path: '/activites/formations' },
    { activity: activities[2], path: '/activites/visites' },
  ];

  return (
    <section id="activities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUpVariants}
            className="text-4xl md:text-5xl font-bold text-forest mb-6"
          >
            Nos Activités
          </motion.h2>
          <motion.p 
            variants={fadeInUpVariants}
            className="text-xl text-forest/70 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez les différentes activités organisées par le Eco Build Club pour enrichir votre parcours.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {activityLinks.map(({ activity, path }) => (
            <motion.div
              key={activity.title}
              variants={staggerItemVariants}
              className="group"
            >
              <Link to={path} className="no-underline">
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-forest/5 h-full p-8 flex flex-col hover:translate-y-[-8px]">
                  <div className="w-16 h-16 bg-gradient-to-br from-sage to-moss rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <activity.icon className="text-white w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-forest mb-4 group-hover:text-moss transition-colors">
                    {activity.title}
                  </h3>
                  
                  <p className="text-forest/70 leading-relaxed flex-grow mb-6">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-2 text-moss font-semibold group-hover:translate-x-2 transition-transform">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Events = () => {
  const { setShowJoinModal } = useJoinModal();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = selectedCategory === 'Tous' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  // Trier les événements par date
  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const openModal = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  // Fermer la modale avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCapacityPercentage = (registered: number, capacity: number) => {
    return Math.round((registered / capacity) * 100);
  };

  return (
    <section id="events" className="py-24 bg-gradient-to-br from-cream/30 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUpVariants}
            className="text-4xl md:text-5xl font-bold text-forest mb-6"
          >
            Nos Événements
          </motion.h2>
          <motion.p 
            variants={fadeInUpVariants}
            className="text-xl text-forest/70 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez notre calendrier d'événements : conférences, workshops, visites de chantiers et formations 
            pour progresser ensemble dans l'architecture durable.
          </motion.p>
        </motion.div>

        {/* Filtres */}
        <motion.div 
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {eventCategories.map((category) => (
            <motion.button
              key={category}
              variants={staggerItemVariants}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-forest text-white shadow-lg'
                  : 'bg-white text-forest hover:bg-cream/50 border border-forest/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Grille d'événements */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={staggerItemVariants}
              className="group cursor-pointer h-full"
              onClick={() => openModal(event)}
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-forest/5 h-full flex flex-col">
                {/* Date Header */}
                <div className="bg-gradient-to-r from-moss to-sage p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium opacity-90">{event.category}</div>
                      <div className="text-3xl font-bold">{new Date(event.date).getDate()}</div>
                      <div className="text-sm opacity-80">{new Date(event.date).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' })}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{event.time}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-forest mb-3 group-hover:text-moss transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-forest/70 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {event.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-forest/10">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-forest/70 line-clamp-2">{event.location}</span>
                    </div>

                    {/* Capacity */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-forest/70">Places disponibles</span>
                        <span className="font-semibold text-forest">{event.registered}/{event.capacity}</span>
                      </div>
                      <div className="w-full bg-cream rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${getCapacityPercentage(event.registered, event.capacity)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-moss to-sage"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message si aucun événement */}
        {sortedEvents.length === 0 && (
          <motion.div 
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-12"
          >
            <p className="text-forest/60 text-lg">Aucun événement trouvé dans cette catégorie.</p>
          </motion.div>
        )}
      </div>

      {/* Modal de l'événement */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-moss to-sage p-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-3">
                      {selectedEvent.category}
                    </span>
                    <h2 className="text-4xl font-bold mb-2">{selectedEvent.title}</h2>
                  </div>
                </div>

                {/* Infos essentielles */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 opacity-90" />
                    <div>
                      <div className="text-sm opacity-80">Date</div>
                      <div className="font-semibold">{formatDate(selectedEvent.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-sm opacity-80">Horaire</div>
                      <div className="font-semibold">{selectedEvent.time}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-forest mb-4">À propos</h3>
                  <p className="text-forest/80 text-lg leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Location */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-forest mb-4">Lieu</h3>
                  <div className="flex items-start gap-3 p-4 bg-cream/50 rounded-xl">
                    <MapPin className="w-6 h-6 text-moss flex-shrink-0 mt-0.5" />
                    <span className="text-forest/80">{selectedEvent.location}</span>
                  </div>
                </div>

                {/* Speakers */}
                {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-forest mb-4">Intervenants</h3>
                    <div className="space-y-2">
                      {selectedEvent.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-sage/10 rounded-lg">
                          <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-moss" />
                          </div>
                          <span className="font-semibold text-forest">{speaker}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Capacity */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-forest mb-4">Places</h3>
                  <div className="space-y-3 p-4 bg-cream/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-forest/70">Places réservées</span>
                      <span className="font-bold text-lg text-forest">{selectedEvent.registered}/{selectedEvent.capacity}</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-forest/10">
                      <div
                        className="h-full bg-gradient-to-r from-moss to-sage"
                        style={{ width: `${getCapacityPercentage(selectedEvent.registered, selectedEvent.capacity)}%` }}
                      />
                    </div>
                    <div className="text-sm text-forest/60">
                      {selectedEvent.capacity - selectedEvent.registered} place{selectedEvent.capacity - selectedEvent.registered > 1 ? 's' : ''} disponible{selectedEvent.capacity - selectedEvent.registered > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowJoinModal(true)}
                    className="flex-1 bg-forest text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-moss transition-all flex items-center justify-center gap-2"
                  >
                    <span>S'inscrire</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const cardsPerView = 4;
  const maxIndex = Math.max(0, team.length - cardsPerView);

  const scrollLeft = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const scrollRight = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // Fermer la modale avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section id="team" className="py-24 bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUpVariants}
            className="text-4xl font-bold mb-4"
          >
            Le Bureau
          </motion.h2>
          <motion.p 
            variants={fadeInUpVariants}
            className="text-cream/60"
          >
            Les visages derrière l'initiative
          </motion.p>
        </motion.div>

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
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-8 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={staggerItemVariants}
                  className="flex-[0_0_25%] min-w-[250px] bg-white/10 backdrop-blur-sm p-8 rounded-3xl text-center border border-white/5 hover:bg-white/20 transition-colors cursor-pointer"
                  onClick={() => openModal(member)}
                >
                  <div className="w-32 h-32 bg-cream/20 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`/cercle/${member.image.replace('.jpg', '.png')}`} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<svg class="w-10 h-10 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-sm text-cream/70 uppercase tracking-widest">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
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

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full md:w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={`/equipe/${selectedMember.image}`}
                alt={selectedMember.name}
                className="w-full md:max-w-none h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Member Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-2xl font-bold mb-2">{selectedMember.name}</h3>
                <p className="text-white/80 text-lg">{selectedMember.role}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Le nom est requis';
        else if (value.length < 2) error = 'Le nom doit contenir au moins 2 caractères';
        break;
      case 'email':
        if (!value.trim()) error = 'L\'email est requis';
        else if (!validateEmail(value)) error = 'Veuillez entrer un email valide';
        break;
      case 'subject':
        if (!value.trim()) error = 'Le sujet est requis';
        else if (value.length < 3) error = 'Le sujet doit contenir au moins 3 caractères';
        break;
      case 'message':
        if (!value.trim()) error = 'Le message est requis';
        else if (value.length < 10) error = 'Le message doit contenir au moins 10 caractères';
        break;
    }
    
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validation en temps réel
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valider tous les champs
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message)
    };
    
    setErrors(newErrors);
    
    // Vérifier s'il y a des erreurs
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Configuration Web3Forms
      const formEndpoint = 'https://api.web3forms.com/submit';
      const formDataWithKey = {
        ...formData,
        access_key: '78b8bcda-45ed-4de3-a120-01ff6015101b'
      };
      
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataWithKey)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      alert('Oups, une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-24 bg-cream/30">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <motion.h2 
            variants={fadeInUpVariants}
            className="text-2xl font-bold text-forest mb-8"
          >
            Envoyez-nous un message
          </motion.h2>
          
          {/* Message de succès */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
            >
              ✅ Merci ! Votre message a bien été envoyé à l'Eco Build Club.
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Champ caché pour la clé d'API Web3Forms */}
            <input 
              type="hidden" 
              name="access_key" 
              value="78b8bcda-45ed-4de3-a120-01ff6015101b" 
              readOnly 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-forest">Nom complet *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom" 
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-forest">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com" 
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-semibold text-forest">Sujet *</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Sujet de votre message" 
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-600"
                >
                  {errors.subject}
                </motion.p>
                )}
              </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-forest">Message *</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Votre message..." 
                rows={5}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-600"
                >
                  {errors.message}
                </motion.p>
                )}
              </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-forest text-white px-6 py-4 rounded-md font-semibold hover:bg-moss transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </>
              )}
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-500 mt-4">* Champs obligatoires</p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-forest text-white py-16">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div 
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        
        {/* Colonne 1: À propos */}
        <motion.div 
          variants={staggerItemVariants}
          className="flex flex-col gap-6"
        >
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
        </motion.div>

        {/* Colonne 2: Contactez-nous */}
        <motion.div 
          variants={staggerItemVariants}
          className="flex flex-col gap-6"
        >
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
        </motion.div>

        {/* Colonne 3: OÃ¹ nous trouver */}
        <motion.div 
          variants={staggerItemVariants}
          className="flex flex-col gap-6"
        >
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
        </motion.div>

      </motion.div>

      {/* Copyright */}
      <motion.div 
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm"
      >
        <p>© 2026 Eco Build Club - Tous droits réservés.</p>
      </motion.div>
    </div>
  </footer>
);

const ActivityPage = ({ activity }: { activity: Activity }) => (
  <div className="min-h-screen selection:bg-moss selection:text-white scroll-smooth focus:scroll-auto">
    <Navbar />
    
    {/* Hero Section */}
    <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-forest via-moss to-sage">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <activity.icon className="text-white w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {activity.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos initiatives et rejoignez-nous dans cette aventure passionnante.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Présentation Section */}
    <section className="py-24 bg-white/40">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-forest mb-8 underline decoration-earth/30 decoration-4 underline-offset-8">
            À propos de cette activité
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-forest/80 leading-relaxed">
              {activity.description}
            </p>
            <p className="text-lg text-forest/80 leading-relaxed">
              Nos sessions sont conçues pour être interactives et enrichissantes, 
              permettant aux participants d'acquérir des compétences pratiques et 
              de networking précieux dans le domaine de l'architecture durable.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-forest mb-6">Prochaines dates</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-cream/50 rounded-lg">
                <Calendar className="text-moss w-6 h-6" />
                <div>
                  <p className="font-semibold text-forest">À venir</p>
                  <p className="text-sm text-forest/60">Date à confirmer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Galerie Section */}
    <section className="py-24 bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Retour en images</h2>
          <p className="text-cream/60">Découvrez nos événements passés</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder images - remplacez par vos vraies images */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square bg-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-full h-full bg-gradient-to-br from-sage/30 to-moss/30 flex items-center justify-center">
                <span className="text-white/60 text-lg">Image {index}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-24 bg-gradient-to-r from-moss to-sage">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Prêt à nous rejoindre ?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Inscrivez-vous à notre prochain événement et faites partie de la communauté 
            Eco Build Club.
          </p>
          <button 
            type="button"
            onClick={() => window.location.href = '/#home'}
            className="inline-flex items-center gap-3 bg-white text-forest px-8 py-4 rounded-2xl font-bold text-lg hover:bg-cream transition-all hover:scale-105 shadow-xl"
          >
            S'inscrire au prochain événement
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/activites/conferences" element={<ActivityPage activity={activities[0]} />} />
      <Route path="/activites/formations" element={<ActivityPage activity={activities[1]} />} />
      <Route path="/activites/visites" element={<ActivityPage activity={activities[2]} />} />
    </Routes>
  );
}

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-forest text-white rounded-full shadow-lg hover:bg-moss transition-colors"
          aria-label="Retour en haut"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const JoinModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: '',
    motivation: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    level: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Le nom est requis';
        else if (value.length < 2) error = 'Le nom doit contenir au moins 2 caractères';
        break;
      case 'email':
        if (!value.trim()) error = 'L\'email est requis';
        else if (!validateEmail(value)) error = 'Veuillez entrer un email valide';
        break;
      case 'level':
        if (!value) error = 'Le niveau d\'études est requis';
        break;
      case 'motivation':
        if (!value.trim()) error = 'La motivation est requise';
        else if (value.length < 20) error = 'La motivation doit contenir au moins 20 caractères';
        break;
    }
    
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      level: validateField('level', formData.level),
      motivation: validateField('motivation', formData.motivation)
    };
    
    setErrors(newErrors);
    
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formEndpoint = 'https://api.web3forms.com/submit';
      const formDataWithKey = {
        ...formData,
        access_key: '00849f8d-5754-4155-b8e4-213ea400afb7'
      };
      
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataWithKey)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', level: '', motivation: '' });
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 3000);
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      alert('Oups, une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fermer la modale avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-cream rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-forest text-white p-8 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Rejoindre l'Eco Build Club</h2>
                  <p className="text-cream/80">Deviens acteur du changement durable</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-forest mb-4">
                    Super ! Ta candidature a bien été envoyée
                  </h3>
                  <p className="text-forest/70 text-lg">
                    Nous te contacterons très vite pour la suite du processus !
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Champ caché pour la clé d'API */}
                  <input 
                    type="hidden" 
                    name="access_key" 
                    value="00849f8d-5754-4155-b8e4-213ea400afb7" 
                    readOnly 
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-semibold text-forest">Nom complet *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Votre nom complet" 
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-red-600"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-semibold text-forest">Email universitaire ou personnel *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="votre@email.com" 
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-red-600"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="level" className="text-sm font-semibold text-forest">Niveau d'études / Filière *</label>
                    <select 
                      id="level" 
                      name="level" 
                      value={formData.level}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all ${
                        errors.level ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Sélectionnez votre niveau</option>
                      <option value="M1 BD2EAT">M1 BD2EAT</option>
                      <option value="M2 BD2EAT">M2 BD2EAT</option>
                      <option value="Licence">Licence</option>
                      <option value="Master autre">Master autre</option>
                      <option value="Doctorat">Doctorat</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {errors.level && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-red-600"
                      >
                        {errors.level}
                      </motion.p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="motivation" className="text-sm font-semibold text-forest">Pourquoi veux-tu rejoindre le Eco Build Club ? *</label>
                    <textarea 
                      id="motivation" 
                      name="motivation" 
                      value={formData.motivation}
                      onChange={handleInputChange}
                      placeholder="Partage ta motivation et ce que tu apportes au club..." 
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent transition-all resize-none ${
                        errors.motivation ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.motivation && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-red-600"
                      >
                        {errors.motivation}
                      </motion.p>
                    )}
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-forest text-white px-6 py-4 rounded-xl font-semibold hover:bg-moss transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer ma candidature
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HomePage = () => {
  return (
    <JoinModalProvider>
      <div className="min-h-screen selection:bg-moss selection:text-white scroll-smooth focus:scroll-auto">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Activities />
          <Events />
          <Team />
        </main>
        <ContactForm />
        <Footer />
        <BackToTop />
      </div>
    </JoinModalProvider>
  );
};
