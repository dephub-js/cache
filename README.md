# @dephub/cache 💾

> Tiny, type-safe cache with in-memory, file, and browser persistence backends.

[![NPM version](https://img.shields.io/npm/v/@dephub/cache.svg?style=flat)](https://npmjs.org/package/@dephub/cache)
[![ESM-only](https://img.shields.io/badge/ESM-only-brightgreen?style=flat)](https://nodejs.org/)

## Features ✨

- 🧠 **In-memory** (`Memory`) – fast, synchronous, lightweight
- 💽 **File-backed** (`Disk`) – persistent JSON cache with lazy loading
- 🌐 **Browser `localStorage`** (`Storage`) – automatic persistence in the browser
- ✅ **Type-safe** – only `string | number | boolean` values
- 🚨 **Consistent errors** – `Error` for all failures

## Installation 💿

```bash
# Using npm
npm install @dephub/cache

# Using pnpm
pnpm add @dephub/cache

# Using yarn
yarn add @dephub/cache
```

## Usage 🎉

### CLI

```bash
# Set a value (automatically detects type)
cache set username "john_doe"
cache set score 100
cache set active true

# Get a value
cache get username

# List all entries
cache list

# Delete an entry
cache delete username

# Clear all cache
cache clear
```

### API 🧩

#### `Memory` – In-memory cache

```ts
import { Memory } from '@dephub/cache';

const cache = new Memory();
cache.set('theme', 'dark');
cache.set('count', 42);
cache.set('active', true);

console.log(cache.get('theme')); // => "dark"
console.log(cache.size()); // => 3
```

#### `Disk` – File-based persistent cache

```ts
import { Disk } from '@dephub/cache';

const cache = new Disk('config/app.json');

await cache.set('user', 'alice');
console.log(await cache.get('user')); // => "alice"

// File `config/app.json` now contains:
// {
//   "user": "alice"
// }
```

#### `Storage` – Browser `localStorage` cache

```ts
import { Storage } from '@dephub/cache';

const cache = new Storage('my-app');
cache.set('lang', 'es');
console.log(cache.get('lang')); // => "es"

// Persisted in localStorage under key "my-app"
```

#### Error handling

```ts
import { Error } from '@dephub/cache';

try {
  cache.set(123, 'invalid'); // throws
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message); // "Cache key must be a string"
  }
}
```

#### Shared interface

All backends share the same API:

```ts
await cache.set('key', value);
await cache.get('key');
await cache.has('key');
await cache.delete('key');
await cache.clear();
await cache.size();
await cache.keys();
await cache.values();
await cache.entries();
await cache.forEach((value, key) => { ... });
```

---

## License 📄

MIT License – see [LICENSE](LICENSE) for details.

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
