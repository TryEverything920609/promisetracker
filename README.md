# 🤞 WeVis Promise Tracker

Thai politicians and parties promise tracker

## 🌎 Environment

- Staging: https://wevisdemo.github.io/promise-tracker/
- Production: Not deployed yet

## 💻 Tech stack

- [NuxtJS](https://nuxtjs.org/) with [Vue 2 and TypeScript](https://v2.vuejs.org/v2/guide/typescript.html#Basic-Usage)
- [TailwindCSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) and [Vue Test Utils](https://v1.test-utils.vuejs.org/guides/#getting-started)

## ⚽ Working style

- We use Github issue to track the progress.
  - Please assign yourself to the issue you are working on.
  - I don't want to force "HOW" to implement the issue and we can discuss everything on the issue.
  - Communication language doesn't matter. Feel free to use Thai or English.
- We use Trunk-based development.
  - No braches, we all push to main branch.
  - If the commit is related to a specifig issue, add issue id in the commit message eg. `[#21] Add button components`
  - Pull rebase `git pull --rebase` often. Before you start coding and pushing.
  - Continueus integration: don't leave your code without pushing overnight, push as much as you can without breaking the build.
  - Linter and formater will be run on commit, while test and build will be run on push so you can't push if it fail.
- Encourage to write component test with TDD (Test driven development) but it's not mendatory.
- Each time the code is pushed to main, Github Action will build and deploy to the staging environment.
- Use asynchonous communication. Let's try not to have meeting if not nessesary.
  - For issue related discussion, please use Github issue
  - Other discussion can be done in slack

## 📂 Directory structure

Use `pascal-case` for every file name since Linux (eg. Github Action runner) is not case-incensitive, in contrary to Mac and Windows.

- `/assets` Assets such as images which [can be import into Nuxt](https://nuxtjs.org/docs/directory-structure/assets/)
  - Before adding new assets, check first if it's already exist here.
  - For SVG that can change the color (eg. button icon on hover), recommend in use inline svg with `currentColor` and Tailwind color preset
- `/components` Vue components
  - Put on the root if it's shared between pages
  - Put in the `/components/<page>/` if it's only used in that page
  - If components is too big or getting duplicated, you should split into several component which can also be group in sub-folder
- `/data` JSON promises and related data, including example one before fetching script is implemented.
- `/models` Data types (interface, enum, etc.) sharing across the project
- `/pages` Represent [Nuxt routing](https://nuxtjs.org/docs/directory-structure/pages)
- `/tests` Test file
  - Recommend to mimick project structure eg. `/tests/components/component-name.test.ts`

## 💅 Styling and design system

- We used [WeVis Design System](https://wevisdemo.github.io/design-systems/) which provide
  - Utility classes for typography
  - Vue component
- For other styling customization beyond WeVis design system, use Tailwindcss
  - Color is defined in `tailwind.config.css` which naming should be related to Figma
  - Configuration is also available on http://localhost:3000/\_tailwind/ when dev server is running

**THANK YOU FOR ALL THE CONTRIBUTION ❤️**
