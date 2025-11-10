import React, { useEffect, useState, useRef } from 'react';
import SplitText from './SplitText';
import './App.css';
import './Particles.css';
import Particles from './Particles';
import PillNav from './PillNav';
import emailjs from '@emailjs/browser';

const App = () => {
  <title>Ahmed Portfolio</title>

  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeSection, setActiveSection] = useState('#');

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const whoamiRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const isMobile = window.innerWidth < 768;

  // Fade scroll indicator
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxFade = 200;
      setScrollOpacity(Math.max(0, 1 - scrollTop / maxFade));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      const whoamiTop = whoamiRef.current?.offsetTop || 0;
      const projectsTop = projectsRef.current?.offsetTop || 0;
      const contactTop = contactRef.current?.offsetTop || 0;

      if (scrollY < whoamiTop) setActiveSection('#');
      else if (scrollY >= whoamiTop && scrollY < projectsTop) setActiveSection('#');
      else if (scrollY >= projectsTop && scrollY < contactTop) setActiveSection('#projects');
      else setActiveSection('#contact');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnimationComplete = () => setHasAnimated(true);

  const handleNavClick = (href) => {
    const element =
      href === '#whoami'
        ? whoamiRef.current
        : href === '#projects'
          ? projectsRef.current
          : href === '#contact'
            ? contactRef.current
            : document.body;
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // EmailJS credentials
    const SERVICE_ID = 'service_ymx1jcj';
    const TEMPLATE_ID = 'template_q2k0zio';
    const PUBLIC_KEY = '-knxViBd711ap3uw1';

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((err) => {
        console.error(err);
        alert('Oops! Something went wrong, try again.');
      });
  };

  return (
    <div className="App" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'black' }}>
      {/* Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999, pointerEvents: 'auto' }}>
        <PillNav
          items={[
            { label: 'Home', href: '#' },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#contact' },
          ]}
          activeHref={activeSection}
          onItemClick={handleNavClick}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffffff"
          pillTextColor="#000000"
        />
      </div>

      {/* Background Particles */}
      <div
        className="particles-container"
        style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: 'black', width: '100%', height: '100%', pointerEvents: isMobile ? 'none' : 'auto' }}
      >
        <Particles
          particleColors={['#ffd700', '#ffae00', '#ffffff']}
          particleCount={2000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={!isMobile}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Hero Section */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', placeContent: 'center', height: '100vh', pointerEvents: 'none', color: 'white' }}>
        <SplitText
          text="Hello, I'm Ahmed!"
          className="font-extrabold text-center"
          style={{ fontSize: '7rem' }}
          delay={hasAnimated ? 0 : 200}
          duration={hasAnimated ? 0 : 1.0}
          ease="power3.out"
          splitType="chars"
          from={hasAnimated ? {} : { opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          tag="h1"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '1rem', textAlign: 'center', opacity: scrollOpacity, transition: 'opacity 0.3s ease-out', pointerEvents: 'none' }}>
          <span style={{ display: 'block', marginBottom: '5px' }}>Scroll Down</span>
          <span style={{ fontSize: '2rem', display: 'block', animation: 'bounce 1.5s infinite' }}>↓</span>
        </div>
      </div>

      {/* Who Am I Section */}
      <div id="whoami" ref={whoamiRef} style={{ position: 'relative', zIndex: 1, color: 'white', padding: '60px 5vw', textAlign: 'center', pointerEvents: 'none', minHeight: '80vh' }}>
        <div style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '15px', display: 'inline-block' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Who Am I?</h2>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '950px', margin: '0 auto' }}>
            A computer science engineer passionate about intelligent systems, data streams, and innovation. I explore the intersection of algorithms and real-world challenges from adaptive learning to creative problem-solving. Driven by curiosity and purpose, I believe that knowledge means nothing unless it’s shared.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" ref={projectsRef} style={{ position: 'relative', zIndex: 1, color: 'white', padding: '60px 5vw', textAlign: 'center', pointerEvents: 'none', minHeight: '80vh' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '40px' }}>My Projects</h2>
        <div style={{  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', justifyContent: 'center' }}>
          {[
            { title: 'Adaptive Random Forest Drift Detection', desc: 'An advanced streaming classifier with hybrid PUDD + ADWIN drift detection', link: 'https://github.com/ghazelahmed/AdaptiveRandomForest-PUDD' },
            { title: 'Clothing Store E-commerce Website', desc: 'Full e-commerce front-end with product management, filters, and checkout.', link: 'https://github.com/ghazelahmed/ecommerce-store' },
            { title: 'New Project (Coming Soon)', desc: 'coming soon', link: '#' },
            { title: 'New Project (Coming Soon)', desc: 'coming soon', link: '#' },

          ].map((project, i) => (
            <div
              key={i}
              style={{ pointerEvents: 'auto',backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '25px', borderRadius: '15px', transition: 'transform 0.3s ease, background-color 0.3s ease', cursor: project.link !== '#' ? 'pointer' : 'default' }}
              onClick={() => project.link !== '#' && window.open(project.link, '_blank')}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; }}
            >
              <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>{project.title}</h3>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>{project.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
<div
  id="contact"
  ref={contactRef}
  style={{
    position: 'relative',
    zIndex: 1,
    color: 'white',
    padding: '60px 5vw',
    textAlign: 'center',
    minHeight: '60vh',
    backgroundColor: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(6px)',
  }}
>
  <h2 style={{ fontWeight: 'bold', marginBottom: '30px' }}>Get in Touch</h2>

  {/* Contact Form */}
  <form
    onSubmit={async (e) => {
      e.preventDefault();

      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      const formData = {
        from_name: e.target.name.value,
        from_email: e.target.email.value,
        message: e.target.message.value,
      };

      try {
        await emailjs.send(serviceID, templateID, formData, publicKey);
        alert('Message sent successfully!');
        // Clear the form
        e.target.name.value = '';
        e.target.email.value = '';
        e.target.message.value = '';
      } catch (err) {
        console.error(err);
        alert('Oops! Something went wrong. Please try again.');
      }
    }}
    style={{
      maxWidth: '600px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      textAlign: 'left',
    }}
  >
    <label style={{ fontSize: '1.1rem' }}>
      Name:
      <input
        type="text"
        name="name"
        required
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '5px',
          borderRadius: '8px',
          border: 'none',
          outline: 'none',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'white',
        }}
      />
    </label>

    <label style={{ fontSize: '1.1rem' }}>
      Email:
      <input
        type="email"
        name="email"
        required
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '5px',
          borderRadius: '8px',
          border: 'none',
          outline: 'none',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'white',
        }}
      />
    </label>

    <label style={{ fontSize: '1.1rem' }}>
      Message:
      <textarea
        name="message"
        required
        rows="5"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '5px',
          borderRadius: '8px',
          border: 'none',
          outline: 'none',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'white',
          resize: 'none',
        }}
      ></textarea>
    </label>

    <button
      type="submit"
      style={{
        alignSelf: 'center',
        padding: '10px 25px',
        backgroundColor: '#ffd700',
        color: '#000',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#ffae00';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ffd700';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      Submit
    </button>
  </form>

  {/* Social Icons */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '35px',
      marginTop: '40px',
      fontSize: '2rem',
    }}
  >
    <a
      href="https://github.com/ghazelahmed"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#ffd700', transition: 'color 0.3s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#ffae00')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#ffd700')}
    >
      <i className="fab fa-github"></i>
    </a>

    <a
      href="https://www.linkedin.com/in/ahmed-ghazel-assouad"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#ffd700', transition: 'color 0.3s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#ffae00')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#ffd700')}
    >
      <i className="fab fa-linkedin"></i>
    </a>

    <a
      href="mailto:ghazelahmed7@gmail.com"
      style={{ color: '#ffd700', transition: 'color 0.3s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#ffae00')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#ffd700')}
    >
      <i className="fas fa-envelope"></i>
    </a>
  </div>
</div>


      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(8px); }
          60% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};

export default App;
