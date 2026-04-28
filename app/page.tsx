import Link from 'next/link';
import Image from 'next/image';
import { Gamepad2, ArrowRight, Edit3 } from 'lucide-react';
import { GlobalControls } from '@/components/ui/GlobalControls';

export default function GameSpotLobby() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-16 px-4 sm:px-8 font-sans">
      <GlobalControls />
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
            <div className="relative h-48 bg-neutral-900 flex items-center justify-center border-b border-border/50 overflow-hidden">
              <Image
                src="/hangman_cover.png"
                alt="Portada del juego Ahorcado"
                width={600}
                height={300}
                priority
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
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

        {/* Tarjeta de Memory Match */}
        <Link href="/memory" className="group relative block w-full h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
          <div className="relative h-full flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="relative h-48 bg-neutral-900 flex items-center justify-center border-b border-border/50 overflow-hidden">
              <Image
                src="/memory.png"
                alt="Portada del juego Memory Match"
                width={600}
                height={300}
                priority
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2 flex items-center gap-2">
                  Memory Match
                </h3>
                <p className="text-muted-foreground">
                  Pon a prueba tu memoria encontrando los pares de cartas. Disfruta de distintos tamaños de tablero y temáticas en solitario o multijugador local.
                </p>
              </div>
              <div className="mt-6 flex items-center text-indigo-500 font-semibold group-hover:text-indigo-400 transition-colors">
                Jugar ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Link>

        {/* Tarjeta de Bachillerato Stop */}
        <Link href="/stop" className="group relative block w-full h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
          <div className="relative h-full flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="relative h-48 bg-neutral-900 flex items-center justify-center border-b border-border/50 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                <Edit3 className="w-24 h-24 text-emerald-400 opacity-80" />
                <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay"></div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2 flex items-center gap-2">
                  Bachillerato Stop
                </h3>
                <p className="text-muted-foreground">
                  El clásico juego de palabras multijugador. Crea una sala, invita a tus amigos y demuestra quién es el más rápido completando categorías.
                </p>
              </div>
              <div className="mt-6 flex items-center text-emerald-500 font-semibold group-hover:text-emerald-400 transition-colors">
                Jugar ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
