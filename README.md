# Hierarchical Table

Hierarchical Table built with `[React, TypeScript, Vite, MUI, Redux, and Firebase]`.
This component renders a tree-structured table with expandable and collapsible subtables. It supports row deletion along
with all of their descendants. Designed for scalable presentation of dynamic data with full control over hierarchy and state

## Authentication

User authentication is implemented with Firebase and supports:

- Email/password
- Google sign-in
- GitHub sign-in

## 🧰 Additional Tools

- **i18next** — for internationalization
- **Zod** — for runtime schema validation
- **react-hook-form** — for form state and validation

## [Live demo](https://matsola-sv.github.io/hierarchical-table/)

### Desktop version

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot1.png)

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot2.png)

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot3.png)

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot4.png)

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot5.png)

### Mobile version

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot-mobile1.png)

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot-mobile2.png)

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot-mobile3.png)

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot-mobile4.png)

![Screenshot](https://raw.githubusercontent.com/matsola-sv/hierarchical-table/master/docs/screenshots/Screenshot-mobile5.png)

## Run Locally

### 1. Install Dependencies

```sh
$ npm install
```

### 2. Create a new firebase project

#### 2.1. Login to your google account and create a new firebase project [here](https://console.firebase.google.com/u/0/)

#### 2.2. Create an `.env` file and add the following variables.

You can also set a project subdomain in .env. The default is '/'.
For example:
http://my-project.com/dev.ht

```
VITE_PUBLIC_URL=/dev.ht
```

#### 2.3. Add your Firebase config values to the .env file:

(You can find these in your Firebase project settings)

```

VITE_FIREBASE_API_KEY=<your-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<yourauthdomin.firebaseapp.com>
VITE_FIREBASE_DB_URL=<https://yourdburl.firebaseio.com>
VITE_FIREBASE_PROJECT_ID=<yourproject-id>
VITE_FIREBASE_STORAGE_BUCKET=<yourstoragebucket.appspot.com>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
VITE_FIREBASE_APP_ID=<your-app-id>

```

#### 2.4. After adding the config, go to the Firebase Console and enable the authentication providers (e.g., Google, GitHub) you plan to use.

### 3. Run development server

```sh
$ $ npm run dev
```

Runs the app in development mode using Vite.
Open http://localhost:5173 to view it in the browser (default Vite port).

In development, the app uses the `.env.local /.env.development` variable:

```sh
VITE_PUBLIC_URL=/
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
