"# Auth" 
# Reference
- https://dev.to/drsimplegraffiti/building-a-typescript-rest-api-with-an-object-oriented-programming-oop-approach-3o0n
- https://medium.com/swlh/node-and-passport-js-github-authentication-e33dbd0558c
- https://dev.to/amritak27/advanced-error-handling-in-nodejs-1ep8
- https://medium.com/@prashantramnyc/how-to-implement-google-authentication-in-node-js-using-passport-js-9873f244b55e
- https://thegeekplanets.medium.com/managing-environment-variables-in-node-js-using-the-dotenv-package-2a5c8eee61a8

# Auth

## Description
This project is an authentication system built with Node.js, Express, TypeScript, and Passport.js. It supports multiple authentication strategies including GitHub and Google.

## Table of Contents
- [Reference](#reference)
- [Auth](#auth)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Running the Server](#running-the-server)
- [or](#or)

## Setup
### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/auth.git
    cd auth
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:
    Create [.env.development](http://_vscodecontentref_/1), [.env.test](http://_vscodecontentref_/2), [.env.staging](http://_vscodecontentref_/3), and [.env.production](http://_vscodecontentref_/4) files as needed and add the required environment variables.

## Usage
### Running the Server
To start the server in development mode:
```bash
npm run dev
# or
yarn dev

NEW_RELIC_APP_NAME=auth NEW_RELIC_LICENSE_KEY=NRAK-IDLPEB984MI6G2H3VUPTD173OKH node --experimental-loader=newrelic/esm-loader.mjs YOUR_MAIN_FILENAME.js