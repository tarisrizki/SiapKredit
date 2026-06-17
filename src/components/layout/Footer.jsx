import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter text-foreground">Siap<span className="text-primary">Kredit</span></span>
        </div>
        
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5 font-medium">
          Dibuat dengan <Heart size={14} className="text-danger-500 fill-danger-500" /> untuk UMKM Indonesia
        </p>
      </div>
    </footer>
  );
}
