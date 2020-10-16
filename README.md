# altruist-mobile-app
Mobile app build using React and Expo


## 🚀 Quick start

### Install expo globally
 npm install expo-cli --global

 npm install
 
 cd altruist-mobile-app
 
 expo start
 

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a React Native with Expo project.

    .
    ├── node_modules
    ├── assets
    ├── src
        ├── common
        ├── components
        |    ├── screens
        |    └── login
        ├── config
        └── sevices
    ├── .gitignore
    ├── App.js
    ├── app.json
    ├── babel.config.js
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2. **`/assets`**: An "asset" is any file that your project uses that is not code. Images, videos, sounds, and fonts are all considered to be assets. Splash screen and app icon are placed in assets folder.

3. **`/components`**: All shared React components. that have no state logic can be reused across the app

4. **`components/screens`**: Application screens, This directory will contain all of the code related to what you will see on the front-end of your app. The ones that we navigate from one to another. these are containers - they contain their own state.




6. **`/services`**: funcions that wrap the API calls.

7.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

8.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

9. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

10. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

11. **`README.md`**: A text file containing useful reference information about your project.
