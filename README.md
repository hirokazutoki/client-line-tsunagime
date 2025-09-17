# LIFF Starter

LIFF Starter is a good starter template can help you understand how to integrate LIFF into your own development environment.

You can check the source code and modify it to implement some cool stuff with LIFF API.

## Getting Start


```sh
$ cd src/vanilla/
$ yarn install
$ yarn dev
$ npm start
```

## Build & Deploy

### Build and deploy the app with Netlify CLI tools

1. Install Netlify CLI tool from npm.

```sh
$ npm install netlify-cli -g
```

2. Run following command to build project.

```sh
$ LIFF_ID="your LIFF ID" npm run build
* this script is already set in package.json
```

3. Make sure you have signed in your Netlify account.

```sh
$ cd ../../
$ netlify login
```

4. Deploy to Netlify

```sh
$ netlify deploy
```

5. Create your site name and choose the source path `dist` to deploy.

6. You can see the stating(draft) site URL, once you confirm it you can deploy it to production stie.

```sh
$ netlify deploy --prod
```

