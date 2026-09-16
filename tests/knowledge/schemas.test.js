import fs from 'fs/promises';
import path from 'path';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readSchema, listSchemas } from '../../src/knowledge/reader.js';

const SCHEMAS_DIR = path.join(process.cwd(), 'knowledge', 'schemas');

describe('Knowledge schemas presence', () => {
  it('schemas directory exists and contains expected files', async () => {
    const files = await fs.readdir(SCHEMAS_DIR);
    const expected = ['reference.schema.json','criteria.schema.json','parameter.schema.json'];
    for (const name of expected) {
      assert.ok(files.includes(name), `Missing schema file: ${name}`);
    }
  });

  it('reader can load reference schema and it contains required keys', async () => {
    const schema = await readSchema('reference');
    assert.equal(schema.title, 'Reference');
    assert.ok(schema.properties && schema.properties.referenceClass, 'referenceClass property missing');
  });

  it('listSchemas returns schema files', async () => {
    const files = await listSchemas();
    assert.ok(files.length >= 3, 'Expected at least 3 schema files');
  });
});
