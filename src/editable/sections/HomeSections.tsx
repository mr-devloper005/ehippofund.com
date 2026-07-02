import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, FileText, Image as ImageIcon, Megaphone, Search, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableTaskLabel, editableTaskLabelLower } from '@/editable/content/task-labels'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8 lg:px-10'

function taskLabel(task: TaskKey) {
  const config = SITE_CONFIG.tasks.find((item) => item.key === task)
  return editableTaskLabel(task, config?.label || task)
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Fresh'
}

function latestPostImages(posts: SitePost[], max = 6) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function HomePostCard({ post, href, index, wide = false }: { post: SitePost; href: string; index: number; wide?: boolean }) {
  const image = getEditablePostImage(post)
  return (
    <EditableReveal index={index}>
      <Link href={href} className={`group block overflow-hidden rounded-[16px] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1 hover:border-white/25 ${wide ? 'lg:col-span-2' : ''}`}>
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${wide ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt={post.title} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.035]" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(10,10,10,0.84))]" />
          <span className="absolute left-4 top-4 rounded-[4px] border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">{categoryOf(post)}</span>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">No. {String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-3 line-clamp-2 text-2xl font-semibold leading-tight tracking-[-0.01em] text-white">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getExcerpt(post, 150)}</p>
        </div>
      </Link>
    </EditableReveal>
  )
}

export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover ${SITE_CONFIG.name}`

  return (
    <section className="relative overflow-hidden border-b border-[var(--editable-border)] bg-[radial-gradient(circle_at_50%_18%,rgba(14,84,241,0.32),transparent_38%),#050505]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className={`${container} relative grid min-h-[760px] items-center gap-10 py-20 lg:grid-cols-[1fr_0.82fr]`}>
        <EditableReveal>
          <div className="max-w-4xl text-center lg:text-left">
            <div className="mx-auto flex w-fit items-center gap-3 text-sm font-semibold text-white/70 lg:mx-0">
              <ShieldCheck className="h-5 w-5 text-[var(--slot4-accent)]" />
              <span>4.8 trust score</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Curated daily</span>
            </div>
            <h1 className="editable-display mt-8 text-balance text-5xl font-bold uppercase leading-[1.02] tracking-[-0.02em] text-white sm:text-7xl lg:text-[80px]">
              {heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/68 lg:mx-0">{pagesContent.home.hero.description}</p>
            <form action="/search" className="mx-auto mt-9 flex max-w-2xl overflow-hidden rounded-[4px] border border-white/20 bg-black/35 backdrop-blur lg:mx-0">
              <div className="flex flex-1 items-center gap-3 px-5">
                <Search className="h-5 w-5 text-white/45" />
                <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent py-4 text-sm font-medium text-white outline-none placeholder:text-white/38" />
              </div>
              <button className="border-l border-white/20 bg-[var(--slot4-accent)] px-6 text-sm font-semibold text-white transition hover:brightness-110">Search</button>
            </form>
          </div>
        </EditableReveal>

        <EditableReveal index={2} className="hidden lg:block">
          <div className="grid rotate-[-2deg] gap-4">
            {(heroImages.length ? heroImages : ['/placeholder.svg?height=900&width=1400']).slice(0, 3).map((image, index) => (
              <div key={image} className={`overflow-hidden rounded-[16px] border border-white/10 bg-[var(--slot4-surface-bg)] ${index === 1 ? 'ml-16' : 'mr-10'}`}>
                <img src={image} alt="" className="aspect-[16/8] w-full object-cover opacity-80" />
              </div>
            ))}
          </div>
        </EditableReveal>
      </div>
      <div className="border-t border-[var(--editable-border)] bg-[#f4f5f7] text-[#333334]">
        <div className={`${container} grid gap-6 py-10 sm:grid-cols-3`}>
          {[
            ['Live records', `${pool.length}+ posts across the site`],
            ['Local context', 'Places, categories, and contact cues'],
            ['Useful reads', 'Sources saved for quick discovery'],
          ].map(([title, body], index) => (
            <EditableReveal key={title} index={index}>
              <div className="border-l border-black/15 pl-5">
                <p className="text-4xl font-semibold leading-none">{index === 0 ? '+' : ''}</p>
                <h2 className="mt-3 text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-black/60">{body}</p>
              </div>
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-20 sm:py-24 lg:py-[120px]`}>
        <EditableReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Discovery lanes</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <h2 className="editable-display max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">Browse the site by signal.</h2>
            <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-[4px] border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent)]">
              See {editableTaskLabelLower(primaryTask, taskLabel(primaryTask))} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </EditableReveal>
       
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 7)
  if (!activity.length) return null
  return (
    <section className="bg-[#f4f5f7] text-[#333334]">
      <div className={`${container} py-20 sm:py-24 lg:py-[120px]`}>
        <EditableReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Industry hit</p>
          <h2 className="editable-display mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">Fresh places and reads from the community.</h2>
        </EditableReveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {activity.map((post, index) => (
            <HomePostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} wide={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Work process', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Certified picks', title: 'Popular this month' },
  index: { eyebrow: 'Archive', title: 'More to explore' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 6), href: primaryRoute },
          { key: 'browse', posts: posts.slice(6, 12), href: primaryRoute },
          { key: 'index', posts: posts.slice(12, 18), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, sectionIndex) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={sectionIndex % 2 === 0 ? 'bg-[var(--slot4-page-bg)]' : 'bg-[var(--slot4-panel-bg)]'}>
            <div className={`${container} py-20 sm:py-24`}>
              <EditableReveal>
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                    <h2 className="editable-display mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">{copy.title}</h2>
                  </div>
                  <Link href={section.href || primaryRoute} className="inline-flex items-center gap-2 rounded-[4px] border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent)]">
                    See all <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </EditableReveal>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.posts.slice(0, 6).map((post, index) => (
                  <HomePostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[radial-gradient(circle_at_50%_0%,rgba(14,84,241,0.32),transparent_42%),#050505]">
      <div className={`${container} flex flex-col items-center gap-7 py-20 text-center sm:py-24`}>
        <EditableReveal>
          <Sparkles className="mx-auto h-7 w-7 text-[var(--slot4-accent)]" />
          <h2 className="editable-display mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">Got a place or read worth sharing?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">Submit local details, a useful source, or a community pick for the {SITE_CONFIG.name} audience.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/create" className="inline-flex items-center gap-2 rounded-[4px] border border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent)]">
              Submit now
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--editable-border)] px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40">
              Contact us
            </Link>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
