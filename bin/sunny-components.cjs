#!/usr/bin/env node
const { cpSync, existsSync, mkdirSync, rmSync } = require('node:fs');
const { dirname, join, resolve } = require('node:path');
const pkg = require('../package.json');
const [command, destination, ...extra] = process.argv.slice(2);

if (!command || command === '--help' || command === '-h') {
  console.log(`Usage: ${pkg.name} init [directory]\n\nCopies the source kit to a NEW directory (default: src/sunny).\nExisting files and package.json are never overwritten.\nInstall dependencies and import styles using the printed instructions.`);
} else if (command === '--version' && !destination) {
  console.log(pkg.version);
} else if (command !== 'init' || extra.length || destination?.startsWith('-')) {
  console.error('Unknown command or option. Use --help.');
  process.exitCode = 1;
} else {
  const target = resolve(destination || 'src/sunny');
  let created = false;
  try {
    if (existsSync(target)) throw new Error(`Destination already exists: ${target}. Choose a new directory.`);
    mkdirSync(dirname(target), { recursive: true });
    mkdirSync(target); // Exclusive creation: never merge into user-owned files.
    created = true;
    const root = join(__dirname, '..');
    // ponytail: the components share one source module; copy the kit, not a registry resolver.
    for (const file of [
      'components/index.tsx', 'components/AnimatedNumber.tsx',
      'components/components.css', 'components/AnimatedNumber.css',
      'lib/cn.ts', 'styles/tokens.css', 'styles/css.d.ts',
    ]) {
      mkdirSync(dirname(join(target, file)), { recursive: true });
      cpSync(join(root, 'src', file), join(target, file), { errorOnExist: true, force: false });
    }
    cpSync(join(root, 'LICENSE'), join(target, 'LICENSE'));
    console.log(`Created ${target}\n\nInstall in your React app:\nnpm install ${Object.entries(pkg.dependencies).map(([name, version]) => `${name}@${version}`).join(' ')}\n\nImport once (adjust paths to your app):\nimport './${destination || 'src/sunny'}/styles/tokens.css';\nimport './${destination || 'src/sunny'}/components/components.css';\n\nComponents: ${target}/components/index.tsx`);
  } catch (error) {
    if (created) rmSync(target, { recursive: true, force: true });
    console.error(error.message);
    process.exitCode = 1;
  }
}
