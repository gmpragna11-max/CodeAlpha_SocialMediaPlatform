'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  Bookmark,
  ChevronDown,
  Compass,
  Ellipsis,
  Flame,
  Heart,
  Home,
  Image as ImageIcon,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Share2,
  Sparkles,
  Sun,
  UserRound,
  Users,
  X,
} from 'lucide-react'

type Post = {
  id: number
  name: string
  handle: string
  avatar: string
  time: string
  text: string
  image?: string
  likes: number
  comments: number
  liked?: boolean
}

const postsSeed: Post[] = [
  {
    id: 1,
    name: 'Maya Chen',
    handle: '@mayachen',
    avatar: 'https://i.pravatar.cc/120?img=47',
    time: '18 min',
    text: 'Just shipped the first version of our community space. There is something special about building places where people can connect and share ideas.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
    likes: 248,
    comments: 32,
  },
  {
    id: 2,
    name: 'Ethan Brooks',
    handle: '@ethanbuilds',
    avatar: 'https://i.pravatar.cc/120?img=12',
    time: '1 hr',
    text: 'A good reminder for today: make the thing, share the thing, learn from the thing. Progress loves momentum.',
    likes: 184,
    comments: 18,
  },
  {
    id: 3,
    name: 'Priya Nair',
    handle: '@priyanair',
    avatar: 'https://i.pravatar.cc/120?img=32',
    time: '3 hrs',
    text: 'Weekend sketchbook pages. Collecting little details from the city before the week begins.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85',
    likes: 96,
    comments: 11,
  },
]

const people = [
  { name: 'Jordan Lee', handle: '@jordanlee', avatar: 'https://i.pravatar.cc/120?img=5', mutual: '12 mutuals' },
  { name: 'Noah Williams', handle: '@noahw', avatar: 'https://i.pravatar.cc/120?img=8', mutual: '8 mutuals' },
  { name: 'Sofia Rossi', handle: '@sofiarossi', avatar: 'https://i.pravatar.cc/120?img=44', mutual: '5 mutuals' },
]

function Avatar({ src, size = 'size-10' }: { src: string; size?: string }) {
  return <img src={src} alt="" className={`${size} rounded-full object-cover ring-2 ring-background`} />
}

export default function Page() {
  const [posts, setPosts] = useState(postsSeed)
  const [active, setActive] = useState('Home')
  const [dark, setDark] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [following, setFollowing] = useState<string[]>([])
  const [notifications, setNotifications] = useState(3)

  const filteredPosts = useMemo(() => posts.filter((post) => `${post.name} ${post.handle} ${post.text}`.toLowerCase().includes(query.toLowerCase())), [posts, query])

  function toggleLike(id: number) {
    setPosts((current) => current.map((post) => post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post))
  }

  function publish() {
    if (!draft.trim()) return
    setPosts((current) => [{ id: Date.now(), name: 'Alex Morgan', handle: '@alexmorgan', avatar: 'https://i.pravatar.cc/120?img=59', time: 'now', text: draft.trim(), likes: 0, comments: 0 }, ...current])
    setDraft('')
    setComposerOpen(false)
  }

  return (
    <div className={dark ? 'dark min-h-screen' : 'min-h-screen'}>
      <div className="app-shell min-h-screen bg-background text-foreground transition-colors duration-300">
        <header className="topbar sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
          <div className="mx-auto flex h-18 max-w-[1380px] items-center justify-between px-5 lg:px-8">
            <button onClick={() => setActive('Home')} className="flex items-center gap-3" aria-label="ConnectSphere home">
              <span className="brand-mark grid size-9 place-items-center rounded-xl text-white"><Sparkles className="size-5" /></span>
              <span className="brand-word hidden text-lg font-bold tracking-tight sm:block">Connect<span>Sphere</span></span>
            </button>
            <div className="search-wrap hidden w-full max-w-sm md:block">
              <Search className="size-4 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ConnectSphere" aria-label="Search" />
              <kbd>⌘ K</kbd>
            </div>
            <div className="flex items-center gap-2">
              <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun /> : <Moon />}</button>
              <button className="notification-button" onClick={() => { setActive('Notifications'); setNotifications(0) }} aria-label="Notifications"><Bell /><span>{notifications}</span></button>
              <button className="profile-chip hidden items-center gap-2 rounded-full border border-border bg-card p-1 pr-3 sm:flex"><Avatar src="https://i.pravatar.cc/120?img=59" size="size-8" /><span className="text-sm font-semibold">Alex Morgan</span><ChevronDown className="size-4 text-muted-foreground" /></button>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1380px] grid-cols-1 gap-8 px-5 pb-28 pt-7 lg:grid-cols-[220px_minmax(0,680px)_300px] lg:px-8">
          <aside className="sidebar hidden lg:block">
            <nav className="flex flex-col gap-2">
              {[{ label: 'Home', icon: Home }, { label: 'Explore', icon: Compass }, { label: 'Notifications', icon: Bell }, { label: 'Saved', icon: Bookmark }, { label: 'Profile', icon: UserRound }].map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => setActive(label)} className={`nav-link ${active === label ? 'active' : ''}`}><Icon /><span>{label}</span>{label === 'Notifications' && notifications > 0 ? <b>{notifications}</b> : null}</button>
              ))}
            </nav>
            <button onClick={() => setComposerOpen(true)} className="create-button mt-8"><Plus className="size-5" /> Create post</button>
            <div className="sidebar-footer"><div className="flex items-center gap-3"><Avatar src="https://i.pravatar.cc/120?img=59" /><div><p className="text-sm font-semibold">Alex Morgan</p><p className="text-xs text-muted-foreground">@alexmorgan</p></div><MoreHorizontal className="ml-auto size-4 text-muted-foreground" /></div><p className="mt-6 text-xs text-muted-foreground">© 2024 ConnectSphere<br />Made for meaningful connections.</p></div>
          </aside>

          <main className="min-w-0">
            <div className="mb-6 flex items-center justify-between"><div><p className="eyebrow">{active === 'Home' ? 'Your world, connected' : active}</p><h1 className="mt-1 text-2xl font-bold tracking-tight">{active === 'Home' ? 'Good morning, Alex' : active}</h1></div><button onClick={() => setComposerOpen(true)} className="mobile-create rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground lg:hidden"><Plus className="mr-1 inline size-4" /> Post</button></div>
            {active === 'Home' && <div className="story-row mb-6"><div className="story add-story" onClick={() => setComposerOpen(true)}><div className="story-avatar add"><Plus /></div><span>Your story</span></div>{people.map((person) => <div className="story" key={person.handle}><div className="story-avatar"><Avatar src={person.avatar} size="size-14" /></div><span>{person.name.split(' ')[0]}</span></div>)}</div>}
            <section className="composer-card mb-5 rounded-2xl border border-border bg-card p-4"><div className="flex gap-3"><Avatar src="https://i.pravatar.cc/120?img=59" /><button onClick={() => setComposerOpen(true)} className="composer-input flex-1 text-left text-sm text-muted-foreground">Share something with your sphere...</button></div><div className="mt-4 flex items-center justify-between border-t border-border pt-3"><div className="flex gap-1"><button className="composer-action" onClick={() => setComposerOpen(true)}><ImageIcon /> Image</button><button className="composer-action hidden sm:flex" onClick={() => setComposerOpen(true)}><Sparkles /> Feeling</button></div><button onClick={() => setComposerOpen(true)} className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground">Create post</button></div></section>
            <div className="flex items-center justify-between border-b border-border pb-3"><div className="flex gap-5"><button className="tab active">For you</button><button className="tab">Following</button></div><button className="text-muted-foreground"><Flame className="size-4" /></button></div>
            <div className="mt-4 flex flex-col gap-4">{filteredPosts.map((post) => <article className="post-card rounded-2xl border border-border bg-card p-5" key={post.id}><div className="flex items-start gap-3"><Avatar src={post.avatar} /><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="text-sm font-bold">{post.name}</span><span className="text-sm text-muted-foreground">{post.handle}</span><span className="text-muted-foreground">·</span><span className="text-xs text-muted-foreground">{post.time}</span><button className="ml-auto text-muted-foreground"><Ellipsis className="size-5" /></button></div><p className="post-text mt-3 text-[15px] leading-6">{post.text}</p>{post.image && <img src={post.image} alt="Post attachment" className="post-image mt-4 max-h-[390px] w-full rounded-xl object-cover" />}<div className="mt-4 flex items-center justify-between"><div className="flex items-center gap-5"><button onClick={() => toggleLike(post.id)} className={`post-action ${post.liked ? 'liked' : ''}`}><Heart className={post.liked ? 'fill-current' : ''} /> <span>{post.likes}</span></button><button className="post-action"><MessageCircle /> <span>{post.comments}</span></button><button className="post-action"><Share2 /></button></div><button className="post-action"><Bookmark /></button></div></div></div></article>)}{filteredPosts.length === 0 && <div className="rounded-2xl border border-dashed border-border p-12 text-center"><Search className="mx-auto mb-3 size-7 text-muted-foreground" /><p className="font-semibold">No posts found</p><p className="mt-1 text-sm text-muted-foreground">Try searching for something else.</p></div>}</div>
          </main>

          <aside className="right-rail hidden lg:block"><section className="rail-card rounded-2xl border border-border bg-card p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">Who to follow</h2><button className="text-xs font-semibold text-primary">See all</button></div><div className="flex flex-col gap-4">{people.map((person) => <div className="flex items-center gap-3" key={person.handle}><Avatar src={person.avatar} size="size-9" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{person.name}</p><p className="text-xs text-muted-foreground">{person.mutual}</p></div><button onClick={() => setFollowing((current) => current.includes(person.handle) ? current.filter((handle) => handle !== person.handle) : [...current, person.handle])} className={`follow-button ${following.includes(person.handle) ? 'following' : ''}`}>{following.includes(person.handle) ? 'Following' : 'Follow'}</button></div>)}</div></section><section className="trending-card mt-5 rounded-2xl border border-border bg-card p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">Trending today</h2><Compass className="size-4 text-muted-foreground" /></div>{['Designing in public', 'The maker community', 'Weekend photography'].map((topic, i) => <div className="trend-row" key={topic}><span className="text-xs text-muted-foreground">{i + 1} · Trending</span><p className="mt-1 text-sm font-semibold">{topic}</p><span className="text-xs text-muted-foreground">{[1240, 892, 641][i]} posts</span></div>)}</section></aside>
        </div>

        <nav className="mobile-nav fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-background/90 px-3 py-3 backdrop-blur-xl lg:hidden">{[{ label: 'Home', icon: Home }, { label: 'Explore', icon: Compass }, { label: 'Create', icon: Plus }, { label: 'Alerts', icon: Bell }, { label: 'Profile', icon: UserRound }].map(({ label, icon: Icon }) => <button key={label} onClick={() => label === 'Create' ? setComposerOpen(true) : setActive(label === 'Alerts' ? 'Notifications' : label)} className={`mobile-nav-item ${active === label || (active === 'Notifications' && label === 'Alerts') ? 'active' : ''}`}><Icon />{label === 'Alerts' && notifications > 0 && <i />}</button>)}</nav>

        {composerOpen && <div className="modal-backdrop" onClick={() => setComposerOpen(false)}><div className="composer-modal rounded-2xl border border-border bg-card p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Create a post</h2><button onClick={() => setComposerOpen(false)} className="icon-button"><X /></button></div><div className="flex gap-3"><Avatar src="https://i.pravatar.cc/120?img=59" /><div className="flex-1"><p className="text-sm font-semibold">Alex Morgan <span className="font-normal text-muted-foreground">@alexmorgan</span></p><textarea autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="What is on your mind?" className="mt-3 min-h-32 w-full resize-none bg-transparent text-[15px] outline-none placeholder:text-muted-foreground" /></div></div><div className="mt-4 flex items-center justify-between border-t border-border pt-4"><button className="composer-action"><ImageIcon /> Add image</button><button onClick={publish} disabled={!draft.trim()} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">Publish</button></div></div></div>}
      </div>
    </div>
  )
}
