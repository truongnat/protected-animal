# Protected Animals Website

A Next.js website dedicated to raising awareness about endangered animal species, featuring charts, detailed information, and a blog about conservation efforts.

## Table of Contents

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/protected-animal.git
cd protected-animal
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Create a `.env.local` file in the root directory with your Supabase credentials:**

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **Set up the database (IMPORTANT - do this BEFORE running the seed script):**
   - Log in to your Supabase dashboard
   - Go to the SQL Editor
   - Copy the contents of `scripts/supabase-setup.sql`
   - Paste it into the SQL Editor and run the query
   - This creates the necessary tables that the seed script will populate

5. **Seed the database with sample data:**

```bash
pnpm seed
```

If you encounter any issues with the seed script, check the [scripts/TROUBLESHOOTING.md](./scripts/TROUBLESHOOTING.md) file for common problems and solutions.

6. **Run the development server:**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Folder Structure

```
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   ├── blog/         # Blog API endpoints
│   │   └── species/      # Species API endpoints
│   ├── blog/             # Blog pages (to be implemented)
│   ├── species/          # Species pages (to be implemented)
│   ├── charts/           # Data visualization pages (to be implemented)
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable React components
│   ├── Footer.tsx        # Footer component
│   └── Navbar.tsx        # Navigation component
├── lib/                  # Utility functions and shared code
│   ├── supabase.ts       # Supabase client and types
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── scripts/              # Database scripts
│   ├── README.md         # Database setup instructions
│   ├── seed-data.js      # Script to populate the database
│   └── supabase-setup.sql # SQL setup for Supabase
├── .env.local            # Environment variables (create this file)
├── .gitignore            # Git ignore file
├── biome.json            # Biome configuration
├── components.json       # ShadcnUI configuration
├── lefthook.yml          # Lefthook configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Package dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── README.md             # Project documentation
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # Typescript configuration
```

## Scripts

- **`pnpm dev`**: Runs the development server.
- **`pnpm build`**: Builds the application for production.
- **`pnpm start`**: Starts the application in production mode.
- **`pnpm check`**: Runs Biome checks and applies fixes.
- **`pnpm seed`**: Seeds the Supabase database with sample data.

## Dependencies

- **`@supabase/supabase-js`**: ^2.49.4 - Supabase JavaScript client
- **`chart.js`**: ^4.4.8 - JavaScript charting library
- **`react-chartjs-2`**: ^5.3.0 - React wrapper for Chart.js
- **`dotenv`**: ^16.4.7 - Environment variable loader
- **`class-variance-authority`**: ^0.7.0 - Utility for creating variant components
- **`clsx`**: ^2.1.1 - Utility for constructing className strings
- **`lucide-react`**: ^0.424.0 - Icon library
- **`next`**: 14.2.5 - React framework
- **`react`**: ^18 - UI library
- **`react-dom`**: ^18 - React DOM renderer
- **`tailwind-merge`**: ^2.4.0 - Utility for merging Tailwind CSS classes
- **`tailwindcss-animate`**: ^1.0.7 - Animation utilities for Tailwind CSS

## Dev Dependencies

- **`@biomejs/biome`**: 1.8.3
- **`@types/node`**: ^20
- **`@types/react`**: ^18
- **`@types/react-dom`**: ^18
- **`lefthook`**: ^1.7.11
- **`postcss`**: ^8
- **`tailwindcss`**: ^3.4.1
- **`typescript`**: ^5

## Database Schema

### Species Table

- `id`: Unique identifier
- `name`: Common name of the species
- `scientific_name`: Scientific name of the species
- `conservation_status`: Conservation status (e.g., "Critically Endangered")
- `population`: Estimated population size
- `habitat`: Description of the species' habitat
- `description`: Detailed description of the species
- `image_url`: URL to an image of the species
- `region`: Geographic region where the species is found
- `created_at`: Timestamp when the record was created

### Blog Posts Table

- `id`: Unique identifier
- `title`: Title of the blog post
- `content`: Content of the blog post in Markdown format
- `author`: Author of the blog post
- `image_url`: URL to a featured image for the blog post
- `published_at`: Date when the blog post was published
- `category`: Category of the blog post
- `tags`: Array of tags for the blog post
- `slug`: URL-friendly version of the title (unique)
- `created_at`: Timestamp when the record was created

## Configuration

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.ts`. You can customize the theme and extend it as per your requirements.

### Lefthook

Lefthook is configured in `lefthook.yml`. It helps to manage Git hooks and automate tasks.

### Biome

Biome is used for checking code quality. You can run the checks using the following command:

```bash
pnpm check
```

### Supabase

Supabase is configured using environment variables in `.env.local`. The database schema is set up using the SQL script in `scripts/supabase-setup.sql`.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- World Wildlife Fund for conservation data
- IUCN Red List for endangered species information
- National Geographic for wildlife images and information
# protected-animal
