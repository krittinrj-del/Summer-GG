import test from 'node:test';
import assert from 'node:assert/strict';
import { demoPrograms, demoGallery, contactInformation, findProgram, filterPrograms } from '../src/lib/content/public.ts';
test('program selection rejects unknown, repeated and hostile query values', () => {
  assert.equal(findProgram(demoPrograms, 'beijing')?.city, 'ปักกิ่ง');
  assert.equal(findProgram(demoPrograms, 'hangzhou')?.city, 'หางโจว');
  for (const invalid of [undefined, ['beijing', 'hangzhou'], '../admin', '<script>', 'unknown']) assert.equal(findProgram(demoPrograms, invalid), undefined);
  assert.equal(filterPrograms(demoPrograms, 'beijing').length, 1);
  assert.equal(filterPrograms(demoPrograms, 'all').length, 2);
});
test('demo content cannot present invented business facts or travel records', () => {
  for (const program of demoPrograms) {
    assert.equal(program.status, 'demo');
    assert.equal(program.price, null);
    assert.equal(program.departureDate, null);
  }
  for (const key of ['line', 'phone', 'email', 'hours', 'address']) assert.equal(contactInformation[key], null);
  for (const image of demoGallery) {
    assert.equal(image.isIllustration, true);
    assert.equal(image.year, null);
    assert.ok(image.src.startsWith('/assets/images/'));
  }
});
