import { access, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const htmlPath = path.join(projectRoot, 'index.html');
const cssPath = path.join(projectRoot, 'css/style.css');

const [html, css] = await Promise.all([
  readFile(htmlPath, 'utf8'),
  readFile(cssPath, 'utf8'),
]);

const references = new Set();
for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
  references.add(match[1]);
}
for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
  references.add(match[1]);
}

const localReferences = [...references]
  .filter((reference) => !/^(?:#|https?:|mailto:|tel:|data:)/i.test(reference))
  .map((reference) => reference.split(/[?#]/, 1)[0])
  .filter(Boolean);

const failures = [];
for (const reference of localReferences) {
  const normalized = reference.startsWith('/') ? reference.slice(1) : reference;
  const resolved = path.resolve(projectRoot, normalized);
  if (!resolved.startsWith(`${projectRoot}${path.sep}`)) {
    failures.push(`${reference}: resolves outside the repository`);
    continue;
  }
  try {
    await access(resolved);
    const file = await stat(resolved);
    if (!file.isFile()) failures.push(`${reference}: is not a file`);
    if (file.size === 0) failures.push(`${reference}: is empty`);
  } catch {
    failures.push(`${reference}: missing`);
  }
}

if (failures.length > 0) {
  console.error('Local asset validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${localReferences.length} local asset references.`);
}
