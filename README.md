# We Code the Web - Astro Migration

This project has been migrated from Hexo 5.4.0 to Astro for modern static site generation with Node 24 support.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.14.1 or higher (compatible with Node 24)
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Build for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── fonts/             # Bariol font files
│   ├── img/               # Images (avatar, etc.)
│   └── posts/             # Post images (main.jpg for each post)
├── src/
│   ├── components/        # Astro components
│   │   ├── Article.astro          # Full blog post with related posts & Disqus
│   │   ├── Footer.astro           # Site footer
│   │   ├── Header.astro           # Site header
│   │   ├── MetaData.astro         # Post metadata (author, date)
│   │   ├── PostBlock.astro        # Related post card
│   │   ├── PostList.astro         # Post grid wrapper
│   │   ├── PostListItem.astro     # Individual post card
│   │   ├── PostNav.astro          # Pagination controls
│   │   ├── PostShare.astro        # Social sharing buttons
│   │   └── TagList.astro          # Tag display
│   ├── content/
│   │   ├── config.ts      # Content collection schema
│   │   └── posts/         # Blog posts (29 markdown files)
│   ├── layouts/
│   │   └── BaseLayout.astro       # Base HTML layout
│   ├── pages/
│   │   ├── [...page].astro                # Paginated index pages
│   │   ├── index.astro                    # Homepage
│   │   ├── rss.xml.js                     # RSS feed
│   │   ├── [year]/[month]/[day]/[slug].astro  # Blog posts (preserves URL structure)
│   │   ├── archives/
│   │   │   └── index.astro                # All posts archive
│   │   ├── categories/
│   │   │   └── [category].astro           # Posts by category
│   │   └── tags/
│   │       ├── index.astro                # All tags list
│   │       └── [tag].astro                # Posts by tag
│   ├── styles/            # SCSS stylesheets (19 files)
│   │   ├── variables/     # SCSS variables
│   │   └── main.scss      # Main stylesheet
│   ├── utils/
│   │   ├── dateFormat.ts  # Date formatting utilities
│   │   ├── relatedPosts.ts # Related posts algorithm
│   │   └── slugify.ts     # URL slug helpers
│   └── config.ts          # Site configuration
├── astro.config.mjs       # Astro configuration
├── netlify.toml           # Netlify deployment config
├── package.json
└── tsconfig.json
```

## ✨ Features

### URL Preservation
Blog posts maintain the exact same URL structure as Hexo:
- Format: `/YYYY/MM/DD/post-slug/`
- Example: `/2015/05/28/how-to-structure-your-front-end-application/`
- This ensures SEO continuity and Disqus comment preservation

### Content Collections
Posts are managed using Astro's type-safe content collections:
- Schema validation with Zod
- Automatic TypeScript types
- Frontmatter: title, date, tags, categories, id (for Disqus)

### Related Posts
Tag-based algorithm that:
- Finds posts sharing tags with the current post
- Scores by number of shared tags
- Returns top 3 most related posts

### Pagination
- 8 posts per page (configurable in `src/config.ts`)
- Homepage and paginated routes (`/page/2/`, etc.)
- Previous/Next navigation

### Disqus Comments
- Preserved using post `id` field from frontmatter
- Critical for maintaining comment continuity from Hexo

### Syntax Highlighting
- Built-in Shiki with Nord theme
- Zero JavaScript on client
- Styles inlined automatically

### Image Optimization
Each post has a `main.jpg` image that's automatically optimized by Astro:
- WebP/AVIF conversion
- Responsive srcset generation
- Lazy loading

### RSS Feed
Available at `/rss.xml`

### Styling
- SCSS with built-in Sass support (no build step needed)
- Custom Bariol fonts
- Responsive design
- Critical CSS automatically inlined

## 🔧 Configuration

### Site Settings
Edit `src/config.ts`:

```typescript
export const SITE = {
  title: 'We code the web',
  subtitle: 'Brainfood for front-end developers',
  description: 'A blog about front-end/web development...',
  author: 'Niels Gerritsen',
  url: 'https://wecodetheweb.com',
  locale: 'en_EN',
  postsPerPage: 8,
};
```

### Astro Settings
Edit `astro.config.mjs`:
- Site URL
- Integrations (MDX, Sitemap)
- Markdown configuration (syntax highlighting theme)
- Build settings

## 📝 Creating New Posts

1. Create a new `.md` file in `src/content/posts/`
2. Add frontmatter:

```yaml
---
title: Your Post Title
date: 2026-03-09T12:00:00Z
tags:
  - JavaScript
  - React
categories:
  - Tutorials
id: 123  # Important for Disqus
---
```

3. Add post content with optional excerpt delimiter:

```markdown
**Brief intro paragraph**

<!-- more -->

## Full content starts here
```

4. Add post image: `public/posts/your-post-slug/main.jpg` (1200x630px recommended)

## 🚢 Deployment

### Netlify (Current)

The site is configured for Netlify deployment via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

Push to your repository and Netlify will automatically build and deploy.

### Other Platforms

Astro works with many hosting providers:
- Vercel: Zero-config deployment
- Cloudflare Pages: Edge deployment
- GitHub Pages: Static hosting
- Netlify Edge: Edge rendering

See [Astro deployment docs](https://docs.astro.build/en/guides/deploy/) for more options.

## 🎨 Styling

### SCSS Structure

All styles are in `src/styles/`:
- `main.scss` - Main entry point
- `variables/` - Colors, fonts, measures, mixins
- Individual component styles (header, footer, post, etc.)

### Modifying Styles

1. Edit SCSS files in `src/styles/`
2. No build step needed - Astro compiles automatically
3. Changes reflected immediately in dev mode

### Fonts

Bariol fonts are in `public/fonts/`:
- bariol.woff (regular)
- bariol-bold.woff
- bariol-italic.woff

Font definitions are in `src/styles/_fonts.scss`.

## 🧪 Testing

### Build Test

```bash
npm run build
```

Should complete without errors and generate `dist/` directory.

### Preview Build

```bash
npm run preview
```

Test the production build locally before deploying.

### Verification Checklist

- [ ] All 29 posts accessible at correct URLs
- [ ] Images load on all posts
- [ ] Related posts showing correctly
- [ ] Tags and categories functional
- [ ] Pagination working (8 posts per page)
- [ ] RSS feed generates (`/rss.xml`)
- [ ] Syntax highlighting works
- [ ] Disqus comments load with correct IDs
- [ ] Responsive design works
- [ ] Social sharing buttons functional

## 🔄 Migration Notes

### What Changed

**Removed:**
- Hexo and all its dependencies
- node-sass (replaced with modern sass)
- Manual SASS compilation scripts
- imagemin scripts (Astro handles optimization)
- loadCSS polyfill (Astro optimizes CSS loading)
- Manual critical CSS extraction

**Added:**
- Astro static site generator
- Content Collections with TypeScript types
- Integrated SCSS support
- Built-in image optimization
- Modern build tooling with Vite

**Preserved:**
- All 29 blog posts
- Exact URL structure (`/YYYY/MM/DD/slug/`)
- Post IDs for Disqus comment continuity
- All styling and fonts
- Site functionality (pagination, tags, related posts)

### Why Astro?

1. **Performance**: Zero JavaScript by default, faster builds
2. **Modern**: Active development, modern tooling
3. **Node 24 Compatible**: Requires Node 18.14.1+
4. **Developer Experience**: Hot module replacement, better errors
5. **Future-Proof**: Framework-agnostic, edge-ready

### Breaking Changes

None for end users! All URLs and functionality preserved.

## 📚 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Markdown Guide](https://docs.astro.build/en/guides/markdown-content/)
- [Astro Deployment](https://docs.astro.build/en/guides/deploy/)

## 🐛 Troubleshooting

### Build Fails

1. Check Node version: `node --version` (must be 18.14.1+)
2. Clear cache: `rm -rf node_modules .astro dist && npm install`
3. Check for TypeScript errors in components

### Styles Not Loading

1. Verify `src/styles/main.scss` imports all partials
2. Check SCSS syntax (Astro uses Dart Sass)
3. Clear browser cache

### Posts Not Showing

1. Check frontmatter format (date must be ISO 8601)
2. Verify files are in `src/content/posts/`
3. Check content collections schema in `src/content/config.ts`

### Images Missing

1. Verify images are in `public/posts/[slug]/main.jpg`
2. Check image paths in components
3. Ensure image filenames match exactly (case-sensitive)

### Disqus Comments Not Loading

1. Verify post has `id` field in frontmatter
2. Check Disqus shortname in `BaseLayout.astro`
3. Ensure correct URL format in Disqus config

## 📄 License

Same as original Hexo blog.

## 👤 Author

Niels Gerritsen - [nielsgerritsen.com](http://nielsgerritsen.com)

---

**Migration completed**: March 9, 2026
**Previous version**: Hexo 5.4.0
**Current version**: Astro 4.3.0+
