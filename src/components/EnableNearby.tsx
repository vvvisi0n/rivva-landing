"use client";

import { useGeo } from "@/hooks/useGeo";

export function EnableNearby(props: {
  onCoords: (lat: number, lng: number) => void;
}) {
  const geo = useGeo();
  const {
    supported,
    loading,
    lat,
    lng,
    error,
    hasCoords,
    request,
  } = geo as any;

  const canSave = Boolean(hasCoords && lat != null && lng != null);

  return (
    <div className="rounded-2xl border border-zinc-200 p-5">
      <div className="text-sm font-semibold">Enable nearby discovery</div>
      <div className="mt-2 text-sm text-zinc-600">
        Anchyr uses your location to show people and activities near you. We never show an exact address.
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={request}
          className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Enable location
        </button>

        <button
          onClick={() => props.onCoords(0, 0)}
          className="rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
        >
          Use city only
        </button>
      </div>

      <div className="mt-3 text-xs text-zinc-500">
        Tip: choose a small radius like 2–5 miles for better matches.
      </div>

      {!supported && (
        <div className="mt-3 text-sm text-zinc-600">
          Location isn’t supported on this device/browser. You can continue with city-only mode.
        </div>
      )}

      {loading && (
        <div className="mt-3 text-sm text-zinc-600">Requesting location…</div>
      )}

      {!!error && (
        <div className="mt-3 text-sm text-red-600">{String(error)}</div>
      )}

      {canSave && (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-zinc-50 p-3 text-sm">
          <div className="text-zinc-700">Location captured (approx).</div>
          <button
            onClick={() => props.onCoords(Number(lat), Number(lng))}
            className="rounded-xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
          >
            Save & continue
          </button>
        </div>
      )}
    </div>
  );
}
