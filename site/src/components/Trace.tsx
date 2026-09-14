import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface Line {
  prompt?: boolean;
  cmd?: string;
  out?: string[];
  status?: 'ok' | 'pending';
}

const SCRIPT: Line[] = [
  { prompt: true, cmd: 'cargo install tensift-cli' },
  { out: ['  Compiling tensift-core v0.1.1', '  Compiling tensift-cli  v0.1.1', '   Finished release in 47.2s'] },
  { prompt: true, cmd: 'tensift factor --seed 42 --n 8633' },
  {
    out: [
      '[stage 1/7] lattice       0.4 ms',
      '[stage 2/7] basis reduce  1.1 ms',
      '[stage 3/7] cvp baseline  0.6 ms',
      '[stage 4/7] tensor ttns   5.2 ms',
      '[stage 5/7] sample opes   3.7 ms',
      '[stage 6/7] smoothness    0.8 ms',
      '[stage 7/7] extract gf2   0.6 ms',
    ],
  },
  { out: ['p = 89     q = 97', 'verified · 12.4 ms'] },
  { status: 'ok' },
];

export function Trace() {
  return (
    <section id="trace" className="relative py-32 lg:py-40">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <div className="eyebrow">In motion</div>
            <h2 className="display-title mt-4 text-balance">
              From your terminal to verified factors.
            </h2>
            <p className="lede mt-6">
              Install once, factor anywhere. Every stage emits a timing and an artefact.
              Re-run with the same seed and the trace is byte-identical.
            </p>

            <ul className="mt-10 space-y-4 text-[13px] text-ink-300/85">
              {[
                'Reproducible: same seed, same factors',
                'Structured per-stage timing',
                'JSON trace export for audits',
                'Drop-in library for your crate',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-300">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <TerminalPanel />
        </div>
      </div>
    </section>
  );
}

function TerminalPanel() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-amber-500/8 via-transparent to-amber-500/4 blur-2xl" />
      <div className="glass-strong overflow-hidden rounded-2xl shadow-card">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
            <Terminal size={11} />
            zsh — tensift
          </div>
          <span className="font-mono text-[10px] text-ink-500">seed 42</span>
        </div>

        <div className="bg-ink-950/70 p-6 font-mono text-[13px] leading-relaxed text-ink-200 sm:p-8">
          <Replay />
        </div>
      </div>
    </div>
  );
}

function Replay() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (step >= SCRIPT.length) return;
    const line = SCRIPT[step];
    if (line.cmd !== undefined) {
      const cmd = line.cmd;
      if (typed.length < cmd.length) {
        const t = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), 22);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setStep((s) => s + 1);
        setTyped('');
      }, 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 280);
    return () => clearTimeout(t);
  }, [step, typed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(0);
      setTyped('');
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  const current = SCRIPT[step];
  const isTypingCmd = current?.prompt && current?.cmd !== undefined;
  const isOutput = current && current.cmd === undefined && current.out !== undefined;

  return (
    <div>
      {SCRIPT.slice(0, step).map((line, i) => (
        <Block key={i} line={line} />
      ))}

      {isTypingCmd && current?.cmd && (
        <div className="mt-1 flex items-start gap-2">
          <span className="select-none text-amber-400">$</span>
          <span className="text-ink-100">{typed}</span>
          <motion.span
            aria-hidden="true"
            className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-amber-300/80"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      )}

      {isOutput && current?.out && (
        <div className="mt-1 space-y-1">
          {current.out.map((o, j) => (
            <div
              key={j}
              className={o.includes('verified') || o.includes('p =') ? 'text-amber-300/95' : 'text-ink-400'}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Block({ line }: { line: Line }) {
  return (
    <div className="space-y-1">
      {line.prompt && line.cmd && (
        <div className="flex items-start gap-2">
          <span className="select-none text-amber-400">$</span>
          <span className="text-ink-100">{line.cmd}</span>
        </div>
      )}
      {line.out?.map((o, j) => (
        <div
          key={j}
          className={o.includes('verified') || o.includes('p =') ? 'text-amber-300/95' : 'text-ink-400'}
        >
          {o}
        </div>
      ))}
    </div>
  );
}