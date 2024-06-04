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
$ npm ci

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

# Local development CI deployment (for developers!!!)

If you want to locally develop, you can use `docker compose`:

```bash
docker compose -f docker-compose.devci.yml up
```

Then, the continuous integration server is available both at 3000 and 8080.

## Adding new dependencies

Once docker compose is up and running, and you want to add some dependencies to [package.json](package.json) and updated [package-lock.json](package-lock.json), you have to do next in a separated terminal:

```bash
DEPENDENCIES=mynewdepency docker compose -f docker-compose.devci.yml run npm_install_deps
```

After that, you might need to restart it through

```bash
docker compose -f docker-compose.devci.yml restart nuxt
```

Have a look at the messages, because some mismatch between the dependencies of the new packages and the already recorded ones could break havoc.

In those cases, you need to figure out the source of the problem, rollback both [package.json](package.json) and [package-lock.json](package-lock.json), and re-add the updated dependency.

## Uninstall dependencies

With the docker compose running. If you want to unistall some dependencies to [package.json](package.json) and updated [package-lock.json](package-lock.json), you have to do next in a separated terminal:

```bash
DEPENDENCIES=mydepency docker compose -f docker-compose.devci.yml run npm_uninstall_deps
```

After that, you might need to restart it through

```bash
docker compose -f docker-compose.devci.yml restart nuxt
```

## Running custom `npm run` commands

Another usual issue is that the CI checks either on service or locally complain about styling. So, in order to run those checks locally you have to run:

```bash
NPM_RUN=lint docker compose -f docker-compose.devci.yml run npm_run
```

and to (blindly) apply the fixes:

```bash
docker compose -f docker-compose.devci.yml run npm_run
```

or

```bash
NPM_RUN=lintfix docker compose -f docker-compose.devci.yml run npm_run
```

Any other command defined in [package.json](package.json), like `test:unit` can also be used.
