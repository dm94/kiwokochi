# Tama Web 🐾

> Your Virtual Pet Companion - A nostalgic Tamagotchi-style web game

A modern virtual pet web application built with React, TypeScript, and Vite. Take care of your digital companion by feeding, cleaning, playing, and watching it grow!

## 🌟 Features

- **Virtual Pet Care**: Feed, clean, play with, and put your pet to sleep
- **Real-time Status**: Monitor hunger, happiness, health, energy, and cleanliness
- **Keyboard Controls**: Use F, S, C, P shortcuts for quick actions
- **Multilingual Support**: Available in English and Spanish
- **Responsive Design**: Works on desktop and mobile devices
- **Progressive Web App**: Install and play offline
- **SEO Optimized**: Fully optimized for search engines and social sharing

## 🚀 SEO Optimizations

This project includes comprehensive SEO optimizations:

### Meta Tags & Social Sharing
- Complete Open Graph meta tags for Facebook sharing
- Twitter Card meta tags for Twitter sharing
- Structured data (JSON-LD) for search engines
- Canonical URLs and proper meta descriptions
- Multi-language support with hreflang tags

### Performance & Technical SEO
- Optimized bundle splitting and code minification
- Proper caching headers for static assets
- Sitemap.xml for search engine crawling
- Robots.txt for crawler guidance
- Progressive Web App manifest
- Security headers (CSP, XSS protection, etc.)

### Files Added for SEO
- `public/sitemap.xml` - Site structure for search engines
- `public/robots.txt` - Crawler instructions
- `public/manifest.json` - PWA configuration
- `public/og-image.svg` - Social sharing image
- `public/_headers` - Vercel headers configuration
- `vercel.json` - Vercel deployment configuration
- `src/components/SEO.tsx` - Dynamic SEO component

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/tamaweb.git
cd tamaweb

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build & Deploy
```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Analyze bundle size
pnpm build:analyze
```

### SEO Testing
```bash
# Validate SEO implementation
pnpm seo:validate

# Run Lighthouse audit
pnpm lighthouse
```

## 🎮 How to Play

1. **Feed your pet** (F key or Feed button) when hunger is low
2. **Put it to sleep** (S key or Sleep button) when energy is low  
3. **Clean your pet** (C key or Clean button) when cleanliness is low
4. **Play with it** (P key or Play button) to increase happiness
5. **Monitor the status bars** and respond to your pet's needs
6. **Keep your pet healthy** - if health reaches 0, your pet will die!

## 🌐 Live Demo

Visit the live application: [https://tamaweb.vercel.app/](https://tamaweb.vercel.app/)

## 📱 Progressive Web App

Tama Web can be installed as a PWA on your device:
- **Desktop**: Click the install button in your browser's address bar
- **Mobile**: Use "Add to Home Screen" option in your browser menu

## 🔧 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tamagui, Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Zustand
- **Internationalization**: i18next
- **Deployment**: Vercel

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with code splitting
- **Loading Time**: < 2s on 3G networks
- **Core Web Vitals**: All metrics in green

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
