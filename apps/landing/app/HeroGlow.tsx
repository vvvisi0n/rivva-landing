export default function HeroGlow() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft radial background */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px]
        bg-[radial-gradient(circle,#d6c4ff_0%,#f7f4ff_40%,#ffffff_70%)]
        opacity-80 blur-3xl"
      />

      {/* Purple bloom */}
      <div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px]
        bg-[radial-gradient(circle,#b388ff_0%,transparent_60%)]
        opacity-40 blur-2xl animate-pulse-slow"
      />

      {/* Blue atmospheric glow */}
      <div
        className="absolute top-[35%] left-[60%] w-[500px] h-[500px]
        bg-[radial-gradient(circle,#88c2ff_0%,transparent_70%)]
        opacity-40 blur-3xl animate-pulse-soft"
      />

      {/* Under-Lumi halo */}
      <div
        className="absolute top-[280px] left-1/2 -translate-x-1/2 w-[400px] h-[400px]
        bg-[radial-gradient(circle,#c7b0ff_0%,transparent_70%)]
        opacity-60 blur-2xl"
      />
    </div>
  );
}
