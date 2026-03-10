export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Loading</span>
      </div>
    </div>
  );
}
