# cch-homepage

## Visitor statistics

The homepage uses GoatCounter without a visible counter or map. Dashboard: https://czzzzh.goatcounter.com/.

The endpoint is configured in `.env.production` and included in production builds. To change the account:

1. Register at https://www.goatcounter.com/signup with site domain `czzzzh.github.io`.
2. Set `VITE_GOATCOUNTER_ENDPOINT` in `.env.production` to the endpoint shown in the account settings, such as `https://YOUR_ACCOUNT.goatcounter.com/count`.
3. Rebuild and deploy. This public endpoint can be committed; do not put a password or API key here.

Tracking is disabled while the endpoint is empty, during development, and on local previews. Only production builds served on `czzzzh.github.io` are counted.

Historical ClustrMaps/MapMyVisitors statistics remain at https://mapmyvisitors.com/web/1c57p and are not automatically imported into GoatCounter.

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
