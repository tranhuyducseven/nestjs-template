# Nestjs Template

## 1. Setup

### 1. Setup npm packages and docker-compose

Run command

```bash
cp .env.file .env
```

```bash
make bootstrap
```

or

```bash
yarn bootstrap
```

### 2. Run database migration

```bash
npm run migration:run
```

### 3. Run application

```bash
make dev_up
```

## 2. Useful command

To generate new migration

```bash
yarn run migration:generate
```

## Swagger

Document: [APIs spec](http://localhost:3000/docs)

## Admin

Adminer: [Adminer](http://localhost:8080)

## 3. Project structure

```bash
📦src # Where we keep all our source files.
┃ ┣ 📂common # Where we keep common typescript files, e.g. constants and DTOs.
┃ ┣ 📂database # Folder to store files which are connected only to database.
┃ ┃ ┣ 📂migrations # Folder to store application migrations
┃ ┃ ┗ 📂factories # Factories are used to create entities which will be used in seeds.
┃ ┃ ┗ 📂seeds # Folder to store application seeds, it adds necessary data for the development.
┃ ┣ 📂decorators # This folder contains all global
┃ ┣ 📂filters # In this folder you can find app level
┃ ┣ 📂guards # You can store all guards here.
┃ ┣ 📂interceptors # Where we are keep interceptors
┃ ┣ 📂interfaces # This folder contains typescript interfaces
┃ ┣ 📂providers # These are utility functions you may want to share between many files in your application. They will always be pure and never have side effects, meaning if you provide a function the same arguments, it will always return the same result.  
┃ ┣ 📂shared # Shared module with global singleton services.
┃ ┣ 📂modules # Where all our NestJS modules lives
┃ ┣ 📜app.module.ts # The root application module.
┃ ┣ 📜boilerplate.polyfill.ts # We extend built in classes so you can use helper function anywhere.
┃ ┗📜snake-naming.strategy.ts # We are using snake naming strategy for typeorm
📦tests
┣📜.dockerignore # List a files which will be ignored during the docker build.
┣📜.env # Environment variables which will load before app start and will be stored in `process.env`, (\*) is a env name (development, test, staging, production)
┣📜.eslintrc.js # Eslint configuration file
┣📜docker-compose.yml # Docker compose configuration file
┣📜Dockerfile # basic Dockerfile configuration to build the app
┗📜ormconfig.ts # Typeorm configuration file which is used for migrations and seeds.
```

## Git working culture

For every updates, DO NOT push directly to `main` branch. Create a new branch, commit, publish branch and create a pull request (PR) instead.
A branch should have prefix features/ for a feature update, prefix hotfixes/ for a hotfix, improvs/ for an improvement ...
A PR should be small enough to review. To split a large PR, use stacked [PRs](https://blog.logrocket.com/using-stacked-pull-requests-in-github/).

## Barrelsby & Path alias

Run

```bash
yarn barrels
```
