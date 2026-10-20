import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { resume, resumeFile } from "./content";
import { assetUrl } from "./assetUrl";
import { photography } from "./data/photography";
import { videos } from "./data/videos";
import type { VideoProject } from "./data/videos";
import "./styles.css";

function createYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&playsinline=1`;
}

function createYouTubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuToggleRef = React.useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = React.useState("home");
  const [photoIndex, setPhotoIndex] = React.useState<number | null>(null);
  const [photoCategory, setPhotoCategory] = React.useState("All");
  const [failedPhotos, setFailedPhotos] = React.useState<Set<string>>(() => new Set());
  const [selectedVideo, setSelectedVideo] = React.useState<VideoProject | null>(null);
  const touchStartX = React.useRef<number | null>(null);
  const photoCategories = ["All", ...Array.from(new Set(photography.map((photo) => photo.category)))];
  const visiblePhotos = photography.map((photo, index) => ({ photo, index })).filter(({ photo }) => photoCategory === "All" || photo.category === photoCategory);
  const activePhoto = photoIndex === null ? null : visiblePhotos.findIndex(({ index }) => index === photoIndex);
  React.useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    }), { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    return () => { observer.disconnect(); revealObserver.disconnect(); };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  React.useEffect(() => {
    if (photoIndex === null) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".lightbox-close")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhotoIndex(null);
      if (event.key === "ArrowRight") setPhotoIndex((current) => { const i = visiblePhotos.findIndex(({ index }) => index === current); return visiblePhotos[(i + 1) % visiblePhotos.length]?.index ?? current; });
      if (event.key === "ArrowLeft") setPhotoIndex((current) => { const i = visiblePhotos.findIndex(({ index }) => index === current); return visiblePhotos[(i - 1 + visiblePhotos.length) % visiblePhotos.length]?.index ?? current; });
      if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll<HTMLButtonElement>(".lightbox button"));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.documentElement.style.overflow = previousOverflow; if (photoIndex !== null) previouslyFocused?.focus(); };
  }, [photoIndex !== null, photoCategory]);
  React.useEffect(() => {
    if (!selectedVideo) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".video-modal-close")?.focus());
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closeVideo(); };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.documentElement.style.overflow = previousOverflow; previouslyFocused?.focus(); };
  }, [selectedVideo]);
  const closeVideo = () => {
    setSelectedVideo(null);
  };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <button ref={menuToggleRef} type="button" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span className="menu-line" aria-hidden="true"/><span className="menu-line" aria-hidden="true"/><span className="menu-line" aria-hidden="true"/>
      </button>
      <nav id="main-navigation" className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
        {[ ["about", "About"], ["photography", "Photography"], ["films", "Video Projects"], ["skills", "Skills"], ["contact", "Contact"] ].map(([id, label]) => <a key={id} className={activeSection === id ? "active" : ""} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        <a className="nav-resume" href={assetUrl(resumeFile)} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={14} /></a>
        <a className="nav-resume-download" href={assetUrl(resumeFile)} download="Reuben-John-Ranjit-Resume.pdf">Download PDF <Download size={13} /></a>
      </nav>
    </header>
    <main id="main">
      <section className="hero section-wrap" id="home">
        <div className="hero-meta"><span>EDITOR · COLLEGE MEDIA · CLIENT WORK</span><span>VIDEO · PHOTO · EDIT</span></div>
        <p className="eyebrow hero-kicker"><span className="status-dot" /> VISUAL STORIES, MADE WITH INTENTION</p>
        <h1>Stories made<br /><span>to <em>stay.</em></span></h1>
        <div className="hero-bottom"><p className="hero-copy">I’m {resume.firstName}, an editor and visual storyteller shaping thoughtful films and social content.</p><figure className="hero-photo"><img src={assetUrl(resume.assets.hero)} alt="Reuben John Ranjit in a candid portrait from his resume" fetchPriority="high" /><figcaption><span>REUBEN JOHN RANJIT</span><span>VISUAL STORYTELLER</span></figcaption></figure><a href="#photography" className="circle-link" aria-label="Explore my photography"><ArrowDownRight /></a></div>
        <div className="hero-rule"><span>SCROLL TO EXPLORE</span><ArrowDown size={13} /><span>01 / 05</span></div>
      </section>

      <section className="about section-wrap" id="about">
        <div className="section-heading reveal"><span className="eyebrow">01 — A LITTLE ABOUT ME</span><span className="section-index">THE PERSON BEHIND THE FRAME</span></div>
        <div className="about-grid">
          <h2 className="display-heading reveal">Creative thinking.<br /><span>Intentional editing.</span></h2>
          <div className="about-text reveal"><p>{resume.intro}</p><p>I specialise in crafting on-screen visual narratives that capture attention and connect with an audience.</p><a className="text-link" href={`mailto:${resume.email}`}>Start a conversation <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="discipline-strip reveal">{resume.disciplines.map((item, i) => <span key={item}><small>0{i + 1}</small>{item}</span>)}</div>
        <div className="experience-strip reveal"><div><span className="eyebrow">EXPERIENCE</span><p>Creative work built with teams and clients.</p></div>{resume.experience.map((item, i) => <div className="experience-item" key={item.title}><span className="service-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div>
      </section>

      <section className="work section-wrap photography-section" id="photography">
        <div className="section-heading reveal"><span className="eyebrow">02 — PHOTOGRAPHY</span><span className="section-index">MOMENTS, IN THEIR OWN LIGHT</span></div>
        <div className="work-intro reveal"><h2 className="display-heading">A way of<br /><span>paying attention.</span></h2><p>Live events, travel, and the quiet details in between. Photographs from the shared portfolio archive.</p></div>
        <div className="photo-filters" role="group" aria-label="Filter photographs by category">{photoCategories.map((category) => <button key={category} className={photoCategory === category ? "photo-filter active" : "photo-filter"} aria-pressed={photoCategory === category} onClick={() => { setPhotoIndex(null); setPhotoCategory(category); }}>{category}<span>{category === "All" ? photography.length : photography.filter((photo) => photo.category === category).length}</span></button>)}</div>
        <div className="photo-grid" key={photoCategory} aria-label={`Photography gallery, ${visiblePhotos.length} photographs`}>{visiblePhotos.map(({ photo, index }, visibleIndex) => <button className="photo-item photo-enter" key={photo.src} style={{ animationDelay: `${Math.min(visibleIndex, 8) * 35}ms` }} onClick={() => !failedPhotos.has(photo.src) && setPhotoIndex(index)} aria-label={failedPhotos.has(photo.src) ? `Photograph unavailable: ${photo.alt}` : `View photograph ${index + 1}: ${photo.alt}`} aria-disabled={failedPhotos.has(photo.src)}><img className={photo.width < 400 ? "photo-source-limited" : undefined} style={photo.width < 400 ? { maxWidth: `${photo.width / window.devicePixelRatio}px` } : undefined} src={assetUrl(photo.src)} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" onError={() => setFailedPhotos((current) => new Set(current).add(photo.src))}/>{failedPhotos.has(photo.src) && <span className="photo-unavailable">Image unavailable</span>}<span className="photo-caption"><span>{photo.category}</span><span>{String(index + 1).padStart(2, "0")} / {String(photography.length).padStart(2, "0")}</span></span></button>)}</div>
        <p className="project-note"><span className="status-dot" /> {visiblePhotos.length} {photoCategory === "All" ? "original photographs" : `${photoCategory.toLowerCase()} photographs`} · Select an image to view it larger.</p>
      </section>

      <section className="work section-wrap films-section" id="films">
        <span id="work" className="section-anchor" aria-hidden="true" />
        <div className="section-heading reveal"><span className="eyebrow">03 — VIDEO PROJECTS</span><span className="section-index">SELECTED FILMS & COLLABORATIONS</span></div>
        <div className="work-intro film-intro reveal"><h2 className="display-heading">Stories in<br /><span>motion.</span></h2><p>A small screening room for films made with an idea, an audience and a reason to move.</p></div>
        <div className="film-grid">{videos.map((project, index) => <article className={`film-card film-${index + 1} reveal`} key={project.title}>
          <button type="button" className="film-poster drive-poster" style={{ aspectRatio: `${project.dimensions.width} / ${project.dimensions.height}` }} onClick={() => setSelectedVideo(project)} aria-label={`Preview ${project.title} in the embedded YouTube player`}><img className="film-poster-image" src={assetUrl(project.poster)} alt={`Designed typographic poster for ${project.title}; not a film still`} loading="lazy" decoding="async"/><span className="film-play" aria-hidden="true">▶</span><span className="film-open-label">Preview film</span><span className="visual-caption">{project.type.toUpperCase()} <span>— ORIGINAL VIDEO</span></span></button>
          <div className="project-info"><div><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p></div><a className="project-arrow" href={createYouTubeWatchUrl(project.videoId)} target="_blank" rel="noopener noreferrer" aria-label={`${project.sourceLabel}: ${project.title}`}><ArrowUpRight size={20}/></a></div>
          <a className="text-link" href={createYouTubeWatchUrl(project.videoId)} target="_blank" rel="noopener noreferrer">{project.sourceLabel} <ArrowUpRight size={15}/></a>
        </article>)}</div>
      </section>

      {photoIndex !== null && activePhoto !== null && activePhoto >= 0 && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photograph viewer" onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX; if (end !== undefined && touchStartX.current !== null && Math.abs(end - touchStartX.current) > 48) setPhotoIndex(visiblePhotos[(activePhoto + (end < touchStartX.current ? 1 : -1) + visiblePhotos.length) % visiblePhotos.length].index); touchStartX.current = null; }} onMouseDown={(event) => { if (event.target === event.currentTarget) setPhotoIndex(null); }}><button className="lightbox-close" onClick={() => setPhotoIndex(null)} aria-label="Close photograph viewer">×</button><button className="lightbox-arrow lightbox-prev" onClick={() => setPhotoIndex(visiblePhotos[(activePhoto - 1 + visiblePhotos.length) % visiblePhotos.length].index)} aria-label="Previous photograph">←</button><figure><img className={photography[photoIndex].width < 400 ? "photo-source-limited" : undefined} style={photography[photoIndex].width < 400 ? { maxWidth: `${photography[photoIndex].width / window.devicePixelRatio}px` } : undefined} src={assetUrl(photography[photoIndex].src)} alt={photography[photoIndex].alt} width={photography[photoIndex].width} height={photography[photoIndex].height}/><figcaption>{photography[photoIndex].category} · {String(activePhoto + 1).padStart(2,"0")} / {String(visiblePhotos.length).padStart(2,"0")}</figcaption></figure><button className="lightbox-arrow lightbox-next" onClick={() => setPhotoIndex(visiblePhotos[(activePhoto + 1) % visiblePhotos.length].index)} aria-label="Next photograph">→</button></div>}
      {selectedVideo && <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${selectedVideo.title} video player`} onMouseDown={(event) => { if (event.target === event.currentTarget) closeVideo(); }}><button className="video-modal-close" onClick={closeVideo} aria-label="Close video player">×</button><div className="video-modal-content"><iframe style={{ aspectRatio: `${selectedVideo.dimensions.width} / ${selectedVideo.dimensions.height}` }} title={`${selectedVideo.title} video player`} src={createYouTubeEmbedUrl(selectedVideo.videoId)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/><div><span className="project-type">{selectedVideo.type} · {selectedVideo.clientOrContext}</span><h2>{selectedVideo.title}</h2><p>{selectedVideo.description}</p><a className="text-link" href={createYouTubeWatchUrl(selectedVideo.videoId)} target="_blank" rel="noopener noreferrer">Open on YouTube <ArrowUpRight size={15}/></a></div></div></div>}

      <section className="services section-wrap" id="skills">
        <div className="section-heading reveal"><span className="eyebrow">04 — WHAT I BRING</span><span className="section-index">CRAFT & CAPABILITIES</span></div>
        <div className="services-grid"><div><h2 className="display-heading reveal">The craft<br /><span>behind the cut.</span></h2><p className="services-note reveal">A thoughtful process from first idea to final delivery.</p></div><div className="service-list">{resume.services.map((service, i) => <div className="service-row reveal" key={service.title}><span className="service-number">0{i + 1}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><ArrowUpRight className="service-icon" size={17} /></div>)}</div></div>
        <div className="approach" id="approach"><div className="approach-title"><span className="eyebrow">MY WORKFLOW</span><p>From first conversation<br />to final frame.</p></div><div className="steps">{resume.workflow.map((step, i) => <div className="step reveal" key={step.title}><span>0{i + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></div>)}</div></div>
      </section>

      <section className="contact section-wrap" id="contact"><div className="section-heading reveal"><span className="eyebrow">05 — YOUR TURN</span><span className="section-index">LET’S MAKE SOMETHING MATTER</span></div><div className="contact-main reveal"><div className="contact-copy"><p className="eyebrow">HAVE A STORY IN MIND?</p><h2>Let’s make<br /><em>it memorable.</em></h2><div className="contact-details"><div className="contact-item"><span className="eyebrow">EMAIL</span><a className="contact-email" href={`mailto:${resume.email}`}>{resume.email}<ArrowUpRight size={18} /></a></div><div className="contact-item"><span className="eyebrow">TEL NO.</span><a className="contact-email" href={`tel:${resume.phoneHref}`}>{resume.phone}<ArrowUpRight size={18} /></a></div><div className="contact-item"><span className="eyebrow">ADDRESS</span><span className="contact-location">{resume.location}</span></div></div></div></div><div className="contact-footer"><p>Got a vision that needs shaping?<br />Let’s turn it into a story people feel.</p><a href={`mailto:${resume.email}`} className="contact-button">GET IN TOUCH <ArrowUpRight size={17} /></a></div></section>
    </main>
    <footer className="site-footer"><span>CREATING STORIES THAT STICK</span><span>© {new Date().getFullYear()} REUBEN RANJIT</span></footer>
  </>;
}

const root = createRoot(document.getElementById("root")!);
root.render(<React.StrictMode><App /></React.StrictMode>);
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount());
