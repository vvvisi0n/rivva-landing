export async function POST() {
  console.log("RIVVA CLEAN API ROUTE HIT");

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
