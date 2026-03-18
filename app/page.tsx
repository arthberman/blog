import {
  Github01Icon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src="/profile.jpg" alt="Arthur Berman" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <h1 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-zinc-900">
                Arthur Berman
              </h1>
            </div>
            <div className="flex gap-3">
              <a
                href="https://x.com/arthberman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition-colors hover:text-zinc-900"
                aria-label="X (Twitter)"
              >
                <HugeiconsIcon icon={NewTwitterIcon} size={18} />
              </a>
              <a
                href="https://github.com/arthberman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition-colors hover:text-zinc-900"
                aria-label="GitHub"
              >
                <HugeiconsIcon icon={Github01Icon} size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/arthberman/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 transition-colors hover:text-zinc-900"
                aria-label="LinkedIn"
              >
                <HugeiconsIcon icon={Linkedin01Icon} size={18} />
              </a>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <div className="space-y-4 text-sm leading-relaxed text-zinc-600">
            <p>I build software. Grew up in Paris.</p>

            <div>
              <p className="mb-3 font-medium text-zinc-900">
                Some things I believe:
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-zinc-900">High agency over everything</p>
                  <ul className="mt-1 space-y-1 pl-4">
                    <li>
                      • The world splits into two kinds of people: those who
                      wait for the green light and those who just go, be the
                      second one
                    </li>
                    <li>
                      • Nobody is coming to give you a roadmap, the best
                      outcomes I've had all started with "I'll figure it out as
                      I go"
                    </li>
                    <li>
                      • Agency compounds: every time you act without being told
                      to, you build a reputation that opens doors you didn't
                      even know existed
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-zinc-900">Default to transparency</p>
                  <ul className="mt-1 space-y-1 pl-4">
                    <li>
                      • Say what you actually think, people respect clarity over
                      comfort
                    </li>
                    <li>
                      • The best teams, co-founders, and relationships are built
                      on radical honesty, not polite avoidance
                    </li>
                    <li>
                      • Hidden agendas kill companies faster than bad execution
                      ever will
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-zinc-900">
                    Optimism is a competitive advantage
                  </p>
                  <ul className="mt-1 space-y-1 pl-4">
                    <li>
                      • Pessimists sound smart at dinner parties, optimists
                      build companies
                    </li>
                    <li>
                      • Believing something is possible is literally a
                      prerequisite to making it happen
                    </li>
                    <li>
                      • The world is shaped by people who ignored the
                      "realistic" take and shipped anyway
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              Reach me at{" "}
              <a
                href="mailto:arthberman@gmail.com"
                className="text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-900"
              >
                arthberman@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
