import assert from 'node:assert/strict';
import test from 'node:test';
import gateway from './_worker.js';

const host = 'blueprint-patterns.pages.dev';
const url = `https://${host}`;

function assertClosed(response, status) {
  assert.equal(response.status, status);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
}

test('forwards the same request and response, preserving login body and cookies', async () => {
  const request = new Request(`${url}/login?next=%2Fblueprint-wireframe-kit%2F`, {
    method: 'POST',
    headers: {
      Origin: url,
      Cookie: 'blueprint_session=previous-session',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'password=test-value&next=%2Fblueprint-wireframe-kit%2F',
  });
  const upstream = new Response(null, {
    status: 303,
    headers: {
      Location: '/blueprint-wireframe-kit/',
      'Set-Cookie': 'blueprint_session=test-session; Path=/; HttpOnly; Secure; SameSite=Lax',
      'Cache-Control': 'private, no-store',
    },
  });
  let received;
  const response = await gateway.fetch(request, {
    CANONICAL_HOST: host,
    PROTECTED_SITE: {
      async fetch(value) {
        received = value;
        return upstream;
      },
    },
  });
  assert.strictEqual(received, request);
  assert.strictEqual(response, upstream);
  assert.equal(received.url, request.url);
  assert.equal(received.headers.get('Origin'), url);
  assert.equal(received.headers.get('Cookie'), 'blueprint_session=previous-session');
  assert.equal(await received.text(), 'password=test-value&next=%2Fblueprint-wireframe-kit%2F');
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('Location'), '/blueprint-wireframe-kit/');
  assert.equal(response.headers.get('Set-Cookie'), upstream.headers.get('Set-Cookie'));
});

test('preserves range requests and streamed partial responses', async () => {
  const request = new Request(`${url}/private-reference.jpg`, {
    headers: { Range: 'bytes=0-3', Cookie: 'blueprint_session=test-session' },
  });
  const upstream = new Response(new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('part'));
      controller.close();
    },
  }), {
    status: 206,
    headers: {
      'Content-Range': 'bytes 0-3/10',
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'private, no-store',
      'Vary': 'Cookie',
    },
  });
  const response = await gateway.fetch(request, {
    CANONICAL_HOST: host,
    PROTECTED_SITE: { async fetch(received) {
      assert.strictEqual(received, request);
      assert.equal(received.headers.get('Range'), 'bytes=0-3');
      return upstream;
    } },
  });
  assert.strictEqual(response, upstream);
  assert.equal(response.status, 206);
  assert.equal(response.headers.get('Content-Range'), 'bytes 0-3/10');
  assert.equal(response.headers.get('Vary'), 'Cookie');
  assert.equal(await response.text(), 'part');
});

test('rejects preview, branch, unrelated, and nonstandard-port hosts before forwarding', async () => {
  let calls = 0;
  const env = {
    CANONICAL_HOST: host,
    PROTECTED_SITE: { async fetch() { calls++; return new Response('private'); } },
  };
  for (const otherHost of [
    `abcdef.${host}`,
    `preview.${host}`,
    'blueprint.anujprajapati.com',
    'other.pages.dev',
    `${host}:8443`,
  ]) {
    const response = await gateway.fetch(new Request(`https://${otherHost}/`), env);
    assertClosed(response, 404);
    assert.equal(await response.text(), 'Not found');
  }
  assert.equal(calls, 0);
});

test('fails closed when the protected service binding is missing or invalid', async () => {
  for (const binding of [undefined, null, {}, { fetch: 'invalid' }]) {
    const response = await gateway.fetch(new Request(`${url}/`), {
      CANONICAL_HOST: host,
      PROTECTED_SITE: binding,
    });
    assertClosed(response, 503);
    assert.equal(await response.text(), 'Service unavailable');
  }
});

test('fails closed without a configured canonical host', async () => {
  for (const env of [undefined, {}, { CANONICAL_HOST: '' }]) {
    const response = await gateway.fetch(new Request(`${url}/`), env);
    assertClosed(response, 503);
  }
});

test('fails closed without exposing errors when the protected service fails', async () => {
  const response = await gateway.fetch(new Request(`${url}/`), {
    CANONICAL_HOST: host,
    PROTECTED_SITE: { async fetch() { throw new Error('private service detail'); } },
  });
  assertClosed(response, 503);
  assert.equal(await response.text(), 'Service unavailable');
});
