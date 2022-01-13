# PRFT-Deficient
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development Workflow
We use [Github's Flow](https://docs.github.com/en/get-started/quickstart/github-flow) to collaberate and share code.

For styling, we utilize [SassDoc](http://sassdoc.com/) and follow [this setup](https://gist.github.com/bradtraversy/aab26d1e8983d9f8d79be1a9ca894ab4), conforming to [AirBnb's](https://github.com/airbnb) style guides for all code.

## Getting Started

First, make sure the following are installed
 - next
 - react
 - react-dom
 - base-64
 - react-beautiful-dnd
 - sass
 - babel
 - eslint
 - express
 - cors
 - dotenv

These should automatically install if you run
```bash
npm install
```
in the 404 folder.

After installing those, find the .eslintrc.json file, and change
```bash
"extends": "next/core-web-vitals"
# to
"extends": ["next/babel"]
```
Next, you will need to disable one of Chrome's default settings to let part of the app run. Open command prompt, and navigate to the shown directory and run the command.
```bash
C:\Program Files\Google\Chrome\Application>chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
```

This will open a chrome window, and this is the only window the app can be run in.

Now you can run
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with the special browser to see the result.