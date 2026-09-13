import { test } from 'node:test';
import assert from 'node:assert/strict';
import { can, isRole } from '../src/lib/auth/roles.ts';
test('unknown and unauthenticated roles fail closed', () => {
  for (const role of [null, undefined, '', 'superadmin', { role: 'admin' }]) {
    assert.equal(isRole(role), false);
    for (const permission of ['read','editContent','manageSettings','manageRoles']) assert.equal(can(role, permission), false);
  }
});
test('viewer is read-only, staff cannot manage roles/settings', () => {
  assert.equal(can('viewer', 'read'), true);
  assert.equal(can('viewer', 'editContent'), false);
  assert.equal(can('staff', 'editContent'), true);
  assert.equal(can('staff', 'manageSettings'), false);
  assert.equal(can('staff', 'manageRoles'), false);
  assert.equal(can('admin', 'manageSettings'), true);
  assert.equal(can('admin', 'manageRoles'), true);
});
