import {
  Github01Icon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

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
          <h2 className="font-[family-name:var(--font-sans)] mb-4 text-sm font-medium text-zinc-900">
            About
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-zinc-600">
            <p>
              I'm a software engineer. I grew up in Paris and studied Computer
              Science and AI at CentraleSupélec.
            </p>

            <p>
              Most recently, I built{" "}
              <a
                href="https://superinbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-900"
              >
                Superinbox
              </a>
              , an AI that drafts emails in your tone.
            </p>

            <div>
              <p className="mb-2 font-medium text-zinc-900">
                Some things I believe:
              </p>
              <ul className="space-y-1">
                <li>
                  • <span className="text-zinc-900">Ship fast</span> — ideas are
                  worthless without execution
                </li>
                <li>
                  • <span className="text-zinc-900">Feel the pain</span> — you
                  can't push the right solution without hitting the problem hard
                </li>
                <li>
                  • <span className="text-zinc-900">Always be building</span> —
                  from game mods to startups, building is how I think
                </li>
              </ul>
            </div>

            <p>
              Looking to meet builders in SF. Reach me at{" "}
              <a
                href="mailto:arthberman@gmail.com"
                className="text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-900"
              >
                arthberman@gmail.com
              </a>{" "}
              or check out my{" "}
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-900"
              >
                resume
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
