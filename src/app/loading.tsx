export default function Loading() {
  return (
    <main className="min-h-screen bg-black">
      <div className="pt-32 pb-20">
        <div className="max-w-[1540px] mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-6 animate-pulse">
            <div className="h-12 w-2/3 max-w-2xl rounded-lg bg-white/5" />
            <div className="h-4 w-1/2 max-w-lg rounded bg-white/5" />
            <div className="h-4 w-2/5 max-w-md rounded bg-white/5" />
          </div>
        </div>
      </div>
    </main>
  );
}
