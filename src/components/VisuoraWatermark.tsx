import visuoraLogo from '@/assets/visuora-logo.png';

export function VisuoraWatermark() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50 opacity-70 hover:opacity-100 transition-opacity">
      <img src={visuoraLogo} alt="Visuora Studio" className="h-6 w-6 rounded" />
      <span className="text-xs text-muted-foreground">
        Modelo da Visuora Studio
      </span>
    </div>
  );
}
