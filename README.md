# Task Manager API

## Install

Install dependencies

```
npm install
```

Launch with nodemon

```
npm run dev
```

## Database

For local dev, launch a [MongoDB local server](https://www.mongodb.com/try/download/community) and complete connection on the `mongoose.js` file

## Deploy

Deploy on Heroku with [Heroku-CLI](https://devcenter.heroku.com/categories/command-line)

## Env configuration

for local development, create a `dev.env` file at `./config/dev.env` with the following informations.  
For production, push env variables to Heroku-CLI

```
PORT=xxx
SENDGRID_API_KEY=xxx
MONGODB_URL=xxx
JWT_SECRET=xxx
```
