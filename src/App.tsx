/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Palette, 
  Type, 
  Code, 
  Terminal, 
  ExternalLink, 
  Download, 
  Layers, 
  Zap,
  Box,
  Ruler,
  Square,
  ShoppingCart,
  CreditCard,
  Bell,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from './components/Button';

interface Toast {
  id: number;
  message: string;
}

const EXPORT_THEME_BLOCK = `:root {
  /* Brand Colors */
  --won-color-brand-primary-0: #B01F29;
  --won-color-brand-primary-1: #892028;
  --won-color-brand-primary-2: #64131A;
  --won-color-brand-secondary: #F4F4F2;
  --won-color-brand-tertiary: #1D1D1B;

  /* Surface Colors */
  --won-color-surface-background: #FEFEFE;
  --won-color-surface-cards: #FFFFFF;

  /* Complementary Colors */
  --won-color-complementary-green: #15B37D;
  --won-color-complementary-orange: #E67E22;
  --won-color-complementary-red: #C0392B;
  --won-color-complementary-blue: #3470B7;

  /* Interactive States */
  --won-color-interactive-pressed: rgba(0, 0, 0, 0.2);
  --won-color-interactive-hover: #FFFFFF;
  --won-color-interactive-active: #FFFFFF;

  /* Border */
  --won-color-border-default: #E6E6E6;

  /* Content/Text */
  --won-color-content-primary: #1D1D1B;
  --won-color-content-secondary: #4A5565;
  --won-color-content-tertiary: #6A7282;

  /* Typography */
  --won-font-family-heading: "Degular Variable", sans-serif;
  --won-font-family-body: "Manrope", sans-serif;

  --won-font-weight-regular: 400;
  --won-font-weight-semibold: 600;
  --won-font-weight-bold: 700;
  --won-font-weight-extrabold: 800;

  /* Font Scale */
  --won-font-size-2xl: 2.5rem;
  --won-line-height-2xl: 3rem;
  --won-font-size-xl: 2rem;
  --won-line-height-xl: 2.5rem;
  --won-font-size-lg: 1.5rem;
  --won-line-height-lg: 2rem;
  --won-font-size-md: 1.25rem;
  --won-line-height-md: 1.75rem;
  --won-font-size-base: 1rem;
  --won-line-height-base: 1.5rem;
  --won-font-size-sm: 0.875rem;
  --won-line-height-sm: 1.375rem;
  --won-font-size-xs: 0.75rem;
  --won-line-height-xs: 1.25rem;
  --won-font-size-2xs: 0.625rem;
  --won-line-height-2xs: 1rem;

  /* Spacing */
  --won-spacing-0: 0;
  --won-spacing-1: 0.25rem;
  --won-spacing-2: 0.5rem;
  --won-spacing-3: 0.75rem;
  --won-spacing-4: 1rem;
  --won-spacing-6: 1.5rem;
  --won-spacing-8: 2rem;
  --won-spacing-12: 3rem;
  --won-spacing-16: 4rem;

  /* Border Radius */
  --won-radius-sm: 0.25rem;
  --won-radius-md: 0.5rem;
  --won-radius-lg: 0.75rem;
  --won-radius-xl: 1rem;
  --won-radius-full: 9999px;
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
    <div className="min-h-screen bg-won-surface-background selection:bg-won-brand-primary-0 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-won-border-default bg-white hidden lg:flex flex-col z-20">
        <div className="p-8 border-b border-won-border-default">
          <div className="flex items-center gap-won-3 mb-won-2">
            <div className="w-won-8 h-won-8 bg-won-brand-primary-0 rounded flex items-center justify-center text-white font-won-heading font-won-bold text-won-md">
              W
            </div>
            <span className="font-won-heading font-won-bold text-won-md tracking-tight">Won Cred</span>
          </div>
          <p className="text-won-2xs text-won-content-tertiary uppercase tracking-widest font-won-semibold">Sistema de Design v1.0</p>
        </div>
        <nav className="flex-1 p-won-4 space-y-won-1">
          <NavItem href="#foundation" icon={<Layers className="w-4 h-4" />} label="Fundação" />
          <NavItem href="#colors" icon={<Palette className="w-4 h-4" />} label="Cores" />
          <NavItem href="#typography" icon={<Type className="w-4 h-4" />} label="Tipografia" />
          <NavItem href="#spacing" icon={<Ruler className="w-4 h-4" />} label="Espaçamento" />
          <NavItem href="#radius" icon={<Square className="w-4 h-4" />} label="Raio de Borda" />
          <NavItem href="#base-styles" icon={<Zap className="w-4 h-4" />} label="Estilos Base" />
          <NavItem href="#components" icon={<Box className="w-4 h-4" />} label="Componentes" />
          <NavItem href="#export" icon={<Terminal className="w-4 h-4" />} label="Exportação" />
        </nav>
        <div className="p-won-6 border-t border-won-border-default">
          <button 
            onClick={() => copyToClipboard(EXPORT_THEME_BLOCK)}
            className="w-full py-won-3 bg-won-brand-tertiary text-white rounded-won-lg text-won-xs font-won-semibold flex items-center justify-center gap-won-2 hover:bg-black transition-colors"
          >
            <Download className="w-4 h-4" /> Copiar Bloco de Tema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-10 bg-won-surface-background/80 backdrop-blur-md border-b border-won-border-default lg:hidden">
          <div className="px-won-6 h-won-16 flex items-center justify-between">
            <div className="flex items-center gap-won-2">
              <div className="w-won-6 h-won-6 bg-won-brand-primary-0 rounded flex items-center justify-center text-white font-won-heading font-won-bold text-won-xs">
                W
              </div>
              <span className="font-won-heading font-won-bold text-won-base">Won Cred</span>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-8 py-16 space-y-32">
          {/* Foundation */}
          <section id="foundation" className="scroll-mt-24 space-y-won-8">
            <div className="space-y-won-4">
              <h1 className="font-won-heading font-won-extrabold text-won-2xl tracking-tight text-won-brand-tertiary">
                Fundação
              </h1>
              <p className="text-won-md text-won-content-secondary leading-relaxed max-w-3xl">
                O sistema de design Won Cred fornece uma linguagem unificada para nossos produtos digitais. 
                Ele é construído sobre uma base de precisão, clareza e confiança.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-won-6">
              <FeatureCard 
                icon={<Zap className="w-5 h-5 text-won-complementary-orange" />}
                title="Tokens Atômicos"
                description="Os menores blocos de construção da nossa interface, de cores a espaçamento."
              />
              <FeatureCard 
                icon={<Code className="w-5 h-5 text-won-complementary-blue" />}
                title="Pronto para Dev"
                description="Os tokens possuem prefixo e estão prontos para implementação instantânea."
              />
              <FeatureCard 
                icon={<Terminal className="w-5 h-5 text-won-complementary-green" />}
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
                  { name: 'won-color-brand-primary-0', value: '#B01F29' },
                  { name: 'won-color-brand-primary-1', value: '#892028' },
                  { name: 'won-color-brand-primary-2', value: '#64131A' },
                  { name: 'won-color-brand-secondary', value: '#F4F4F2' },
                  { name: 'won-color-brand-tertiary', value: '#1D1D1B' },
                ]}
              />
              <ColorGrid 
                title="Superfície" 
                onCopy={copyToClipboard}
                tokens={[
                  { name: 'won-color-surface-background', value: '#FEFEFE' },
                  { name: 'won-color-surface-cards', value: '#FFFFFF' },
                ]}
              />
              <ColorGrid 
                title="Complementares" 
                onCopy={copyToClipboard}
                tokens={[
                  { name: 'won-color-complementary-green', value: '#15B37D' },
                  { name: 'won-color-complementary-orange', value: '#E67E22' },
                  { name: 'won-color-complementary-red', value: '#C0392B' },
                  { name: 'won-color-complementary-blue', value: '#3470B7' },
                ]}
              />
              <div className="grid md:grid-cols-2 gap-12">
                <ColorGrid 
                  title="Interativos" 
                  onCopy={copyToClipboard}
                  tokens={[
                    { name: 'won-color-interactive-pressed', value: 'rgba(0,0,0,0.2)' },
                    { name: 'won-color-interactive-hover', value: '#FFFFFF' },
                    { name: 'won-color-interactive-active', value: '#FFFFFF' },
                  ]}
                />
                <ColorGrid 
                  title="Borda" 
                  onCopy={copyToClipboard}
                  tokens={[
                    { name: 'won-color-border-default', value: '#E6E6E6' },
                  ]}
                />
              </div>
              <ColorGrid 
                title="Conteúdo" 
                onCopy={copyToClipboard}
                tokens={[
                  { name: 'won-color-content-primary', value: '#1D1D1B' },
                  { name: 'won-color-content-secondary', value: '#4A5565' },
                  { name: 'won-color-content-tertiary', value: '#6A7282' },
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
                  token="won-font-family-heading" 
                  usage="Uso: Títulos, Cabeçalhos, Botões"
                  onCopy={copyToClipboard}
                  className="font-won-heading"
                />
                <FontFamilyCard 
                  name="Manrope" 
                  token="won-font-family-body" 
                  usage="Uso: Texto de Corpo, Parágrafos, Dados"
                  onCopy={copyToClipboard}
                  className="font-won-body"
                />
              </div>

              {/* Type Scale */}
              <div className="space-y-6">
                <h3 className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">Escala Tipográfica</h3>
                <div className="bg-white border border-won-border-default rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-won-brand-secondary/50 border-b border-won-border-default">
                        <th className="px-8 py-4 text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-wider">Prévia</th>
                        <th className="px-8 py-4 text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-wider">Token</th>
                        <th className="px-8 py-4 text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-wider">Especificações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-won-border-default">
                      <TypeRow onCopy={copyToClipboard} token="won-2xl" size="2.5rem (40px)" line="3rem (48px)" />
                      <TypeRow onCopy={copyToClipboard} token="won-xl" size="2rem (32px)" line="2.5rem (40px)" />
                      <TypeRow onCopy={copyToClipboard} token="won-lg" size="1.5rem (24px)" line="2rem (32px)" />
                      <TypeRow onCopy={copyToClipboard} token="won-md" size="1.25rem (20px)" line="1.75rem (28px)" />
                      <TypeRow onCopy={copyToClipboard} token="won-base" size="1rem (16px)" line="1.5rem (24px)" />
                      <TypeRow onCopy={copyToClipboard} token="won-sm" size="0.875rem (14px)" line="1.375rem (22px)" />
                      <TypeRow onCopy={copyToClipboard} token="won-xs" size="0.75rem (12px)" line="1.25rem (20px)" />
                      <TypeRow onCopy={copyToClipboard} token="won-2xs" size="0.625rem (10px)" line="1rem (16px)" />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Spacing */}
          <section id="spacing" className="scroll-mt-24 space-y-12">
            <SectionHeader title="Espaçamento" icon={<Ruler className="w-6 h-6" />} />
            
            <div className="space-y-16">
              <div className="space-y-6">
                <h3 className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">Escala de Espaçamento</h3>
                <div className="bg-white border border-won-border-default rounded-2xl p-4 space-y-2">
                  <SpacingRow onCopy={copyToClipboard} token="1" value="0.25rem (4px)" />
                  <SpacingRow onCopy={copyToClipboard} token="2" value="0.5rem (8px)" />
                  <SpacingRow onCopy={copyToClipboard} token="3" value="0.75rem (12px)" />
                  <SpacingRow onCopy={copyToClipboard} token="4" value="1rem (16px)" />
                  <SpacingRow onCopy={copyToClipboard} token="6" value="1.5rem (24px)" />
                  <SpacingRow onCopy={copyToClipboard} token="8" value="2rem (32px)" />
                  <SpacingRow onCopy={copyToClipboard} token="12" value="3rem (48px)" />
                  <SpacingRow onCopy={copyToClipboard} token="16" value="4rem (64px)" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">Referência: Botões</h3>
                  <div className="p-8 bg-white border border-won-border-default rounded-2xl flex flex-col items-center gap-8">
                    <div className="relative group">
                      <Button>Botão Padrão</Button>
                      <div className="absolute -inset-x-4 top-0 bottom-0 border-x border-dashed border-won-brand-primary-0/40 pointer-events-none flex items-center justify-between px-1">
                        <span className="text-[8px] font-mono text-won-brand-primary-0 -rotate-90">won-6</span>
                        <span className="text-[8px] font-mono text-won-brand-primary-0 -rotate-90">won-6</span>
                      </div>
                      <div className="absolute -inset-y-3 left-0 right-0 border-y border-dashed border-won-brand-primary-0/40 pointer-events-none flex flex-col justify-between py-1">
                        <span className="text-[8px] font-mono text-won-brand-primary-0 text-center">won-3</span>
                        <span className="text-[8px] font-mono text-won-brand-primary-0 text-center">won-3</span>
                      </div>
                    </div>
                    <p className="text-won-xs text-won-content-secondary text-center">
                      Botões utilizam <code className="text-won-brand-primary-0">won-6</code> (24px) de padding horizontal e <code className="text-won-brand-primary-0">won-3</code> (12px) vertical.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">Referência: Cards</h3>
                  <div className="p-8 bg-white border border-won-border-default rounded-2xl space-y-4">
                    <div className="p-won-6 bg-won-brand-secondary rounded-won-xl border border-won-border-default relative">
                      <div className="absolute inset-0 border-won-brand-primary-0/20 border-[24px] pointer-events-none" />
                      <div className="h-20 bg-white rounded-lg flex items-center justify-center text-won-2xs font-mono text-won-content-tertiary">
                        Conteúdo do Card
                      </div>
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-mono text-won-brand-primary-0">won-6 (24px) padding</div>
                    </div>
                    <p className="text-won-xs text-won-content-secondary text-center">
                      Cards padrão utilizam <code className="text-won-brand-primary-0">won-6</code> (24px) de padding interno.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Border Radius */}
          <section id="radius" className="scroll-mt-24 space-y-12">
            <SectionHeader title="Raio de Borda" icon={<Square className="w-6 h-6" />} />
            
            <div className="space-y-16">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <RadiusCard onCopy={copyToClipboard} token="sm" value="0.25rem (4px)" />
                <RadiusCard onCopy={copyToClipboard} token="md" value="0.5rem (8px)" />
                <RadiusCard onCopy={copyToClipboard} token="lg" value="0.75rem (12px)" />
                <RadiusCard onCopy={copyToClipboard} token="xl" value="1rem (16px)" />
                <RadiusCard onCopy={copyToClipboard} token="full" value="9999px" />
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">Aplicação: Botões</h3>
                  <div className="p-8 bg-white border border-won-border-default rounded-2xl flex flex-wrap justify-center gap-6">
                    <div className="space-y-2 text-center">
                      <Button className="rounded-won-sm">Small Radius</Button>
                      <span className="text-[10px] font-mono text-won-content-tertiary">won-sm</span>
                    </div>
                    <div className="space-y-2 text-center">
                      <Button className="rounded-won-lg">Default Radius</Button>
                      <span className="text-[10px] font-mono text-won-content-tertiary">won-lg</span>
                    </div>
                    <div className="space-y-2 text-center">
                      <Button className="rounded-won-full">Full Radius</Button>
                      <span className="text-[10px] font-mono text-won-content-tertiary">won-full</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">Aplicação: Cards</h3>
                  <div className="p-8 bg-white border border-won-border-default rounded-2xl flex flex-col gap-6">
                    <div className="p-4 bg-won-brand-secondary rounded-won-xl border border-won-border-default text-center">
                      <span className="text-won-xs font-won-bold">Card XL Radius</span>
                      <p className="text-[10px] text-won-content-tertiary">Usado para containers principais</p>
                    </div>
                    <div className="p-4 bg-won-brand-secondary rounded-won-2xl border border-won-border-default text-center">
                      <span className="text-won-xs font-won-bold">Card 2XL Radius</span>
                      <p className="text-[10px] text-won-content-tertiary">Usado para modais e seções grandes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Base Styles */}
          <section id="base-styles" className="scroll-mt-24 space-y-12">
            <SectionHeader title="Estilos Base" icon={<Zap className="w-6 h-6" />} />
            <div className="space-y-6">
              <p className="text-won-md text-won-content-secondary leading-relaxed max-w-3xl">
                Estes são os estilos padrão aplicados aos elementos HTML básicos. 
                Eles garantem que, mesmo sem classes utilitárias específicas, seu conteúdo permaneça alinhado à marca.
              </p>
              <div className="p-8 bg-white border border-won-border-default rounded-2xl space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-won-content-tertiary">Elemento H1</span>
                  <h1>Um pequeno jabuti xereta viu dez cegonhas felizes</h1>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-won-content-tertiary">Elemento H2</span>
                  <h2>Um pequeno jabuti xereta viu dez cegonhas felizes</h2>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-won-content-tertiary">Elemento H3</span>
                  <h3>Um pequeno jabuti xereta viu dez cegonhas felizes</h3>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-won-content-tertiary">Elemento de Parágrafo</span>
                  <p>
                    O sistema de design Won Cred fornece uma linguagem unificada para nossos produtos digitais. 
                    Ele é construído sobre uma base de precisão, clareza e confiança. 
                    Nossa tipografia garante que a informação seja acessível e legível em todas as plataformas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Components */}
          <section id="components" className="scroll-mt-24 space-y-won-12">
            <SectionHeader title="Componentes" icon={<Box className="w-6 h-6" />} />
            
            <div className="space-y-won-16">
              {/* Buttons */}
              <div className="space-y-won-8">
                <div className="space-y-won-2">
                  <h3 className="text-won-md font-won-bold text-won-brand-tertiary">Botões</h3>
                  <p className="text-won-sm text-won-content-secondary">
                    Nossa biblioteca de botões suporta múltiplos estados, variantes e esquemas de cores.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-won-8">
                  {/* Basic Variants */}
                  <div className="p-won-8 bg-white border border-won-border-default rounded-won-2xl space-y-won-8">
                    <div className="space-y-won-4">
                      <span className="text-won-2xs font-mono text-won-content-tertiary uppercase tracking-widest">Variantes Básicas</span>
                      <div className="flex flex-wrap gap-won-4">
                        <div className="space-y-won-2">
                          <span className="text-won-2xs block text-center text-won-content-tertiary">Solid</span>
                          <Button>Próximo</Button>
                        </div>
                        <div className="space-y-won-2">
                          <span className="text-won-2xs block text-center text-won-content-tertiary">Outline</span>
                          <Button variant="outline" colorScheme="neutral">Voltar</Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-won-4">
                      <span className="text-won-2xs font-mono text-won-content-tertiary uppercase tracking-widest">Com Ícones</span>
                      <div className="flex flex-wrap gap-won-4">
                        <Button icon={<ShoppingCart className="w-4 h-4" />}>Comprar Agora</Button>
                        <Button variant="outline" icon={<ShoppingCart className="w-4 h-4" />}>Adicionar ao Carrinho</Button>
                      </div>
                    </div>
                  </div>

                  {/* Color Schemes */}
                  <div className="p-won-8 bg-white border border-won-border-default rounded-won-2xl space-y-won-8">
                    <div className="space-y-won-4">
                      <span className="text-won-2xs font-mono text-won-content-tertiary uppercase tracking-widest">Esquemas de Cores</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-won-4">
                        <Button colorScheme="confirm" icon={<CreditCard className="w-4 h-4" />}>Finalizar compra</Button>
                        <Button colorScheme="primary" icon={<ArrowRight className="w-4 h-4" />}>Próximo Passo</Button>
                        <Button colorScheme="neutral" icon={<Bell className="w-4 h-4" />}>Avise-me</Button>
                        <Button colorScheme="cancel">Cancelar Pedido</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* States Documentation */}
                <div className="bg-won-brand-tertiary rounded-won-2xl p-won-8 overflow-hidden">
                  <div className="flex items-center gap-won-3 mb-won-8">
                    <Zap className="w-5 h-5 text-won-complementary-orange" />
                    <h4 className="text-white font-won-bold text-won-md">Estados e Comportamento</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-won-8 text-white/80 text-won-xs">
                    <div className="space-y-won-2">
                      <div className="font-won-bold text-white">Hover</div>
                      <p>Aumenta a profundidade visual ou altera levemente o brilho para indicar interatividade.</p>
                    </div>
                    <div className="space-y-won-2">
                      <div className="font-won-bold text-white">Active / Pressed</div>
                      <p>Reduz levemente a escala (98%) para fornecer feedback tátil imediato ao clique.</p>
                    </div>
                    <div className="space-y-won-2">
                      <div className="font-won-bold text-white">Disabled</div>
                      <p>Reduz a opacidade e remove eventos de ponteiro para ações não disponíveis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Developer Export */}
          <section id="export" className="scroll-mt-24 space-y-won-8">
            <SectionHeader title="Exportação para Desenvolvedores" icon={<Terminal className="w-6 h-6" />} />
            <div className="bg-won-brand-tertiary rounded-won-2xl p-won-8 relative group">
              <div className="flex items-center justify-between mb-won-6">
                <div className="flex items-center gap-won-2">
                  <div className="w-won-3 h-won-3 rounded-won-full bg-red-500" />
                  <div className="w-won-3 h-won-3 rounded-won-full bg-yellow-500" />
                  <div className="w-won-3 h-won-3 rounded-won-full bg-green-500" />
                  <span className="ml-won-4 text-won-2xs text-won-content-tertiary font-mono">tailwind-theme.css</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(EXPORT_THEME_BLOCK)}
                  className="px-won-4 py-won-2 bg-white/10 text-white rounded-won-lg text-won-2xs font-won-semibold flex items-center gap-won-2 hover:bg-white/20 transition-colors"
                >
                  <Copy className="w-3 h-3" /> Copiar Tema
                </button>
              </div>
              <pre className="text-won-xs text-won-brand-secondary font-mono overflow-x-auto leading-relaxed">
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
              className="bg-won-brand-tertiary text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10"
            >
              <Check className="w-4 h-4 text-won-complementary-green" />
              <span className="text-won-sm font-won-semibold">{toast.message}</span>
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
      className="flex items-center gap-3 px-4 py-3 text-won-sm text-won-content-secondary hover:text-won-brand-primary-0 hover:bg-won-brand-secondary rounded-lg transition-all font-won-semibold group"
    >
      <span className="text-won-content-tertiary group-hover:text-won-brand-primary-0 transition-colors">{icon}</span>
      {label}
    </a>
  );
}

function SectionHeader({ title, icon }: { title: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-4 border-b border-won-border-default pb-6">
      <div className="w-12 h-12 bg-won-brand-secondary rounded-xl flex items-center justify-center text-won-brand-primary-0">
        {icon}
      </div>
      <h2 className="font-won-heading font-won-bold text-won-xl text-won-brand-tertiary">{title}</h2>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white border border-won-border-default rounded-2xl space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="w-10 h-10 bg-won-brand-secondary rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-won-heading font-won-bold text-won-base">{title}</h3>
      <p className="text-won-xs text-won-content-secondary leading-relaxed">{description}</p>
    </div>
  );
}

function ColorGrid({ title, tokens, onCopy }: { title: string; tokens: { name: string; value: string }[]; onCopy: (t: string) => void }) {
  const getDisplayName = (name: string) => {
    return name
      .replace('won-color-brand-', '')
      .replace('won-color-surface-', '')
      .replace('won-color-complementary-', '')
      .replace('won-color-interactive-', '')
      .replace('won-color-border-', '')
      .replace('won-color-content-', '');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tokens.map((token) => (
          <button
            key={token.name}
            onClick={() => onCopy(token.name)}
            className="group text-left space-y-3 transition-all active:scale-95"
          >
            <div 
              className="aspect-square rounded-2xl border border-won-border-default shadow-sm relative overflow-hidden group-hover:shadow-xl transition-all"
              style={{ backgroundColor: token.value }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-[2px]">
                <Copy className="w-6 h-6 text-white drop-shadow-md" />
              </div>
            </div>
            <div>
              <div className="text-won-xs font-won-bold truncate text-won-brand-tertiary">{getDisplayName(token.name)}</div>
              <div className="text-won-2xs text-won-content-tertiary font-mono uppercase">{token.value}</div>
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
    <div className="p-8 bg-white border border-won-border-default rounded-2xl space-y-6 hover:border-won-brand-primary-0 transition-colors group">
      <div className="space-y-1">
        <span className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">Família de Fontes</span>
        <h3 className={`text-won-2xl ${className} text-won-brand-tertiary`}>{name}</h3>
      </div>
      <div className="space-y-4">
        <p className="text-won-sm text-won-content-secondary">{usage}</p>
        <button 
          onClick={() => onCopy(tailwindClass)}
          className="flex items-center gap-2 text-won-xs font-won-semibold text-won-brand-primary-0 hover:underline"
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
      className="group hover:bg-won-brand-secondary/30 cursor-pointer transition-colors"
      onClick={() => onCopy(tailwindClass)}
    >
      <td className="px-8 py-8">
        <span className={`${tailwindClass} font-won-heading font-won-bold truncate block text-won-brand-tertiary`}>
          Um pequeno jabuti xereta viu dez cegonhas felizes
        </span>
      </td>
      <td className="px-8 py-8">
        <div className="flex items-center gap-2">
          <code className="text-won-xs bg-won-brand-secondary px-3 py-1 rounded-lg text-won-brand-primary-0 font-mono">{tailwindClass}</code>
          <Copy className="w-3 h-3 text-won-content-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </td>
      <td className="px-8 py-8">
        <div className="space-y-1">
          <div className="text-won-xs text-won-content-secondary font-mono">
            Tamanho: <span className="text-won-brand-tertiary font-won-bold">{size}</span>
          </div>
          <div className="text-won-xs text-won-content-secondary font-mono">
            Linha: <span className="text-won-brand-tertiary font-won-bold">{line}</span>
          </div>
        </div>
      </td>
    </tr>
  );
}

function SpacingRow({ token, value, onCopy }: { token: string; value: string; onCopy: (t: string) => void }) {
  const displayToken = `won-${token}`;
  return (
    <div 
      className="flex items-center gap-8 p-4 hover:bg-won-brand-secondary/30 rounded-xl transition-colors group cursor-pointer" 
      onClick={() => onCopy(displayToken)}
    >
      <div className="w-24 text-won-xs font-mono text-won-content-tertiary uppercase tracking-widest">{displayToken}</div>
      <div className="flex-1 flex items-center gap-4">
        <div 
          className="bg-won-brand-primary-0/20 h-4 rounded-sm transition-all group-hover:bg-won-brand-primary-0/40" 
          style={{ width: `var(--won-spacing-${token})` }} 
        />
        <span className="text-won-xs font-mono text-won-content-secondary">{value}</span>
      </div>
      <Copy className="w-4 h-4 text-won-content-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function RadiusCard({ token, value, onCopy }: { token: string; value: string; onCopy: (t: string) => void }) {
  const tailwindClass = `rounded-won-${token}`;
  return (
    <div 
      className="p-6 bg-white border border-won-border-default rounded-2xl space-y-4 hover:border-won-brand-primary-0 transition-all group cursor-pointer shadow-sm hover:shadow-md"
      onClick={() => onCopy(tailwindClass)}
    >
      <div className="flex items-center justify-between">
        <span className="text-won-2xs font-won-bold text-won-content-tertiary uppercase tracking-widest">{token}</span>
        <Copy className="w-3 h-3 text-won-content-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div 
        className={`w-full aspect-square bg-won-brand-secondary border-2 border-dashed border-won-brand-primary-0/20 ${tailwindClass} flex items-center justify-center overflow-hidden`}
      >
        <div className="w-12 h-12 bg-won-brand-primary-0/10 border border-won-brand-primary-0/20 ${tailwindClass}" />
      </div>
      <div className="space-y-1">
        <div className="text-won-xs font-mono text-center text-won-brand-tertiary">{value}</div>
        <code className="block text-center text-[10px] bg-won-brand-secondary py-1 rounded-md font-mono text-won-brand-primary-0">{tailwindClass}</code>
      </div>
    </div>
  );
}
