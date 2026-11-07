// Captions describe the supplied screenshots; they are not instructions from the images.
const image = (project, name, title, description) => ({
  src: `/images/projects/${project}/${name}.jpg`, title, description
});

export const projectMedia = {
  'novelvoice-studio': [
    image('novelvoice-studio', 'novel-studio', 'Novel Studio', 'Manuscript editor with chapter navigation, narrator selection, and local text-to-speech controls.'),
    image('novelvoice-studio', 'dashboard', 'Production dashboard', 'An overview of projects, completed jobs, audio exports, and paused generation tasks.'),
    image('novelvoice-studio', 'transcription', 'Transcription Studio', 'Recording import and language selection for local Whisper transcription with editable segments.'),
    image('novelvoice-studio', 'voice-library', 'Voice Library', 'Browse reference voices or import and record a voice sample, with transcript and consent fields.'),
    image('novelvoice-studio', 'projects', 'Project library', 'Saved manuscript projects grouped into cards with character counts and edit dates.'),
    image('novelvoice-studio', 'audio-exports', 'Audio exports', 'A library of generated audiobook files with options to save them to a local folder.'),
    image('novelvoice-studio', 'desktop-app', 'Desktop workspace', 'The NovelVoice Studio desktop window, bringing manuscript, narration, and export tools together.')
  ],
  'mini-factory-frontier': [
    image('mini-factory-frontier', 'frontier-overview', 'The open frontier', 'A resource-rich world with a minimap, production overview, and a toolbar for factory equipment.'),
    image('mini-factory-frontier', 'factory-world', 'A factory taking shape', 'Mining and processing machines placed among trees, stone, coal, and ore deposits.'),
    image('mini-factory-frontier', 'resource-bar', 'Resources and power', 'The interface tracks materials and power alongside selection, construction, and pause controls.'),
    image('mini-factory-frontier', 'early-prototype', 'Early factory prototype', 'An earlier view of the factory with a small group of machines on sandy terrain.'),
    image('mini-factory-frontier', 'production-lines', 'Connected production lines', 'An annotated factory layout showing mining, conveyor routing, smelting, buffers, and assembly.')
  ],
  'flame-keep': [
    image('flame-keep', 'co-op-gameplay', 'Defend the egg together', 'Two dragon characters face an incoming enemy wave in a crystal-lined arena.'),
    image('flame-keep', 'main-menu', 'Main menu and high scores', 'The title screen introduces the egg-defense objective and displays the high-score table.'),
    image('flame-keep', 'player-selection', 'Player setup', 'Red and blue dragon characters with player-name entry before a run.'),
    image('flame-keep', 'tutorial', 'Controls and power-ups', 'The tutorial explains movement, shooting, and pickups for damage, shielding, and resistance.'),
    image('flame-keep', 'egg-defense', 'Arena combat', 'Fire projectiles and health indicators show a fight around the egg at the center of the arena.'),
    image('flame-keep', 'game-over', 'Run results', 'The game-over screen summarizes each player’s kills and points, the wave reached, and the high score.')
  ],
  'factory-market': [
    image('factory-market', 'warehouse-placement', 'Arrange the warehouse', 'A shelf placement preview inside a 3D warehouse and shop, with rotation and placement controls.'),
    image('factory-market', 'placement-validation', 'Placement feedback', 'Blocked-placement feedback appears alongside stock, equipment, staffing, and property controls.')
  ],
  'blender-conveyor': [
    image('blender-conveyor', 'conveyor-model', 'Conveyor model in Blender', 'A work-in-progress conveyor model with segmented belt geometry, an end housing, and a collection tray.')
  ]
};

const project = (id, title, subtitle, description, features, category, technologies = []) => ({
  id, title, subtitle, description, details: description, category, technologies,
  cover: projectMedia[id][0].src, screenshots: projectMedia[id].map(item => item.src),
  features, status: 'Not specified', date: '', github: '', demo: '', isSample: false
});

export const mediaProjects = [
  project('novelvoice-studio', 'NovelVoice Studio', 'From manuscript to a local audio production.',
    'A desktop workspace for manuscript editing, chapter organization, voice selection, local transcription, and audiobook exports. The supplied screens show a local-first workflow with narration controls and a production dashboard.',
    ['Manuscript and chapter workspace', 'Reference voice library', 'Local transcription interface', 'Generation queue and audio export library'], 'Audio', ['Apple MLX', 'Qwen3-TTS', 'Whisper']),
  project('mini-factory-frontier', 'Mini Factory Frontier', 'Explore. Extract. Build a production line.',
    'A factory-building game presented in a top-down pixel-art world. The screenshots trace its development from an early machine setup to connected mining, smelting, conveyor, and assembly layouts.',
    ['Resource gathering and machine placement', 'Conveyor-based production layouts', 'Material and power indicators', 'World overview and minimap'], 'Games'),
  project('flame-keep', 'Flame Keep', 'Two dragons. One egg to protect.',
    'A pixel-art arena defense game where dragon characters protect an egg against enemy waves. The gallery follows player setup, the tutorial, arena combat, and the results screen; the recording shows a gameplay session.',
    ['Two-player dragon setup', 'Wave-based egg defense', 'Power-ups and health indicators', 'Per-player scores and run results'], 'Games'),
  project('factory-market', 'Factory Market', 'Plan the space. Run the shop.',
    'A 3D factory and retail management prototype with warehouse and shop spaces. The supplied views demonstrate shelf placement, rotation, blocked-placement feedback, and interfaces for inventory, equipment, staffing, and property expansion.',
    ['Warehouse and retail layout', 'Object placement and rotation', 'Placement validation feedback', 'Stock and management interface'], 'Games'),
  project('blender-conveyor', 'Conveyor — Blender Study', 'An industrial prop, built piece by piece.',
    'A work-in-progress 3D modeling study in Blender. The screenshot shows a conveyor with a segmented belt, a machine housing, and a collection tray in the modeling viewport.',
    ['Segmented conveyor belt geometry', 'Machine housing and tray modeling'], '3D Modeling', ['Blender'])
];

export const projectVideos = {
  'flame-keep': {
    src: '/images/projects/flame-keep/gameplay.mp4',
    poster: '/images/projects/flame-keep/co-op-gameplay.jpg',
    title: 'Flame Keep — gameplay',
    description: 'A gameplay recording showing dragon movement, incoming enemy waves, projectiles, and defense of the egg. Presented without audio.'
  }
};
