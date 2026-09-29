const STORAGE_KEY = "wafa-nda-access";

export function getNdaToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { token, expiresAt } = JSON.parse(raw);
    if (!token || Date.now() > expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return token;
  } catch {
    return null;
  }
}

export function setNdaToken(token, ttlHours = 24) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ token, expiresAt: Date.now() + ttlHours * 60 * 60 * 1000 })
  );
}