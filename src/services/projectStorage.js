import { initialProjects } from '../data/projects.js';

const KEY = 'portfolio-projects-v1';
const VERSION = 3;
const personalProjects = initialProjects.filter(project => !project.isSample);
const sampleIds = new Set(initialProjects.filter(project => project.isSample).map(project => project.id));

function isProjectList(value) {
  return Array.isArray(value) && value.every(project =>
    project && typeof project.id === 'string' && typeof project.title === 'string' &&
    ['technologies', 'screenshots', 'features'].every(key =>
      Array.isArray(project[key]) && project[key].every(item => typeof item === 'string')
    )
  );
}

function migrateTechnologyList(projects) {
  return projects.map(project => ({
    ...project,
    technologies: project.technologies.filter(technology => technology.trim().toLowerCase() !== 'python')
  }));
}

function persistMigration(projects) {
  // The portfolio remains usable even when browser storage is full or disabled.
  try { saveProjects(projects); } catch { /* Return the migrated content without discarding edits. */ }
  return projects;
}

export function getProjects() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    if (value?.version === VERSION && isProjectList(value.projects)) {
      // A versioned save is authoritative, including intentional deletions.
      return value.projects;
    }
    if (value?.version === 2 && isProjectList(value.projects)) {
      // Earlier versioned saves retain their order and intentional deletions.
      return persistMigration(migrateTechnologyList(value.projects));
    }
    if (isProjectList(value)) {
      const savedIds = new Set(value.map(project => project.id));
      const additions = personalProjects.filter(project => !savedIds.has(project.id));
      const existing = value.map(project => sampleIds.has(project.id)
        ? { ...project, isSample: project.isSample ?? true }
        : project);
      const migrated = migrateTechnologyList([...additions, ...existing]);
      // Preserve all existing content and ordering. Only seed the new projects once.
      return persistMigration(migrated);
    }
    return initialProjects;
  } catch {
    return initialProjects;
  }
}

export function saveProjects(projects) {
  localStorage.setItem(KEY, JSON.stringify({ version: VERSION, projects }));
}

export function safeUrl(value){try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
export function readImage(file){return new Promise((resolve,reject)=>{if(!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type))return reject(new Error('Choose a PNG, JPEG, WebP, or GIF image.'));if(file.size>2*1024*1024)return reject(new Error('Please choose images smaller than 2 MB.'));const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Could not read the image.'));reader.readAsDataURL(file);});}
