# Hierarchical Table

Hierarchical Table built with `[React, TypeScript, Vite, MUI, and Redux]`.
This component renders a tree-structured table with expandable and collapsible subtables. It supports row deletion along
with all of their descendants. Designed for scalable presentation of dynamic data with full control over hierarchy and state

## [Live demo](https://matsola-sv.github.io/hierarchical-table/)

### Desktop version

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot1.png)

### Mobile version

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot-mobile1.png)

## Run Locally

### 1. Install Dependencies

```sh
$ npm install
```

### 2. Run development server

```sh
$ $ npm run dev
```

Runs the app in development mode using Vite.
Open http://localhost:5173 to view it in the browser (default Vite port).

In development, the app uses the `.env.local /.env.development` variable:

```sh
VITE_PUBLIC_URL=/local.ht
```

You can define it in a `.env` file

```sh
VITE_PUBLIC_URL=/dev.ht
```

---

## Build the project

```sh
$ npm run build
```

Builds the app for production to the dist folder using Vite.
It correctly bundles the app in production mode and optimizes the output for best performance.

You can define a production `VITE_PUBLIC_URL` in `.env.production`:

```sh
VITE_PUBLIC_URL=/prod.ht
```
