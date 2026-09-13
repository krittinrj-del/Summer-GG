import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shouldShowDemoContent } from '../src/lib/content/demo.ts';

test('unconfigured Home is a complete demo unless explicitly disabled', () => {
  assert.equal(shouldShowDemoContent(undefined, false), true);
  assert.equal(shouldShowDemoContent('false', false), false);
});
test('explicit demo skips backend, configured production never silently becomes demo', () => {
  assert.equal(shouldShowDemoContent('true', true), true);
  assert.equal(shouldShowDemoContent(undefined, true), false);
  assert.equal(shouldShowDemoContent('false', true), false);
});
