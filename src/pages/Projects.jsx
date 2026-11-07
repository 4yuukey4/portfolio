import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ImagePlus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard, ProjectImage, ProjectResourceLink } from '../components/UI';

export function Projects({projects}) {
  const [category,setCategory] = useState('All projects');
  const [tech,setTech] = useState('All technologies');
  const filtered = projects.filter(p =>
    (category === 'All projects' || p.category === category) &&
    (tech === 'All technologies' || p.technologies.includes(tech))
  );
  return <section className="container page-section">
    <div className="eyebrow">THE PROJECT ARCHIVE</div>
    <h1>Ideas, made real.</h1>
    <p className="page-description">Personal projects exploring desktop AI, reading, and natural-sounding audio.<br/>Built with curiosity, presented with care.</p>
    <div className="filter-bar">
      <div className="filter-tabs">
        {['All projects',...new Set(projects.map(p=>p.category))].map(c => <button key={c} className={category===c?'selected':''} onClick={()=>setCategory(c)}>{c}</button>)}
      </div>
      <select aria-label="Filter by technology" value={tech} onChange={e=>setTech(e.target.value)}>
        {['All technologies',...new Set(projects.flatMap(p=>p.technologies))].map(t=><option key={t}>{t}</option>)}
      </select>
    </div>
    <div className="project-grid">{filtered.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div>
    {!filtered.length && <p className="empty">No projects match these filters.</p>}
  </section>;
}

export function ProjectDetails({projects}) {
  const {id} = useParams();
  const p = projects.find(p=>p.id===id);
  const [active,setActive] = useState(null);
  useEffect(() => setActive(null), [id]);
  if (!p) return <NotFound/>;
  const images = p.screenshots.filter(Boolean);
  const hasStatus = p.status && p.status !== 'Not specified';
  return <section className="container page-section details">
    <Link className="subtle-link" to="/projects"><ArrowLeft size={15}/> Back to projects</Link>
    <div className="detail-heading">
      <div>
        <div className="eyebrow">{p.category}{hasStatus ? ` / ${p.status}` : ''}{p.isSample ? ' / EXAMPLE PROJECT' : ''}</div>
        <h1>{p.title}</h1>
        <p className="page-description">{p.subtitle||p.description}</p>
      </div>
      <div className="detail-links">
        <ProjectResourceLink url={p.github} kind="github" className="button secondary"/>
        <ProjectResourceLink url={p.demo} kind="demo" className="button secondary"/>
      </div>
    </div>
    <ProjectImage className="detail-cover" src={p.cover} title={`${p.title} project screenshot`}/>
    <div className="detail-copy">
      <div>
        <h2>About the project</h2>
        <p>{p.details}</p>
        {!!p.features.length && <><h3>Key features</h3><ul>{p.features.map((f,i)=><li key={i}>{f}</li>)}</ul></>}
      </div>
      <aside>
        <div className="eyebrow">BUILT WITH</div>
        {p.technologies.length ? <div className="tags">{p.technologies.map(t=><span key={t}>{t}</span>)}</div> : <p className="missing-project-info">Technologies to be added.</p>}
        {!!p.date && <><div className="eyebrow">PROJECT DATE</div><p>{p.date}</p></>}
      </aside>
    </div>
    <h2>A closer look</h2>
    {images.length ? <div className="gallery">
      {images.map((s,i)=><button key={i} onClick={()=>setActive(i)} aria-label={`Enlarge screenshot ${i+1}`}><ProjectImage src={s} title={`${p.title} screenshot ${i+1}`} loading="lazy"/></button>)}
    </div> : <div className="gallery-empty">
      <ImagePlus size={24} strokeWidth={1.2} aria-hidden="true"/>
      <h3>No screenshots yet</h3>
      <p>Project screenshots will appear here when they are added.</p>
    </div>}
    {active!==null && images[active] && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project screenshot" onClick={()=>setActive(null)} onKeyDown={e=>{
      if(e.key==='Escape') setActive(null);
      if(e.key==='ArrowRight') setActive((active+1)%images.length);
      if(e.key==='ArrowLeft') setActive((active+images.length-1)%images.length);
    }}>
      <button autoFocus className="lightbox-close" aria-label="Close image" onClick={()=>setActive(null)}><X/></button>
      <button aria-label="Previous screenshot" onClick={e=>{e.stopPropagation();setActive((active+images.length-1)%images.length);}}><ChevronLeft/></button>
      <ProjectImage src={images[active]} title="Enlarged screenshot" onClick={e=>e.stopPropagation()}/>
      <button aria-label="Next screenshot" onClick={e=>{e.stopPropagation();setActive((active+1)%images.length);}}><ChevronRight/></button>
    </div>}
  </section>;
}

export function NotFound() {
  return <section className="container page-section not-found">
    <div className="eyebrow">404 — A SMALL DETOUR</div>
    <h1>Nothing here. Yet.</h1>
    <p>This page may have moved, or the project is no longer available.</p>
    <Link className="button primary" to="/">Back to home <ArrowUpRight size={16}/></Link>
  </section>;
}
