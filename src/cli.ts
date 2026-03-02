#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command, CommandError } from '@dephub/command';
import { logger } from '@dephub/logger';

import { description, name, version } from '@/utils/pkg.js';

import { Disk } from './index.js';

const cmd = new Command()
  .name(name.split('/')[1] ?? 'cache')
  .version(version)
  .description(description);

cmd
  .command('get', 'Get value from cache')
  .argument('key', 'Cache key to retrieve')
  .handler(async ({ args: { key } }) => {
    const cache = new Disk();

    const value = await cache.get(key);
    if (value !== undefined) {
      logger.log(value.toString());
    } else {
      logger.error(`Key not found: ${key}`);
      process.exit(1);
    }
  });

cmd
  .command('delete', 'Delete value from cache')
  .argument('key', 'Cache key to delete')
  .handler(async ({ args: { key } }) => {
    const cache = new Disk();
    const deleted = await cache.delete(key);

    if (deleted) {
      logger.success(`Deleted ${key}`);
    } else {
      logger.error(`Key not found: ${key}`);
      process.exit(1);
    }
  });

cmd
  .command('set', 'Set value in cache')
  .argument('key', 'Cache key')
  .argument('value', 'Cache value (string, number, or boolean)')
  .handler(async ({ args: { key, value } }) => {
    const cache = new Disk();

    try {
      let parsedValue: boolean | number | string = value;
      if (value === 'true') parsedValue = true;
      else if (value === 'false') parsedValue = false;
      else if (!isNaN(Number(value))) parsedValue = Number(value);

      await cache.set(key, parsedValue);
      logger.success(`Set ${key} = ${parsedValue}`);
    } catch (err: any) {
      logger.error(`Failed to set value: ${err.message}`);
      process.exit(1);
    }
  });

cmd.command('list', 'List all cache entries').handler(async () => {
  const cache = new Disk();

  const entries = await cache.entries();
  if (entries.length === 0) {
    logger.log('Cache is empty');
    return;
  }

  entries.forEach(([key, value]) => {
    logger.log(`${key} = ${value}`);
  });
});

cmd.command('clear', 'Clear all cache entries').handler(async () => {
  const cache = new Disk();

  await cache.clear();
  logger.success('Cache cleared');
});

try {
  await cmd.run();
} catch (err) {
  if (err instanceof CommandError) {
    logger.error(`\nError: ${err.message}\n`);
    cmd.help();
    process.exit(1);
  }
  throw err;
}
