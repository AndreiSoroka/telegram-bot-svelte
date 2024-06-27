export function combinePaths(path1: string, path2: string) {
  return `${path1.replace(/\/+$/, "")}/${path2.replace(/^\/+/, "")}`;
}
