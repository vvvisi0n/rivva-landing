const KEY = "rivva_likes";

export function getLikes(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function isLiked(id: string) {
  const likes = getLikes();
  return !!likes[id];
}

export function toggleLike(id: string) {
  const likes = getLikes();
  likes[id] = !likes[id];
  localStorage.setItem(KEY, JSON.stringify(likes));
  return likes[id];
}
