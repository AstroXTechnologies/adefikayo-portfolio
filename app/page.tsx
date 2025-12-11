'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, Variants, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Instagram, Youtube, Twitter, Mail, ArrowRight, Play, Star, 
  Sparkles, Camera, PenTool, Mic, Users, Heart, Zap, Globe, Quote, Menu, X
} from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import { Playfair_Display, Inter } from 'next/font/google';

// --- FONTS ---
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  style: ['normal', 'italic'] 
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const marqueeVariants: Variants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
    },
  },
};

// --- DATA: PORTFOLIO / WORK ---
const portfolioItems = [
  { id: 1, type: 'video', src: '/fikayo20.mp4', span: 'md:col-span-2 md:row-span-2', title: "Summer Campaign" },
  { id: 2, type: 'video', src: '/fikayo21.mp4', span: 'md:col-span-1 md:row-span-1', title: "Skincare Routine" },
  { id: 3, type: 'video', src: '/fikayo22.mp4', span: 'md:col-span-1 md:row-span-2', title: "Vogue Feature" }, 
  { id: 4, type: 'video', src: '/influence4.mp4', span: 'md:col-span-1 md:row-span-1', title: "Travel Diary" },
  { id: 5, type: 'video', src: '/fikayo24.mp4', span: 'md:col-span-2 md:row-span-1', title: "Fashion Week" },
  { id: 6, type: 'video', src: '/fikayo25.mp4', span: 'md:col-span-2 md:row-span-1', title: "Wellness Tips" },
  { id: 7, type: 'video', src: '/fikayo26.mp4', span: 'md:col-span-4 md:h-[500px]', title: "Cinematic Reel" },
];

// --- DATA: SERVICES ---
const services = [
  { icon: Camera, title: "Sponsored Posts", desc: "High-fidelity photography and product features tailored to your brand's aesthetic." },
  { icon: Star, title: "Brand Ambassadorship", desc: "Long-term partnerships that build authentic trust with my audience through consistent integration." },
  { icon: Sparkles, title: "Reviews & Routines", desc: "Authentic beauty and wellness reviews that simplify complex topics for the consumer." },
  { icon: Mic, title: "Event Appearances", desc: "Hosting beauty panels, campaign collaborations, and bringing energy to live activations." },
];

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Helper to close menu on click
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <main className={`${playfair.variable} ${inter.variable} bg-ade-black min-h-screen text-white overflow-x-hidden relative font-sans`}>
      
      {/* Cinematic Grain Overlay */}
      <div className="noise-overlay" />
      
      {/* 3D Background */}
      <ParticleBackground />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent backdrop-blur-[2px]">
        <div className="text-2xl font-serif font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity z-50">
          ADE<span className="text-ade-purple italic">FIKAYO</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-xs font-bold tracking-[0.2em] uppercase text-gray-300">
          <a href="#about" className="hover:text-ade-purple transition-colors relative group">About</a>
          <a href="#brand-dna" className="hover:text-ade-purple transition-colors relative group">Brand DNA</a>
          <a href="#portfolio" className="hover:text-ade-purple transition-colors relative group">Portfolio</a>
          <a href="#services" className="hover:text-ade-purple transition-colors relative group">Services</a>
        </div>

        <div className="hidden md:block w-6 md:w-0"></div> 

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 p-2 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-10 text-xl font-serif"
            >
              <a href="#about" onClick={closeMenu} className="hover:text-ade-purple transition-colors">About</a>
              <a href="#brand-dna" onClick={closeMenu} className="hover:text-ade-purple transition-colors">Brand DNA</a>
              <a href="#portfolio" onClick={closeMenu} className="hover:text-ade-purple transition-colors">Portfolio</a>
              <a href="#services" onClick={closeMenu} className="hover:text-ade-purple transition-colors">Services</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden" ref={targetRef}>
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 scale-105">
            <source src="/influence4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />
        </div>

        <motion.div style={{ opacity, scale, y: yText }} className="relative z-10 text-center px-4 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-ade-purple/50"></div>
            <span className="text-ade-purple uppercase text-xs tracking-[0.4em] font-bold"></span>
            <div className="h-[1px] w-12 bg-ade-purple/50"></div>
          </motion.div>

          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-medium leading-[0.9] mb-8"
          >
            The Art of <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-ade-purple">
              Living Well
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-300 max-w-lg mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            Lifestyle • Beauty • Health
          </motion.p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ArrowRight className="rotate-90" size={16} />
        </motion.div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="w-full bg-ade-purple py-4 overflow-hidden -mt-1 relative z-20 rotate-1 scale-105 border-y border-white/20">
        <motion.div 
          variants={marqueeVariants}
          animate="animate"
          className="flex gap-16 whitespace-nowrap text-white font-bold uppercase tracking-widest text-sm items-center"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span>YSL Beauty</span>
              <Star size={12} fill="white" />
              <span>Alo Yoga</span>
              <Star size={12} fill="white" />
              <span>Sephora Squad</span>
              <Star size={12} fill="white" />
              <span>Vogue Nigeria</span>
              <Star size={12} fill="white" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
        
        {/* Responsive Grid: Stacks on mobile (grid-cols-1), Side-by-side on desktop (md:grid-cols-12) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start max-w-7xl mx-auto">
          
           {/* Image Column (Left Side) */}
           <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} // Fix for mobile: Ensures animation triggers when 30% visible
            transition={{ duration: 1 }}
            className="md:col-span-6 flex flex-col gap-6"
          >
            {/* The Main Image */}
            <div className="relative h-[450px] md:h-[700px] w-full group">
              <div className="absolute inset-0 border border-white/10 rounded-full scale-105 opacity-50 translate-x-4 translate-y-4" />
              <div className="relative h-full w-full rounded-t-[150px] md:rounded-t-[300px] rounded-b-[20px] overflow-hidden">
                 <Image 
                  src="/influence1.jpg" 
                  alt="AdeFikayo Portrait" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Mockup Text / Editorial Sidebar */}
            <div className="hidden md:flex justify-end pr-8">
               <div className="max-w-[250px] text-right border-r border-ade-purple pr-4">
                  <Quote size={24} className="ml-auto mb-2 text-ade-purple" />
                  <p className="font-serif italic text-gray-400 text-sm">
                    Creating a space that feels both aspirational and deeply relatable.
                  </p>
                  <p className="text-[10px] uppercase tracking-widest mt-2 font-bold">- Vogue Feature, 2024</p>
               </div>
            </div>
          </motion.div>

          {/* Text Content (Right Side) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="md:col-span-6 space-y-8 z-10 md:pt-10"
          >
            <motion.div variants={fadeInUp}>
              <h4 className="text-ade-purple font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
                <Sparkles size={16} /> Meet Adefikayo
              </h4>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
                Inspiring a <span className="italic text-purple-300">Balanced</span> & <br /> 
                Intentional Life.
              </h2>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-6 text-gray-300 text-lg leading-relaxed font-light border-l border-white/10 pl-6">
              <p>
                Adefikayo is a lifestyle, beauty, and health creator dedicated to inspiring a balanced, confident, and intentional way of living. Known for her warm presence and authentic voice, she shares content that celebrates self-care, mindful wellness, and effortless beauty.
              </p>
              <p>
                Through product reviews, beauty routines, wellness tips, and everyday lifestyle moments, she encourages her audience to prioritize inner and outer well-being.
              </p>
              <p>
                Her platform is built on transparency, creativity, and connection—helping her followers discover routines, products, and habits that elevate their daily lives. Whether she’s sharing skincare essentials, wellness practices, or glimpses into her personal lifestyle, Adefikayo creates a space that feels both aspirational and relatable.
              </p>
            </motion.div>

            {/* Mockup Text for Mobile (Visible only on small screens) */}
            <div className="md:hidden mt-8 border-l border-ade-purple pl-4">
               <p className="font-serif italic text-gray-400 text-sm">
                 Creating a space that feels both aspirational and deeply relatable.
               </p>
            </div>

            <motion.div variants={fadeInUp} className="pt-6 flex items-center gap-4">
               <div className="h-[1px] w-20 bg-white/20"></div>
               <span className="font-serif italic text-xl">Adefikayo</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- BRAND DNA / GENERAL INFO --- */}
      <section id="brand-dna" className="py-24 bg-[#0a0a0a] relative border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-ade-purple uppercase tracking-widest text-xs font-bold">Brand DNA</span>
            <h3 className="text-4xl md:text-5xl font-serif mt-4">Why Partner With Me?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Card 1: Niche */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="bg-white/5 p-10 rounded-3xl border border-white/5 hover:border-ade-purple/40 transition-colors"
             >
                <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
                  <Heart className="text-ade-purple" />
                </div>
                <h4 className="text-2xl font-serif mb-4">Core Niche</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex gap-3"><span className="text-ade-purple">•</span> Beauty Tutorials & Reviews</li>
                  <li className="flex gap-3"><span className="text-ade-purple">•</span> Skincare Routines</li>
                  <li className="flex gap-3"><span className="text-ade-purple">•</span> Wellness Guidance</li>
                  <li className="flex gap-3"><span className="text-ade-purple">•</span> Personal Growth</li>
                </ul>
             </motion.div>

             {/* Card 2: Values */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-gradient-to-br from-ade-purple/20 to-black p-10 rounded-3xl border border-white/5"
             >
                <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
                  <Zap className="text-white" />
                </div>
                <h4 className="text-2xl font-serif mb-4">Brand Values</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Authenticity, transparency, and empowerment through self-care. I believe in holistic well-being and creativity.
                </p>
                <div className="flex flex-wrap gap-2">
                   {['Authentic', 'Creative', 'Holistic', 'Empowering'].map((tag) => (
                     <span key={tag} className="text-xs border border-white/20 px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                   ))}
                </div>
             </motion.div>

             {/* Card 3: Strengths */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="bg-white/5 p-10 rounded-3xl border border-white/5 hover:border-ade-purple/40 transition-colors"
             >
                <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
                  <Star className="text-ade-purple" />
                </div>
                <h4 className="text-2xl font-serif mb-4">My Strengths</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex gap-3"><span className="text-ade-purple">•</span> Strong Visual Identity</li>
                  <li className="flex gap-3"><span className="text-ade-purple">•</span> Simplifying Complex Topics</li>
                  <li className="flex gap-3"><span className="text-ade-purple">•</span> High Engagement Rates</li>
                  <li className="flex gap-3"><span className="text-ade-purple">•</span> Professional Storytelling</li>
                </ul>
             </motion.div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO / WORK SECTION --- */}
      <section id="portfolio" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div>
              <span className="text-ade-purple uppercase tracking-widest text-xs font-bold">Selected Works</span>
              <h3 className="text-4xl md:text-6xl font-serif mt-2">Visual Diary</h3>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mt-4 md:mt-0">
              A collection of campaigns, reels, and aesthetic moments created for leading brands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group overflow-hidden rounded-2xl bg-gray-900 border border-white/10 min-h-[300px] ${item.span}`}
              >
                {item.type === 'video' && (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                )}
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-ade-purple text-[10px] uppercase font-bold tracking-widest bg-white/10 backdrop-blur-md px-2 py-1 rounded-sm mb-2 inline-block">
                    Watch
                  </span>
                  <h4 className="text-xl font-serif text-white">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-ade-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
             <span className="text-ade-purple uppercase tracking-widest text-xs font-bold">Offerings</span>
             <h3 className="text-4xl md:text-5xl font-serif mt-4">Content Services</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-ade-purple/10 hover:border-ade-purple/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-ade-purple/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="text-ade-purple" size={24} />
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-6 text-center relative overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-[3rem] p-12 md:p-20 relative"
          >
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-ade-purple to-transparent opacity-50" />

            <h2 className="text-5xl md:text-7xl font-serif mb-6">Let&apos;s Create Magic</h2>
            <p className="text-gray-400 mb-12 text-lg max-w-xl mx-auto">
              Ready to elevate your brand&apos;s presence? 
              I&apos;m currently accepting partnerships for the upcoming season.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
              {[
                { label: "Instagram", icon: Instagram, count: "150K" },
                { label: "TikTok", icon: Play, count: "85K" },
                { label: "YouTube", icon: Youtube, count: "40K" },
                { label: "Twitter", icon: Twitter, count: "12K" },
              ].map((social, idx) => (
                <a key={idx} href="#" className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-white/5 hover:bg-ade-purple transition-all duration-300 group">
                  <social.icon className="text-gray-400 group-hover:text-white mb-2" />
                  <span className="font-bold text-lg">{social.count}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest group-hover:text-purple-200">{social.label}</span>
                </a>
              ))}
            </div>

            <div className="flex justify-center gap-4 flex-col md:flex-row">
               <a href="mailto:hello@adefikayo.com" className="inline-flex justify-center items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                 <Mail size={18} /> Send an Email
               </a>
               
            </div>
          </motion.div>

          <footer className="mt-20 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs uppercase tracking-widest border-t border-white/10 pt-8">
            <p>&copy; {new Date().getFullYear()} AdeFikayo. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}