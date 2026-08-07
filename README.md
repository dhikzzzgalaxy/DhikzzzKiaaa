# Dhikzzz Galaxy

Platform download aplikasi mod terpercaya, bersih, cepat, dan responsif.

## Project Structure

- `index.html`: Main entry point.
- `css/style.css`: Modular styling and animations.
- `js/app.js`: React application components and friendly URL routing logic (`/app/{slug}`).
- `data/apps.json`: Centralized application dataset (no hardcoded data in code).
- `vercel.json`: Vercel routing configuration ensuring `/app/*` routes work seamlessly on refresh and deep links.

## Features

- **Friendly URLs**: Direct app detail pages at `/app/{slug}` supporting refresh, back, forward, and sharing.
- **Separated Shield Section**: Security and Play Protect warning section is cleanly separated into its own card below the Download Card.
- **Modular Architecture**: Clean separation of HTML, CSS, JavaScript, Components, and Data.
- **GitHub & Vercel Ready**: Plug-and-play deployment configuration.
