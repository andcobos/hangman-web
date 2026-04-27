import Link from 'next/link';
import { Gamepad2, ArrowRight } from 'lucide-react';

export default function GameSpotLobby() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-16 px-4 sm:px-8 font-sans">
      <div className="max-w-4xl w-full text-center space-y-6 mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
          Game Spot
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
          Tu hub central para los mejores minijuegos.
        </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tarjeta de Hangman */}
        <Link href="/hangman" className="group relative block w-full h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
          <div className="relative h-full flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center border-b border-border/50">
              <Gamepad2 className="w-24 h-24 text-pink-500 opacity-80 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2 flex items-center gap-2">
                  Hangman
                </h3>
                <p className="text-muted-foreground">
                  El clásico juego del Ahorcado. Adivina la palabra oculta antes de que se complete el dibujo. ¡Juega solo o en multijugador local!
                </p>
              </div>
              <div className="mt-6 flex items-center text-pink-500 font-semibold group-hover:text-pink-400 transition-colors">
                Jugar ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Link>
        
        {/* Espacio para futuros juegos */}
        <div className="h-full flex flex-col bg-card/50 border border-dashed border-border/50 rounded-2xl items-center justify-center p-8 text-center min-h-[350px]">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <span className="text-2xl">🚧</span>
          </div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">Próximamente</h3>
          <p className="text-sm text-muted-foreground/70">
            Nuevos y emocionantes minijuegos están en camino.
          </p>
        </div>
      </div>
    </main>
  );
}
