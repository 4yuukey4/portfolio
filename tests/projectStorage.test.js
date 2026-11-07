import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { initialProjects } from '../src/data/projects.js';
import { getProjects, saveProjects } from '../src/services/projectStorage.js';

const key = 'portfolio-projects-v1';
const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
afterEach(() => {
  if (originalDescriptor) Object.defineProperty(globalThis, 'localStorage', originalDescriptor);
  else delete globalThis.localStorage;
});
function storageWith(value) {
  let stored = value;
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: name => name === key ? stored : null, setItem: (name, next) => { assert.equal(name, key); stored = next; } }
  });
  return () => JSON.parse(stored);
}
const clone = project => structuredClone(project);

test('legacy migration adds personal projects and preserves saved edits, images, order, and sample deletions', () => {
  const sample = clone(initialProjects.find(project => project.id === 'notes'));
  sample.title = 'My edited journal';
  sample.screenshots = ['data:image/png;base64,my-upload'];
  const custom = { ...clone(sample), id: 'custom', title: 'Existing custom project' };
  const readStored = storageWith(JSON.stringify([custom, sample]));
  const projects = getProjects();
  assert.deepEqual(projects.map(project => project.id), ['opi', 'novelreader', 'voicemaker', 'custom', 'notes']);
  assert.equal(projects.at(-1).title, sample.title);
  assert.deepEqual(projects.at(-1).screenshots, sample.screenshots);
  assert.equal(projects.at(-1).isSample, true);
  assert.equal(readStored().version, 3);
  assert.deepEqual(getProjects(), projects);
});

test('legacy personal edits win and seeds are not duplicated', () => {
  const edited = { ...clone(initialProjects.find(project => project.id === 'opi')), description: 'My own description', github: 'https://github.com/me/real' };
  storageWith(JSON.stringify([edited]));
  const projects = getProjects();
  assert.equal(projects.filter(project => project.id === 'opi').length, 1);
  assert.deepEqual(projects.find(project => project.id === 'opi'), edited);
});

test('deleting a seeded project after migration survives reloads', () => {
  storageWith(JSON.stringify([]));
  const projects = getProjects().filter(project => project.id !== 'novelreader');
  saveProjects(projects);
  assert.deepEqual(getProjects().map(project => project.id), ['opi', 'voicemaker']);
  saveProjects([]);
  assert.deepEqual(getProjects(), []);
});

test('new or invalid storage falls back to the source catalog', () => {
  for (const value of [null, 'not json', JSON.stringify([null]), JSON.stringify({ version: 2, projects: 'invalid' })]) {
    storageWith(value);
    assert.deepEqual(getProjects(), initialProjects);
  }
});

test('unavailable storage does not prevent loading and write failures remain visible to callers', () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('Unavailable'); } });
  assert.deepEqual(getProjects(), initialProjects);
  assert.throws(() => saveProjects([]), /Unavailable/);
});

test('a failed migration write still returns legacy content plus new projects', () => {
  const sample = clone(initialProjects.find(project => project.id === 'workspace'));
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: () => JSON.stringify([sample]), setItem: () => { throw new Error('Quota exceeded'); }
  } });
  assert.deepEqual(getProjects().map(project => project.id), ['opi', 'novelreader', 'voicemaker', 'workspace']);
  assert.throws(() => saveProjects([]), /Quota exceeded/);
});

test('version 2 migration removes Python once and preserves project content and order', () => {
  const first = { ...clone(initialProjects[0]), technologies: ['JavaScript', 'Python', 'HTML', 'CSS', 'C#'], screenshots: ['data:image/png;base64,uploaded'] };
  const second = { ...clone(initialProjects[1]), technologies: ['python', 'SQLite', ' PYTHON '] };
  const readStored = storageWith(JSON.stringify({ version: 2, projects: [second, first] }));
  const expected = [
    { ...second, technologies: ['SQLite'] },
    { ...first, technologies: ['JavaScript', 'HTML', 'CSS', 'C#'] }
  ];
  assert.deepEqual(getProjects(), expected);
  assert.deepEqual(readStored(), { version: 3, projects: expected });
  assert.deepEqual(getProjects(), expected);
});

test('version 2 migration never resurrects deleted personal projects', () => {
  storageWith(JSON.stringify({ version: 2, projects: [clone(initialProjects.find(project => project.id === 'voicemaker'))] }));
  assert.deepEqual(getProjects().map(project => project.id), ['voicemaker']);
  storageWith(JSON.stringify({ version: 2, projects: [] }));
  assert.deepEqual(getProjects(), []);
});

test('version 3 saves respect explicit future technology edits', () => {
  const edited = { ...clone(initialProjects[0]), technologies: ['Python', 'JavaScript'] };
  storageWith(JSON.stringify({ version: 3, projects: [edited] }));
  assert.deepEqual(getProjects(), [edited]);
});

test('legacy technology migration removes Python from saved project lists', () => {
  const sample = { ...clone(initialProjects.find(project => project.id === 'workspace')), technologies: ['React', 'Python', 'SQLite'] };
  storageWith(JSON.stringify([sample]));
  assert.deepEqual(getProjects().find(project => project.id === sample.id).technologies, ['React', 'SQLite']);
});
