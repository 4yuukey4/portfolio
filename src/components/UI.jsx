import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Github, ImagePlus, Menu, X, Sun, Moon } from 'lucide-react';
import { profile } from '../data/projects';
import { safeUrl } from '../services/projectStorage';
import '../styles/projects.css';
export function ExternalLink({url,children,...props}){const href=safeUrl(url);return href?<a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>:null;}
export function Navbar(){const[open,setOpen]=useState(false);const[dark,setDark]=useState(false);return <header className="site-header"><nav className="container nav" aria-label="Main navigation"><Link to="/" className="wordmark">{profile.name}<span>.</span></Link><div className={`nav-links ${open?'is-open':''}`} onClick={()=>setOpen(false)}><NavLink to="/" end>Home</NavLink><NavLink to="/projects">Projects</NavLink><Link to="/#about">About</Link><Link to="/#contact">Contact</Link></div><div className="nav-actions"><button className="icon-button theme-toggle" aria-label={dark?'Use light theme':'Use dark theme'} onClick={()=>{document.documentElement.dataset.theme=dark?'light':'dark';setDark(!dark);}}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button><a className="nav-contact" href={`mailto:${profile.email}`}>Let’s talk <ArrowUpRight size={15}/></a><button className="icon-button mobile-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></nav></header>}
export function Footer(){return <footer className="container footer"><div><Link className="wordmark" to="/">{profile.name}.</Link><p>Thoughtfully designed. Carefully built.</p></div><div className="footer-right"><div><ExternalLink url={profile.github}>GitHub <ArrowUpRight size={13}/></ExternalLink><ExternalLink url={profile.linkedin}>LinkedIn <ArrowUpRight size={13}/></ExternalLink>{import.meta.env.DEV&&<Link to="/admin">Project editor</Link>}</div><p>© {new Date().getFullYear()} {profile.name}</p></div></footer>}
export function ProjectImage({src, title, className = '', ...rest}) {
  const [failedSrc, setFailedSrc] = useState(null);
  if (!src || failedSrc === src) {
    return <span className={`project-placeholder ${className}`} role="img" aria-label={`${title}: screenshot placeholder`} onClick={rest.onClick}>
      <ImagePlus size={28} strokeWidth={1.2} aria-hidden="true"/>
      <strong>Screenshot placeholder</strong>
      <span>Images will be added here.</span>
    </span>;
  }
  return <img src={src} alt={title} className={className} {...rest} onError={() => setFailedSrc(src)}/>;
}

export function ProjectResourceLink({url, kind, className = ''}) {
  const isGithub = kind === 'github';
  if (!safeUrl(url)) {
    return <span className={`pending-link ${className}`} aria-disabled="true">
      {isGithub ? <Github size={14}/> : <ArrowUpRight size={14}/>}
      {isGithub ? 'GitHub coming soon' : 'Demo coming soon'}
    </span>;
  }
  return <ExternalLink url={url} className={className}>
    {isGithub ? <Github size={14}/> : <ArrowUpRight size={14}/>}
    {isGithub ? 'GitHub' : 'Live demo'}
  </ExternalLink>;
}

export function ProjectCard({project,index}) {
  return <article className="project-card">
    <Link to={`/projects/${project.id}`} className="project-image" aria-label={`View ${project.title} project`}>
      <ProjectImage src={project.cover} title={`${project.title} screenshot`} loading="lazy"/>
      <span className="image-open" aria-hidden="true"><ArrowUpRight size={21}/></span>
    </Link>
    <div className="project-heading">
      <Link to={`/projects/${project.id}`}><h3>{project.title}</h3></Link>
      <span className="project-number">{String(index+1).padStart(2, '0')} / {project.category}</span>
    </div>
    {project.isSample && <span className="sample-project-label">Example project</span>}
    <p>{project.description}</p>
    <div className="tags">
      {project.technologies.length ? project.technologies.map(t=><span key={t}>{t}</span>) : <span className="unspecified-tech">Technologies to be added</span>}
    </div>
    <div className="project-links">
      <Link to={`/projects/${project.id}`}>View project <ArrowRight size={14}/></Link>
      <ProjectResourceLink url={project.github} kind="github"/>
      <ProjectResourceLink url={project.demo} kind="demo"/>
    </div>
  </article>;
}
