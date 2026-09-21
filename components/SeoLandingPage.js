'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Crown, ExternalLink, Gauge, ListMusic, Music2, Search, Server, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { azeliaBrand, azeliaCommands, azeliaPremiumPlans, azeliaTeam } from '../lib/azelia-data';
import { SEO_COMMON_SECTIONS, seoPageMap } from '../lib/seo-pages';

function Section({ title, children }) {
  return (
    <section className="space-y-4 scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{title}</h2>
      <div className="space-y-4 text-sm sm:text-base leading-8 text-gray-400">{children}</div>
    </section>
  );
}

function Cards({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {items.map(([title, description]) => (
        <article key={title} className="rounded-3xl border border-white/[0.07] bg-[#121019] p-6 sm:p-7 hover:border-azelia-accent/30 hover:bg-[#161220] transition-all">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-azelia-accent/10 text-purple-300 flex items-center justify-center">
              <Music2 className="h-4 w-4" />
            </div>
            <h3 className="text-base font-extrabold text-white">{title}</h3>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-400">{description}</p>
        </article>
      ))}
    </div>
  );
}

function Faq({ items }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {items.map(([q, a]) => (
          <details key={q} className="group rounded-3xl border border-white/[0.06] bg-[#121019] overflow-hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-white">
              <span>{q}</span>
              <ArrowRight className="h-4 w-4 text-gray-600 transition-transform group-open:rotate-90" />
            </summary>
            <div className="border-t border-white/[0.05] px-6 py-5 text-sm leading-7 text-gray-400">{a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {azeliaPremiumPlans.map((plan, index) => (
        <article key={plan.name} className={`rounded-3xl border p-6 sm:p-7 ${index === 1 ? 'border-azelia-accent/40 bg-gradient-to-b from-azelia-accent/10 to-[#121019]' : 'border-white/[0.07] bg-[#121019]'}`}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-black text-white">{plan.name}</h3>
            {index > 0 && <Crown className="h-5 w-5 text-azelia-gold" />}
          </div>
          <div className="mt-4 text-2xl font-black text-purple-200">{plan.price}</div>
          <p className="mt-3 text-sm leading-7 text-gray-400">{plan.description}</p>
          <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-xs font-bold text-gray-300">{plan.scope} scope</div>
        </article>
      ))}
    </div>
  );
}

function CommandGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {azeliaCommands.map((command) => (
        <article key={`${command.category}-${command.name}`} className="rounded-3xl border border-white/[0.06] bg-[#121019] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-sm font-bold text-purple-300">{azeliaBrand.defaultPrefix}{command.name}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">{command.categoryLabel || command.category}</div>
            </div>
            {command.slash && <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-300">Slash</span>}
          </div>
          <p className="mt-4 text-xs leading-6 text-gray-400">{command.description || 'Command metadata is available in the current Azelia catalog.'}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-lg bg-white/5 px-2 py-1 text-[10px] font-mono text-gray-500">{azeliaBrand.defaultPrefix}{command.usage || command.name}</span>
            {(command.category || '').includes('premium') && <span className="rounded-lg bg-amber-400/10 px-2 py-1 text-[10px] font-bold text-amber-300">Premium</span>}
          </div>
        </article>
      ))}
    </div>
  );
}

function TeamCards() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {azeliaTeam.map((member) => (
        <article key={member.id} className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
          <img src="/azelia-pfp.png" alt="" className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/10" />
          <h3 className="mt-5 text-lg font-black text-white">{member.name}</h3>
          <div className="mt-1 text-xs font-bold text-purple-300">{member.role}</div>
          <p className="mt-4 text-xs leading-6 text-gray-500">Team identity synchronized from the Azelia project configuration.</p>
        </article>
      ))}
    </div>
  );
}

function SitemapLinks() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.values(seoPageMap).map((page) => (
        <Link key={page.slug} href={`/${page.slug}`} className="rounded-2xl border border-white/[0.06] bg-[#121019] px-4 py-4 hover:border-azelia-accent/25 transition-colors">
          <div className="text-sm font-bold text-white">{page.title}</div>
          <div className="mt-1 text-[11px] text-gray-500">{page.keyword}</div>
        </Link>
      ))}
    </div>
  );
}

export default function SeoLandingPage({ page }) {
  const commonSections = SEO_COMMON_SECTIONS;
  const isLegal = page.kind === 'legal';

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#110d1a] p-8 sm:p-12 lg:p-14">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,rgba(112,77,237,.45),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(218,44,255,.25),transparent_35%)]" />
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-azelia-accent/30 bg-azelia-accent/10 px-4 py-2 text-xs font-bold text-purple-200">
            <Sparkles className="h-4 w-4 text-azelia-accent" />
            {azeliaBrand.name} · {page.keyword}
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">{page.title}</h1>
          <p className="mt-5 max-w-3xl text-base sm:text-lg leading-8 text-gray-300">{page.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Primary topic: {page.keyword}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Azelia Music System</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">ZorveX Development</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/inviteAzelia" className="inline-flex items-center gap-2 rounded-2xl bg-azelia-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-azelia-accent/20">
              Invite Azelia <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/commands" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-white">
              Browse Commands <ListMusic className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {!isLegal && (
        <Section title={`Why ${page.keyword} matters`}>
          <p>
            The search term “{page.keyword}” can describe many different products, so this page focuses on the parts that directly affect a Discord listening session: source resolution, player behavior, queue state, voice connectivity, filters and server controls. Azelia's architecture keeps those parts connected while still separating the public website from protected bot and API credentials.
          </p>
          <p>
            {page.audience ? `This page is written for ${page.audience}.` : 'This page is written for Discord users and server administrators evaluating Azelia.'} The goal is practical information rather than a generic feature dump. A feature is useful when users can understand how it behaves, what scope it applies to and what external dependencies can affect it.
          </p>
        </Section>
      )}

      {page.cards?.length > 0 && (
        <Section title="Core capabilities">
          <Cards items={page.cards} />
        </Section>
      )}

      {page.premium && (
        <Section title="Azelia pricing and Premium scope">
          <Pricing />
          <p className="mt-5">The public model is Free at ₹0/month, User Premium at ₹49/month and Guild Premium at ₹99/month. No-Prefix is treated as a User Premium capability rather than a fourth standalone plan.</p>
        </Section>
      )}

      {page.commands && (
        <Section title="Command reference">
          <p>Commands below are rendered from the current Azelia dashboard data. The configured default prefix is <strong className="text-white">{azeliaBrand.defaultPrefix}</strong>. Slash capability appears only on commands whose source metadata enables it.</p>
          <CommandGrid />
        </Section>
      )}

      {page.slug === 'azeliaTeam' && (
        <Section title="Current team configuration">
          <TeamCards />
        </Section>
      )}

      {page.slug === 'sitemap' && (
        <Section title="Public page index">
          <SitemapLinks />
        </Section>
      )}

      {page.sections && (
        <div className="space-y-12">
          {page.sections.map(([title, text]) => (
            <Section key={title} title={title}><p>{text}</p></Section>
          ))}
        </div>
      )}

      {!isLegal && (
        <div className="space-y-12">
          {commonSections.map(([title, text]) => (
            <Section key={title} title={title}><p>{text}</p><p>Azelia's current product model connects this topic with {page.focus}. That relationship matters because music features rarely operate in isolation: source resolution affects queue behavior, playback affects filter state, and server settings affect who can control the session.</p></Section>
          ))}
          {page.extended && (
            <>
              <Section title="A practical evaluation checklist">
                <p>Before choosing or troubleshooting a Discord music bot, verify the source you actually use, confirm the queue and playback actions you expect, test voice permissions, inspect the available filters and understand which features are Free versus Premium.</p>
                <p>For dashboard workflows, check that Discord OAuth is used, permissions are validated on the server, API credentials stay private, and invalid or missing backend state is reported honestly. A polished interface should not be allowed to create a false sense of authorization.</p>
                <p>For long-running sessions, check 24/7 settings, Lavalink node health and the behavior of an empty queue. For Premium, compare scope and limits rather than only the number of advertised features.</p>
              </Section>
              <Section title="Why the Azelia model stays source-aware">
                <p>Different music providers expose different kinds of metadata and availability. A responsible music bot can present a unified Discord experience while still explaining that source-side changes, rights restrictions or resolver behavior can affect individual requests.</p>
                <p>Azelia therefore treats the resolver as a distinct part of the architecture. This makes provider pages useful without claiming that every provider uses identical transport, metadata or availability rules.</p>
              </Section>
            </>
          )}
        </div>
      )}

      <Faq items={page.faq || []} />

      <section className="rounded-[2rem] border border-azelia-accent/20 bg-gradient-to-br from-azelia-accent/10 via-[#121019] to-[#121019] p-8 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-purple-300"><ShieldCheck className="h-4 w-4" /> Built around Azelia's current product model</div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">Bring the music workflow back into Discord</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400">Use the product pages, command catalog and dashboard together so source behavior, server permissions and Premium scope stay understandable.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/inviteAzelia" className="inline-flex items-center gap-2 rounded-2xl bg-azelia-accent px-5 py-3.5 text-sm font-extrabold text-white">Invite Azelia <ArrowRight className="h-4 w-4" /></Link>
            <a href="https://discordbotlist.com/bots/azelia/upvote" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-5 py-3.5 text-sm font-extrabold text-amber-200">Vote on DiscordBotList <ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      {page.related?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Related Azelia pages</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {page.related.map((slug) => {
              const related = seoPageMap[slug];
              if (!related) return null;
              return <Link key={slug} href={`/${slug}`} className="rounded-2xl border border-white/[0.06] bg-[#121019] p-4 hover:border-azelia-accent/25 transition-colors"><div className="text-sm font-bold text-white">{related.title}</div><div className="mt-1 text-[11px] text-gray-500">{related.keyword}</div></Link>;
            })}
          </div>
        </section>
      )}
    </div>
  );
}
