# Miguel Gonzalez-Ramirez Portfolio — Implementation Handoff

This is a static, GitHub Pages-friendly portfolio implementation based on the approved Phase 4 specification.

## Pages

- `index.html` — recruiter-first homepage
- `work/index.html` — Selected Work index
- `work/energy-ai/index.html` — flagship Energy AI case study
- `work/city-of-tyler/index.html` — City of Tyler analytical case study
- `about/index.html` — professional engineering narrative
- `404.html` — custom not-found page

## Before launch

Edit `assets/js/config.js` and add:

- professional email
- LinkedIn URL
- current resume PDF path
- GitHub URL only if the profile is curated enough to strengthen the portfolio

Recommended resume location after you add the actual file:

`assets/Miguel_Gonzalez_Ramirez_Resume.pdf`

Then set:

`resumePath: "assets/Miguel_Gonzalez_Ramirez_Resume.pdf"`

No placeholder resume PDF is included because the real resume was not provided and the portfolio must not fabricate content.

## Evidence-safe implementation

Representative technical SVGs are explicitly labeled as sanitized/non-project visuals. They communicate analysis type and workflow without presenting synthetic values as real project evidence.

Sections with unverified details use visible “pending verification” language or omit the unsupported claim entirely.

## GitHub Pages compatibility

The site uses folder-based `index.html` pages and relative links so it works for both user/organization Pages and project Pages without assuming deployment at the domain root.

The `.nojekyll` file prevents unnecessary Jekyll processing.

## Fonts

The site requests IBM Plex Sans, IBM Plex Mono, and Source Serif 4 from Google Fonts, with system fallbacks if the font request is unavailable.

## Open Graph

An OG card is included at `assets/img/og-card.png`. After deployment, consider replacing relative `og:image` values with the final absolute deployed URL for maximum crawler compatibility.

## Verification backlog

See `CONTENT_TODO.md` for the content and asset items that still require Miguel’s confirmation.
