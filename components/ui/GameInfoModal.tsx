'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info, X } from 'lucide-react';

interface GameInfoModalProps {
  title: string;
  rules: string[];
}

export function GameInfoModal({ title, rules }: GameInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Evitar scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = isOpen && isMounted ? createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      {/* Modal Content */}
      <div
        className="relative bg-background border border-border p-6 rounded-xl shadow-2xl max-w-md w-[90%] max-h-[90vh] overflow-y-auto text-card-foreground animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Evitar que clics dentro del modal lo cierren
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground rounded-full p-1 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reglas */}
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
            {rules.map((rule, index) => (
              <li key={index} className="leading-relaxed">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 transition-all p-2 rounded-full hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Información del juego"
        title="Instrucciones"
      >
        <Info className="w-5 h-5" />
      </button>

      {modalContent}
    </>
  );
}
