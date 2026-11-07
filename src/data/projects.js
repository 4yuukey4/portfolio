export const profile = { name: 'Yusuf Abdi Hassan', portrait: '/images/yusuf-abdi-hassan-cutout.png', email: 'yusuf.abduqadir3@gmail.com', github: 'https://github.com', linkedin: 'https://linkedin.com', intro: 'I build thoughtful digital experiences, from the first interaction to the last line of backend code.' };
export const featuredTechnologies = ['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'C#'];
export const skills = { Frontend: ['HTML', 'CSS', 'JavaScript', 'React'], Backend: ['PHP', 'C#'], Database: ['MySQL', 'SQLite'], Tools: ['Git', 'GitHub', 'VS Code', 'REST APIs'] };
export const initialProjects = [
 {
  id: 'opi', title: 'OPI – AI Desktop Assistant',
  subtitle: 'A local AI assistant for your desktop.',
  description: 'A local AI desktop assistant built with Electron and JavaScript, combining conversations, voice interaction, memory, and desktop automation.',
  details: 'OPI is a local AI desktop assistant built with Electron and JavaScript. It brings AI conversations and voice interaction to the desktop, with local memory and desktop automation. Its technology stack includes JavaScript, Electron, SQLite, and Ollama.',
  category: 'Desktop', technologies: ['JavaScript', 'Electron', 'SQLite', 'Ollama'],
  cover: '', screenshots: [], status: 'Not specified', date: '',
  features: ['AI conversations', 'Voice interaction', 'Local memory', 'Desktop automation'],
  github: '', demo: '', isSample: false
 },
 {
  id: 'novelreader', title: 'NovelReader',
  subtitle: 'Read novels. Listen to the next chapter.',
  description: 'An application for reading novels and listening to them as audiobooks, with chapter management and continuous playback.',
  details: 'NovelReader is an application for reading novels and listening to them as audiobooks. Chapter management organizes the reading experience, while continuous playback and text-to-speech integration support listening across chapters.',
  category: 'Reading', technologies: [],
  cover: '', screenshots: [], status: 'Not specified', date: '',
  features: ['Novel reading and audiobook listening', 'Chapter management', 'Continuous playback', 'Text-to-speech integration'],
  github: '', demo: '', isSample: false
 },
 {
  id: 'voicemaker', title: 'VoiceMaker',
  subtitle: 'Written words, brought to voice.',
  description: 'A text-to-speech application for converting written text into natural-sounding audio, designed for long-form content and different voices.',
  details: 'VoiceMaker converts written text into natural-sounding audio. The application is designed to support long-form content and different voices, making it possible to listen to longer pieces of writing.',
  category: 'Audio', technologies: [],
  cover: '', screenshots: [], status: 'Not specified', date: '',
  features: ['Text-to-speech conversion', 'Natural-sounding audio', 'Long-form content support', 'Different voices'],
  github: '', demo: '', isSample: false
 },
 {isSample:true,id:'workspace', title:'Atelier', subtitle:'A calmer way to get things done.', description:'A collaborative workspace that brings projects, tasks, and people together. Designed for focus, built for the everyday.', details:'An illustrative fullstack project exploring thoughtful task management. A flexible board helps teams organize their work, while a clear dashboard keeps priorities in view.', category:'Fullstack', technologies:['React','SQLite'], cover:'/images/workspace.svg', screenshots:['/images/workspace.svg'], status:'Completed', date:'2026-09-10', features:['Flexible project boards','Team workspace and task organization','Responsive dashboard'], github:'', demo:''},
 {isSample:true,id:'form-field',title:'Form & Field',subtitle:'Everyday objects. Considered design.',description:'A minimal commerce experience for a collection of thoughtfully made home essentials.',details:'An illustrative storefront focused on quiet typography, a simple catalog, and a clear path from product discovery to checkout.',category:'Frontend',technologies:['React','JavaScript','CSS'],cover:'/images/form.svg',screenshots:['/images/form.svg'],status:'Completed',date:'2026-08-18',features:['Product collection browsing','Responsive product presentation','Accessible shopping interface'],github:'',demo:''},
 {isSample:true,id:'finance',title:'Ledger',subtitle:'A clearer picture of your finances.',description:'A personal finance dashboard that makes tracking income, expenses, and everyday spending feel simple.',details:'An illustrative finance dashboard exploring readable data presentation and personal budgeting.',category:'Fullstack',technologies:['React','PHP','MySQL'],cover:'/images/finance.svg',screenshots:['/images/finance.svg'],status:'In progress',date:'2026-07-12',features:['Income and expense overview','Monthly cash flow visualization','Budget organization'],github:'',demo:''},
 {isSample:true,id:'notes',title:'Folio',subtitle:'A little space for good ideas.',description:'An editorial platform for stories, notes, and things worth sharing. Built around the reading experience.',details:'An illustrative publishing project with generous reading space and a simple editorial structure.',category:'Frontend',technologies:['React','JavaScript','CSS'],cover:'/images/notes.svg',screenshots:['/images/notes.svg'],status:'Completed',date:'2026-06-05',features:['Editorial article layouts','Journal collections','Responsive reading experience'],github:'',demo:''}
];
