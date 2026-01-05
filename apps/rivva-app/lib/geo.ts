export type GeoPoint = { lat: number; lng: number };

export function getBrowserLocation(timeoutMs = 8000): Promise<GeoPoint> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if (!("geolocation" in navigator)) return reject(new Error("Geolocation unavailable"));

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: false, timeout: timeoutMs, maximumAge: 5 * 60 * 1000 }
    );
  });
}

export function haversineMiles(a: GeoPoint, b: GeoPoint): number {
  const R = 3958.7613; // miles
  const toRad = (d: number) => (d * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}
