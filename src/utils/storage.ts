const hasWindow = typeof window !== 'undefined';

type StorageKind = 'local' | 'session';

function getStorage(kind: StorageKind): Storage | null {
  if (!hasWindow) return null;
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function safeGetItem(kind: StorageKind, key: string): string | null {
  const storage = getStorage(kind);
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(kind: StorageKind, key: string, value: string): void {
  const storage = getStorage(kind);
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {
    // ignore
  }
}

export function safeRemoveItem(kind: StorageKind, key: string): void {
  const storage = getStorage(kind);
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch {
    // ignore
  }
}
