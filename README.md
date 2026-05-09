# What Engineering Superhero Are You?

A free, open-source personality quiz that reveals your engineering archetype. 12 questions, 5 archetypes, no wrong answers.

Based on the [engineering superheroes framework](https://review.firstround.com/how-to-spot-and-magnify-the-powers-of-your-engineering-superheroes/) by **Patrick Shields** (via First Round Review).

**[Take the quiz](https://juansalvatella.github.io/engineering-heroes-test/)**

## The Five Archetypes

| Archetype | Superpower | Color |
|-----------|-----------|-------|
| The Aquaman | Deep problem-solving across system layers | Teal |
| The Flash | Turning ideas into working software at extraordinary speed | Red |
| The Priest | Creating order and elegance through principled code | Purple |
| The Spielberg | Intuitive understanding of what users need | Amber |
| The Paladin | Shielding the team while amplifying everyone's strengths | Gold |

## Why This Exists

Every engineering team is a league of superheroes. Understanding your archetype (and your team's composition) helps you play to your strengths, collaborate better, and build the right environment for each type to thrive.

This quiz is designed to be taken by engineering candidates, team members, or anyone curious about their approach to building software.

## Features

- 12 carefully crafted questions mapping to the 5 archetypes
- Answer shuffling to prevent pattern detection
- Score breakdown across all archetypes
- Shareable result cards (LinkedIn, download as image)
- Sharable URLs with OG meta tags for social previews
- Fully static — no backend, no tracking, no cookies
- Mobile responsive

## Tech Stack

- [Astro](https://astro.build) — static site generator
- Vanilla TypeScript — no UI framework
- Canvas API — client-side card image generation
- [@napi-rs/canvas](https://github.com/nicmacdev/napi-canvas) — pre-generated OG images at build time
- GitHub Pages — hosting

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production (generates card images + static site)
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
  pages/
    index.astro       # Main quiz (intro, questions, results)
    r/[hero].astro    # Result pages with OG tags for social sharing
public/
  cards/              # Pre-generated OG images (1 per archetype)
  favicon.svg
scripts/
  generate-cards.mjs  # Generates the 5 card PNGs at build time
```

## Deploy Your Own

### GitHub Pages

1. Fork this repo.
2. Go to **Settings > Pages** and set source to **GitHub Actions**.
3. Update `site` and `base` in `astro.config.mjs` with your GitHub username and repo name.
4. Push to `main` — the included workflow deploys automatically.

### Other Platforms

Any static hosting works. Run `npm run build` and deploy the `dist/` directory.

## Customization

Want to adapt the quiz for your team or company? A few starting points:

- **Questions**: Edit the `questions` array in `src/pages/index.astro`
- **Archetypes**: Edit the `heroes` object in the same file (and in `scripts/generate-cards.mjs` + `src/pages/r/[hero].astro`)
- **Colors**: Each archetype has a `color` property — change it and rebuild
- **Card images**: Run `npm run generate-cards` after editing archetype data

## Credits

The engineering superhero archetypes are the original work of **Patrick Shields**, published in First Round Review:
[How to Spot and Magnify the Powers of Your Engineering Superheroes](https://review.firstround.com/how-to-spot-and-magnify-the-powers-of-your-engineering-superheroes/).

This quiz is an independent, community interpretation of that framework. It is not affiliated with or endorsed by First Round Review or Patrick Shields.

Built by [Joan Salvatella](https://imprescindibl.es), founder of [Bookline.ai](https://bookline.ai).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

Some ideas:
- Translations (i18n)
- Additional questions
- Accessibility improvements
- Alternative visual themes

## License

[MIT](LICENSE) — free to use, share, and adapt.
