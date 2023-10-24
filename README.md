<p align="center">
  <a href="https://nextjs-flask-starter.vercel.app/">
    <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
    <h3 align="center">Next.js Flask Starter</h3>
  </a>
</p>

<p align="center">Simple Next.js boilerplate that uses <a href="https://flask.palletsprojects.com/">Flask</a> as the API backend.</p>

<br/>

## Introduction

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend. One great use case of this is to write Next.js apps that use Python AI libraries on the backend.

## How It Works

The Python/Flask server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/vercel/examples/blob/main/python/nextjs-flask/next.config.js) to map any request to `/api/:path*` to the Flask API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:5328` port, which is where the Flask server is running.

In production, the Flask server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Demo

https://nextjs-flask-starter.vercel.app/

## Deploy Your Own

You can clone & deploy it to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?demo-title=Next.js%20Flask%20Starter&demo-description=Simple%20Next.js%20boilerplate%20that%20uses%20Flask%20as%20the%20API%20backend.&demo-url=https%3A%2F%2Fnextjs-flask-starter.vercel.app%2F&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F795TzKM3irWu6KBCUPpPz%2F44e0c6622097b1eea9b48f732bf75d08%2FCleanShot_2023-05-23_at_12.02.15.png&project-name=Next.js%20Flask%20Starter&repository-name=nextjs-flask-starter&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fexamples%2Ftree%2Fmain%2Fpython%2Fnextjs-flask&from=vercel-examples-repo)

## Getting Started

Install pnpm (on mac)
```
brew install pnpm
```

Setup Python Env
```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

First, install the dependencies & run the development server:

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Flask Documentation](https://flask.palletsprojects.com/en/1.1.x/) - learn about Flask features and API.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Creating Repo

`npx create-next-app@latest`

What is your project named? next-react-starter
Would you like to use TypeScript? Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory? Yes
Would you like to use App Router? (recommended) Yes
Would you like to customize the default import alias (@/_)? No
What import alias would you like configured? @/_

### Adding prettier

Note with eslint read https://prettier.io/docs/en/integrating-with-linters

```
cd next-react-starter
yarn add --dev --exact prettier
yarn add --dev eslint-config-prettier
touch .prettierrc
touch .prettierignore
```

in .eslintrc.json Make sure to put it last

```
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

pasted into .prettierrc

```
{
    "arrowParens": "always",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "jsxSingleQuote": false,
    "quoteProps": "as-needed",
    "singleQuote": false,
    "semi": true,
    "printWidth": 100,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "es5"
}
```

### Adding husky

```
yarn add --dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

Added to package.json which will run prettier and lint on staged files

```
"lint-staged": {
    "**/*.{js,ts,tsx}": [
        "prettier --write",
        "next lint"
    ]
}
```
### copied files from vercel template setup for python related
https://github.com/vercel/examples/tree/main/python/nextjs-flask
- requirements.txt
- api
- pnpn-lock.yaml
- yarn add -D concurrently
- updating package.json scripts
```
  "scripts": {
    "flask-dev": "FLASK_DEBUG=1 pip3 install -r requirements.txt && python3 -m flask --app api/index run -p 5328",
    "next-dev": "next dev",
    "dev": "concurrently \"pnpm run next-dev\" \"pnpm run flask-dev\"",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prepare": "husky install"
  },
  ```
  - updated next.config.js
  ```
  /** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development" ? "http://127.0.0.1:5328/api/:path*" : "/api/",
      },
    ];
  },
};

module.exports = nextConfig;
```

Adding Python Gitignore
```
### python
venv
api/__pycache__/
```

