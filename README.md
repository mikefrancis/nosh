# 🍜 nosh

A modern, local-first RSS reader. I built this because I missed iGoogle.

## Tech stack

- [Next.js](https://nextjs.org) as a framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [ShadCN](https://ui.shadcn.com) as a UI component library
- [Biome](https://biomejs.dev) for linting/formatting
- [Cypress](https://www.cypress.io) as an end-to-end testing platform
- [Zod](https://zod.dev) for schema validation

## Installation

Clone this repository and navigate to the directory created:

```bash
git@github.com:mikefrancis/nosh.git
cd nosh
```

Install the dependencies:

```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

And navigate to the URL displayed in your terminal.

It is recommended to [integrate Biome into your IDE](https://biomejs.dev/guides/editors/first-party-extensions) to ease development, otherwise you can run the following command to lint:

```bash
npm run lint
```

And the folllowing command to fix any issues (which may fail continuous integration checks):

```bash
npm run format
```

## Testing

The critical functionality of the application is mainly covered by end-to-end tests. These can be run visually by:

```bash
npm run e2e:open
```

Or in headless mode:

```bash
npm run e2e:run
```
