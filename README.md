# openEBench-nuxt

Make sure **npm** version is at least 8.x.x

## Auto Deployment

The Deployment is set up with Docker and GIT workflows.

`docker-image-dev.yml`, `docker-image-dev2.yml`, `docker-image-prod.yml` contain the GIT workflow specifications, using `DOCKER_HUB_USER_NAME` and `DOCKER_HUB_ACCESS_TOKEN` as Docker Hub credentials.

`Dockerfile.develop`, `Dockerfile.develop2` and `Dockerfile.production` contain the ENV variables and Build stage (nginx).

### Production and Develop

```yml
name: Docker Image CI production

on:
  push:
    branches:
      - 'master'
    tags:
      - 'v[0-9].[0-9]+.[0-9]+'
```

The git workflow for building and pushing the Docker Image for <https://dev-openebench.bsc.es/> and <https://openebench.bsc.es/> is triggered by a push or pull_request to the `master` branch.

Important: Only tagging a `master` branch with e.g. `v1.0.0` will set the `latest`tag on the docker image and therefore enable Auto Deployment.

`dev-`and `prod`are built from the same (master) image, using different ENV variables.

### Develop-2

```yml
name: Docker Image CI develop-2

on:
  push:
    branches: [develop-2]
  pull_request:
    branches: [develop-2]
```

The git workflow for building and pushing the Docker Image for <https://dev2-openebench.bsc.es/> is triggered by a push or pull_request to the `develop-2` branch.

### Docker compose

The respective docker compose files for the oeb landscape can be found in this repo: <https://github.com/inab/oeb-docker-compose>

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Storybook

Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

```bash
# run storybook
$ npm run storybook

# build for production and launch server
$ npm run build-storybook

$ npx http-server ./path/to/build
```

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

## Solutions for Prettier in GitHub commits

Prettier is an opinionated code formatter with support for JavaScript, Angular, Vue,...

It is necessary to do the new code compatible with this tool before doing the commit in Git. If it is not compatible it will appear an error message.

### Visual Studio Code

To do the new code compatible with Prettier it is necessary to install the [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Once installed, from Visual Studio you have to do:

1.  Ctrl + Shift + P
2.  Write "Format Document" and select it.

The code automatically addapt the structure to be validated with the Prettier Tool.

### Command Line

To adapt the file by command line it is necessary to launch for EACH file this command:

```bash
# adapt your code to be validated by Prettier
$ PATH="$(npm bin):$PATH" prettier --ignore-unknown --write PATH_FILE_YOU_WANT_TO_VALIDATE
```
