import fs from 'fs/promises';
import path from 'path';

const SCHEMAS_DIR = path.join(process.cwd(), 'knowledge', 'schemas');

export async function readSchema(name) {
  const p = path.join(SCHEMAS_DIR, name + '.schema.json');
  const raw = await fs.readFile(p, 'utf8');
  return JSON.parse(raw);
}

export async function listSchemas() {
  const files = await fs.readdir(SCHEMAS_DIR);
  return files.filter(f => f.endsWith('.schema.json'));
}

// Reader is read-only and unused by CORE until integrated.
