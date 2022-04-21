# CourseKit Vue Template

A minimal Vue 3 + Vite template for a CourseKit frontend site.

Live demo: [https://coursekit-vue-template.netlify.app](https://coursekit-vue-template.netlify.app)

## Installation

```bash
npm install
```

## Connecting school with .env

1. Create an account at [https://coursekit.dev](https://coursekit.dev)

2. In dashboard, go to *Schools* tab and get School ID.

3. Copy .env.example file

```bash
cp .env.example .env
```

4. Set `VITE_SCHOOL_ID` to your school ID in .env

```
VITE_SCHOOL_ID=sc73jmdoi3
```

## Running server

```bash
npm run dev
```

## School URL

By default, the dev server runs on port 3000. If you use a different port, ensure that the School URL matches the dev server URL so that log in and log out redirects work correctly.
