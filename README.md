# PRFT-Deficient
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, make sure the following are installed
 - next
 - react
 - react-dom
 - base-64
 - react-beautiful-dnd
 - sass
 - babel

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