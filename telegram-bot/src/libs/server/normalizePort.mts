export function normalizePort(val: string | undefined): number | undefined {
  const port = val ? parseInt(val, 10) : undefined;

  if (port && port >= 0 && port <= 65535) {
    return port;
  }

  return undefined;
}
