# STORE

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your Vuex Store files. Vuex Store option is implemented in the Nuxt.js framework.

Creating a file in this directory automatically activates the option in the framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).

## Docker

Build image:

```
docker build -t observatory-fe .
```

Run:

```
docker run -p 8500:80 --name observatory-fe-docker observatory-fe
```

## Files and folders

- `index.js`:.
- `fairness.js`:.
- `data.js`:.
- `cards.js`:.
- `evaluation`: Contains variables and functions for the FAIR4S Evaluator
  - `github.js`: Contains variables and functions for **step 2** when importing data from GitHub.
  - `observatory.js`: Contains variables and functions for **step 2** when importing data from the Software Observatory (`components/evaluation/Observatory/observatoryInput.vue`).
  - `metadata.js`: Contains variables and functions related to metadata and **step 3** regardless of the source of the metadata.
  - `results.js`: Contains variables and functions related to results generation and **step 4** regardless of the source of the metadata.
  - `index.js`: Contains variables and functions of the stepper.
