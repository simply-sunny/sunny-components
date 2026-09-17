// Test what users install, not the workspace. Requires npm registry access.
const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, readFileSync, writeFileSync, rmSync, readdirSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join, resolve } = require('node:path');
const root = resolve(__dirname, '..');
const temp = mkdtempSync(join(tmpdir(), 'sunny-package-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
// npm 11 exports this global-only option into lifecycle scripts; project installs reject it.
const env = { ...process.env };
delete env.npm_config_allow_scripts;
const run = (exe, args, cwd = temp) => execFileSync(exe, args, { cwd, env, stdio: 'inherit' });
try {
  run(npm, ['pack', '--pack-destination', temp], root);
  const tarball = readdirSync(temp).find(file => file.endsWith('.tgz'));
  assert.ok(tarball);
  writeFileSync(join(temp, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  run(npm, ['install', '--ignore-scripts', join(temp, tarball), 'react@19', 'react-dom@19', 'typescript', '@types/react@19', '@types/react-dom@19']);
  const pkg = require(join(root, 'package.json'));
  const installed = join(temp, 'node_modules', pkg.name);
  run(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    import {createRequire} from 'node:module';
    import {readFileSync} from 'node:fs';
    import React from 'react';
    import {renderToString} from 'react-dom/server';
    import {AnimatedNumber, Button} from '${pkg.name}';
    const require = createRequire(import.meta.url);
    assert.ok(Button && require('${pkg.name}').Button);
    assert.match(renderToString(React.createElement(AnimatedNumber, {value: 18.4, decimals: 1})), /18\.4/);
    const css = readFileSync(require.resolve('${pkg.name}/styles.css'), 'utf8');
    for (const selector of ['.number-new', '.sc-button', '--color-bg', 'prefers-reduced-motion']) assert.ok(css.includes(selector), selector);
  `]);
  const cli = join(installed, 'bin/sunny-components.cjs');
  run(process.execPath, [cli, '--help']);
  run(process.execPath, [cli, 'init', 'src/sunny']);
  const source = join(temp, 'src/sunny/components/index.tsx');
  const original = readFileSync(source, 'utf8');
  assert.equal(spawnSync(process.execPath, [cli, 'init', 'src/sunny'], { cwd: temp }).status, 1);
  assert.equal(readFileSync(source, 'utf8'), original, 'Existing source must never be overwritten');
  assert.equal(spawnSync(process.execPath, [cli, 'unknown'], { cwd: temp }).status, 1);
  writeFileSync(join(temp, 'consumer.tsx'), `
    import { Button, AnimatedNumber, MetricCard } from '${pkg.name}';
    import '${pkg.name}/styles.css';
    import { Button as CopiedButton } from './src/sunny/components';
    export const example = <><Button>Save</Button><CopiedButton>Save</CopiedButton><MetricCard label="Ping" value={<AnimatedNumber value={18.4} />} note="ms" /></>;
  `);
  writeFileSync(join(temp, 'tsconfig.json'), JSON.stringify({ compilerOptions: { strict: true, noEmit: true, jsx: 'react-jsx', module: 'ESNext', moduleResolution: 'Bundler', target: 'ES2022', skipLibCheck: true }, include: ['consumer.tsx', 'src/**/*.d.ts'] }));
  run(process.execPath, [join(temp, 'node_modules/typescript/bin/tsc'), '-p', 'tsconfig.json']);
  for (const filename of ['index.mjs', 'index.cjs']) {
    assert.match(readFileSync(join(installed, 'package-dist', filename), 'utf8').slice(0, 40), /use client/);
  }
  console.log('PASS: packed ESM/CJS, SSR, types, CSS, copied source, CLI help and overwrite protection.');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
