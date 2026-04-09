/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Palette, Type, Code, Terminal, ExternalLink, Download, Layers, Zap } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
}

const EXPORT_THEME_BLOCK = `@theme {
  /* Colors */
  --color-won-colors-brand-primary-0: #B01F29;
  --color-won-colors-brand-primary-1: #892028;
  --color-won-colors-brand-primary-2: #64131A;
  --color-won-colors-brand-secondary: #F4F4F2;
  --color-won-colors-brand-tertiary: #1D1D1B;

  --color-won-colors-surface-background: #FEFEFE;
  --color-won-colors-surface-cards: #FFFFFF;

  --color-won-colors-complementary-green: #15B37D;
  --color-won-colors-complementary-orange: #E67E22;
  --color-won-colors-complementary-red: #C0392B;
  --color-won-colors-complementary-blue: #3470B7;

  --color-won-colors-interactive-pressed: rgba(0, 0, 0, 0.2);
  --color-won-colors-interactive-hover: #FFFFFF;
  --color-won-colors-interactive-active: #FFFFFF;

  --color-won-colors-border-default: #E6E6E6;

  --color-won-colors-content-primary: #1D1D1B;
  --color-won-colors-content-secondary: #4A5565;
  --color-won-colors-content-tertiary: #6A7282;

  /* Typography */
  --font-won-font-heading: "Degular Variable", sans-serif;
  --font-won-font-body: "Manrope", sans-serif;

  --font-weight-won-regular: 400;
  --font-weight-won-semibold: 600;
  --font-weight-won-bold: 700;
  --font-weight-won-extrabold: 800;

  /* Text Sizes & Line Heights */
  --font-size-won-text-40: 40px;
  --font-size-won-text-40--line-height: 48px;

  --font-size-won-text-32: 32px;
  --font-size-won-text-32--line-height: 40px;

  --font-size-won-text-h1: 24px;
  --font-size-won-text-h1--line-height: 32px;

  --font-size-won-text-h2: 20px;
  --font-size-won-text-h2--line-height: 28px;

  --font-size-won-text-p1: 16px;
  --font-size-won-text-p1--line-height: 24px;

  --font-size-won-text-p2: 14px;
  --font-size-won-text-p2--line-height: 22px;

  --font-size-won-text-p3: 12px;
  --font-size-won-text-p3--line-height: 20px;

  --font-size-won-text-p4: 10px;
  --font-size-won-text-p4--line-height: 16px;
}

@layer base {
  h1 {
    font-family: var(--font-won-font-heading);
    font-weight: var(--font-weight-won-extrabold);
    font-size: var(--font-size-won-text-40);
    line-height: var(--font-size-won-text-40--line-height);
  }

  h2 {
    font-family: var(--font-won-font-heading);
    font-weight: var(--font-weight-won-bold);
    font-size: var(--font-size-won-text-32);
    line-height: var(--font-size-won-text-32--line-height);
  }

  h3 {
    font-family: var(--font-won-font-heading);
    font-weight: var(--font-weight-won-bold);
    font-size: var(--font-size-won-text-h1);
    line-height: var(--font-size-won-text-h1--line-height);
  }

  h4 {
    font-family: var(--font-won-font-heading);
    font-weight: var(--font-weight-won-semibold);
    font-size: var(--font-size-won-text-h2);
    line-height: var(--font-size-won-text-h2--line-height);
  }

  p {
    font-family: var(--font-won-font-body);
    font-weight: var(--font-weight-won-regular);
    font-size: var(--font-size-won-text-p1);
    line-height: var(--font-size-won-text-p1--line-height);
  }

  small {
    font-size: var(--font-size-won-text-p3);
    line-height: var(--font-size-won-text-p3--line-height);
  }
}`;

export default function App() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    addToast(`Copiado: ${text}`);
  }, [addToast]);

  return (
    <div className="min-h-screen bg-won-colors-surface-background selection:bg-won-colors-brand-primary-0 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-won-colors-border-default bg-white hidden lg:flex flex-col z-20">
        <div className="p-8 border-b border-won-colors-border-default">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-won-colors-brand-primary-0 rounded flex items-center justify-center text-white font-won-font-heading font-won-bold text-won-text-h2">
              W
            </div>
            <span className="font-won-font-heading font-won-bold text-won-text-h2 tracking-tight">Won Cred</span>
          </div>
          <p className="text-won-text-p4 text-won-colors-content-tertiary uppercase tracking-widest font-won-semibold">Sistema de Design v1.0</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="#foundation" icon={<Layers className="w-4 h-4" />} label="Fundação" />
          <NavItem href="#colors" icon={<Palette className="w-4 h-4" />} label="Cores" />
          <NavItem href="#typography" icon={<Type className="w-4 h-4" />} label="Tipografia" />
          <NavItem href="#base-styles" icon={<Zap className="w-4 h-4" />} label="Estilos Base" />
          <NavItem href="#export" icon={<Terminal className="w-4 h-4" />} label="Exportação" />
        </nav>
        <div className="p-6 border-t border-won-colors-border-default">
          <button 
            onClick={() => copyToClipboard(EXPORT_THEME_BLOCK)}
            className="w-full py-3 bg-won-colors-brand-tertiary text-white rounded-lg text-won-text-p3 font-won-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors"
          >
            <Download className="w-4 h-4" /> Copiar Bloco de Tema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-10 bg-won-colors-surface-background/80 backdrop-blur-md border-b border-won-colors-border-default lg:hidden">
          <div className="px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-won-colors-brand-primary-0 rounded flex items-center justify-center text-white font-won-font-heading font-won-bold text-won-text-p3">
                W
              </div>
              <span className="font-won-font-heading font-won-bold text-won-text-p1">Won Cred</span>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-8 py-16 space-y-32">
          {/* Foundation */}
          <section id="foundation" className="scroll-mt-24 space-y-8">
            <div className="space-y-4">
              <h1 className="font-won-font-heading font-won-extrabold text-won-text-40 tracking-tight text-won-colors-brand-tertiary">
                Fundação
              </h1>
              <p className="text-won-text-h2 text-won-colors-content-secondary leading-relaxed max-w-3xl">
                O sistema de design Won Cred fornece uma linguagem unificada para nossos produtos digitais. 
                Ele é construído sobre uma base de precisão, clareza e confiança.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Zap className="w-5 h-5 text-won-colors-complementary-orange" />}
                title="Tokens Atômicos"
                description="Os menores blocos de construção da nossa interface, de cores a espaçamento."
              />
              <FeatureCard 
                icon={<Code className="w-5 h-5 text-won-colors-complementary-blue" />}
                title="Pronto para Dev"
                description="Os tokens possuem prefixo e estão prontos para implementação instantânea."
              />
              <FeatureCard 
                icon={<Terminal className="w-5 h-5 text-won-colors-complementary-green" />}
                title="Consistente"
                description="Garante uma experiência coesa em todas as plataformas."
              />
            </div>
          </section>

          {/* Colors */}
          <section id="colors" className="scroll-mt-24 space-y-12">
            <SectionHeader title="Cores" icon={<Palette className="w-6 h-6" />} />
            
            <div className="space-y-20">
              <ColorGrid 
                title="Marca" 
                onCopy={copyToClipboard}
                tokens={[
                  { name: 'won-colors-brand-primary-0', value: '#B01F29' },
                  { name: 'won-colors-brand-primary-1', value: '#892028' },
                  { name: 'won-colors-brand-primary-2', value: '#64131A' },
                  { name: 'won-colors-brand-secondary', value: '#F4F4F2' },
                  { name: 'won-colors-brand-tertiary', value: '#1D1D1B' },
                ]}
              />
              <ColorGrid 
                title="Superfície" 
                onCopy={copyToClipboard}
                tokens={[
                  { name: 'won-colors-surface-background', value: '#FEFEFE' },
                  { name: 'won-colors-surface-cards', value: '#FFFFFF' },
                ]}
              />
              <ColorGrid 
                title="Complementares" 
                onCopy={copyToClipboard}
                tokens={[
                  { name: 'won-colors-complementary-green', value: '#15B37D' },
                  { name: 'won-colors-complementary-orange', value: '#E67E22' },
                  { name: 'won-colors-complementary-red', value: '#C0392B' },
                  { name: 'won-colors-complementary-blue', value: '#3470B7' },
                ]}
              />
              <div className="grid md:grid-cols-2 gap-12">
                <ColorGrid 
                  title="Interativos" 
                  onCopy={copyToClipboard}
                  tokens={[
                    { name: 'won-colors-interactive-pressed', value: 'rgba(0,0,0,0.2)' },
                    { name: 'won-colors-interactive-hover', value: '#FFFFFF' },
                    { name: 'won-colors-interactive-active', value: '#FFFFFF' },
                  ]}
                />
                <ColorGrid 
                  title="Borda" 
                  onCopy={copyToClipboard}
                  tokens={[
                    { name: 'won-colors-border-default', value: '#E6E6E6' },
                  ]}
                />
              </div>
              <ColorGrid 
                title="Conteúdo" 
                onCopy={copyToClipboard}
                tokens={[
                  { name: 'won-colors-content-primary', value: '#1D1D1B' },
                  { name: 'won-colors-content-secondary', value: '#4A5565' },
                  { name: 'won-colors-content-tertiary', value: '#6A7282' },
                ]}
              />
            </div>
          </section>

          {/* Typography */}
          <section id="typography" className="scroll-mt-24 space-y-12">
            <SectionHeader title="Tipografia" icon={<Type className="w-6 h-6" />} />
            
            <div className="space-y-16">
              {/* Font Families */}
              <div className="grid md:grid-cols-2 gap-8">
                <FontFamilyCard 
                  name="Degular Variable" 
                  token="won-font-font-heading" 
                  usage="Uso: Títulos, Cabeçalhos, Botões"
                  onCopy={copyToClipboard}
                  className="font-won-font-heading"
                />
                <FontFamilyCard 
                  name="Manrope" 
                  token="won-font-font-body" 
                  usage="Uso: Texto de Corpo, Parágrafos, Dados"
                  onCopy={copyToClipboard}
                  className="font-won-font-body"
                />
              </div>

              {/* Type Scale */}
              <div className="space-y-6">
                <h3 className="text-won-text-p4 font-won-bold text-won-colors-content-tertiary uppercase tracking-widest">Escala Tipográfica</h3>
                <div className="bg-white border border-won-colors-border-default rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-won-colors-brand-secondary/50 border-b border-won-colors-border-default">
                        <th className="px-8 py-4 text-won-text-p4 font-won-bold text-won-colors-content-tertiary uppercase tracking-wider">Prévia</th>
                        <th className="px-8 py-4 text-won-text-p4 font-won-bold text-won-colors-content-tertiary uppercase tracking-wider">Token</th>
                        <th className="px-8 py-4 text-won-text-p4 font-won-bold text-won-colors-content-tertiary uppercase tracking-wider">Especificações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-won-colors-border-default">
                      <TypeRow onCopy={copyToClipboard} token="won-text-40" size="40px" line="48px" />
                      <TypeRow onCopy={copyToClipboard} token="won-text-32" size="32px" line="40px" />
                      <TypeRow onCopy={copyToClipboard} token="won-text-h1" size="24px" line="32px" />
                      <TypeRow onCopy={copyToClipboard} token="won-text-h2" size="20px" line="28px" />
                      <TypeRow onCopy={copyToClipboard} token="won-text-p1" size="16px" line="24px" />
                      <TypeRow onCopy={copyToClipboard} token="won-text-p2" size="14px" line="22px" />
                      <TypeRow onCopy={copyToClipboard} token="won-text-p3" size="12px" line="20px" />
                      <TypeRow onCopy={copyToClipboard} token="won-text-p4" size="10px" line="16px" />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Base Styles */}
          <section id="base-styles" className="scroll-mt-24 space-y-12">
            <SectionHeader title="Estilos Base" icon={<Zap className="w-6 h-6" />} />
            <div className="space-y-6">
              <p className="text-won-text-h2 text-won-colors-content-secondary leading-relaxed max-w-3xl">
                Estes são os estilos padrão aplicados aos elementos HTML básicos. 
                Eles garantem que, mesmo sem classes utilitárias específicas, seu conteúdo permaneça alinhado à marca.
              </p>
              <div className="p-8 bg-white border border-won-colors-border-default rounded-2xl space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-won-colors-content-tertiary">Elemento H1</span>
                  <h1>Um pequeno jabuti xereta viu dez cegonhas felizes</h1>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-won-colors-content-tertiary">Elemento H2</span>
                  <h2>Um pequeno jabuti xereta viu dez cegonhas felizes</h2>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-won-colors-content-tertiary">Elemento H3</span>
                  <h3>Um pequeno jabuti xereta viu dez cegonhas felizes</h3>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-won-colors-content-tertiary">Elemento de Parágrafo</span>
                  <p>
                    O sistema de design Won Cred fornece uma linguagem unificada para nossos produtos digitais. 
                    Ele é construído sobre uma base de precisão, clareza e confiança. 
                    Nossa tipografia garante que a informação seja acessível e legível em todas as plataformas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Developer Export */}
          <section id="export" className="scroll-mt-24 space-y-8">
            <SectionHeader title="Exportação para Desenvolvedores" icon={<Terminal className="w-6 h-6" />} />
            <div className="bg-won-colors-brand-tertiary rounded-2xl p-8 relative group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-won-text-p4 text-won-colors-content-tertiary font-mono">tailwind-theme.css</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(EXPORT_THEME_BLOCK)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg text-won-text-p4 font-won-semibold flex items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  <Copy className="w-3 h-3" /> Copiar Tema
                </button>
              </div>
              <pre className="text-won-text-p3 text-won-colors-brand-secondary font-mono overflow-x-auto leading-relaxed">
                {EXPORT_THEME_BLOCK}
              </pre>
            </div>
          </section>
        </div>
      </main>

      {/* Toast Notifications */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="bg-won-colors-brand-tertiary text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10"
            >
              <Check className="w-4 h-4 text-won-colors-complementary-green" />
              <span className="text-won-text-p2 font-won-semibold">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 text-won-text-p2 text-won-colors-content-secondary hover:text-won-colors-brand-primary-0 hover:bg-won-colors-brand-secondary rounded-lg transition-all font-won-semibold group"
    >
      <span className="text-won-colors-content-tertiary group-hover:text-won-colors-brand-primary-0 transition-colors">{icon}</span>
      {label}
    </a>
  );
}

function SectionHeader({ title, icon }: { title: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-4 border-b border-won-colors-border-default pb-6">
      <div className="w-12 h-12 bg-won-colors-brand-secondary rounded-xl flex items-center justify-center text-won-colors-brand-primary-0">
        {icon}
      </div>
      <h2 className="font-won-font-heading font-won-bold text-won-text-32 text-won-colors-brand-tertiary">{title}</h2>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white border border-won-colors-border-default rounded-2xl space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="w-10 h-10 bg-won-colors-brand-secondary rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-won-font-heading font-won-bold text-won-text-p1">{title}</h3>
      <p className="text-won-text-p3 text-won-colors-content-secondary leading-relaxed">{description}</p>
    </div>
  );
}

function ColorGrid({ title, tokens, onCopy }: { title: string; tokens: { name: string; value: string }[]; onCopy: (t: string) => void }) {
  const getDisplayName = (name: string) => {
    return name
      .replace('won-colors-brand-', '')
      .replace('won-colors-surface-', '')
      .replace('won-colors-complementary-', '')
      .replace('won-colors-interactive-', '')
      .replace('won-colors-border-', '')
      .replace('won-colors-content-', '');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-won-text-p4 font-won-bold text-won-colors-content-tertiary uppercase tracking-widest">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tokens.map((token) => (
          <button
            key={token.name}
            onClick={() => onCopy(token.name)}
            className="group text-left space-y-3 transition-all active:scale-95"
          >
            <div 
              className="aspect-square rounded-2xl border border-won-colors-border-default shadow-sm relative overflow-hidden group-hover:shadow-xl transition-all"
              style={{ backgroundColor: token.value }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-[2px]">
                <Copy className="w-6 h-6 text-white drop-shadow-md" />
              </div>
            </div>
            <div>
              <div className="text-won-text-p3 font-won-bold truncate text-won-colors-brand-tertiary">{getDisplayName(token.name)}</div>
              <div className="text-won-text-p4 text-won-colors-content-tertiary font-mono uppercase">{token.value}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function FontFamilyCard({ name, token, usage, onCopy, className }: { name: string; token: string; usage: string; onCopy: (t: string) => void; className: string }) {
  const tailwindClass = `font-${token}`;
  return (
    <div className="p-8 bg-white border border-won-colors-border-default rounded-2xl space-y-6 hover:border-won-colors-brand-primary-0 transition-colors group">
      <div className="space-y-1">
        <span className="text-won-text-p4 font-won-bold text-won-colors-content-tertiary uppercase tracking-widest">Família de Fontes</span>
        <h3 className={`text-won-text-40 ${className} text-won-colors-brand-tertiary`}>{name}</h3>
      </div>
      <div className="space-y-4">
        <p className="text-won-text-p2 text-won-colors-content-secondary">{usage}</p>
        <button 
          onClick={() => onCopy(tailwindClass)}
          className="flex items-center gap-2 text-won-text-p3 font-won-semibold text-won-colors-brand-primary-0 hover:underline"
        >
          <Copy className="w-3 h-3" /> {tailwindClass}
        </button>
      </div>
    </div>
  );
}

function TypeRow({ token, size, line, onCopy }: { token: string; size: string; line: string; onCopy: (t: string) => void }) {
  const tailwindClass = `text-${token}`;
  return (
    <tr 
      className="group hover:bg-won-colors-brand-secondary/30 cursor-pointer transition-colors"
      onClick={() => onCopy(tailwindClass)}
    >
      <td className="px-8 py-8">
        <span className={`${tailwindClass} font-won-font-heading font-won-bold truncate block text-won-colors-brand-tertiary`}>
          Um pequeno jabuti xereta viu dez cegonhas felizes
        </span>
      </td>
      <td className="px-8 py-8">
        <div className="flex items-center gap-2">
          <code className="text-won-text-p3 bg-won-colors-brand-secondary px-3 py-1 rounded-lg text-won-colors-brand-primary-0 font-mono">{tailwindClass}</code>
          <Copy className="w-3 h-3 text-won-colors-content-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </td>
      <td className="px-8 py-8">
        <div className="space-y-1">
          <div className="text-won-text-p3 text-won-colors-content-secondary font-mono">
            Tamanho: <span className="text-won-colors-brand-tertiary font-won-bold">{size}</span>
          </div>
          <div className="text-won-text-p3 text-won-colors-content-secondary font-mono">
            Linha: <span className="text-won-colors-brand-tertiary font-won-bold">{line}</span>
          </div>
        </div>
      </td>
    </tr>
  );
}
