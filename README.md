# With Firebase Authentication example

## How to use

### Download manually

Download the example:

```bash
curl https://codeload.github.com/prioe/next-firebase-mui-starter/tar.gz/master | tar -xz
cd next-firebase-mui-starter-master
```

Set up firebase:

- Create a project at the [Firebase console](https://console.firebase.google.com/).
- Get your account credentials from the Firebase console at _project settings>service accounts_, where you can click on _generate new private key_ and download the credentials as a json file. It will contain keys such as `project_id`, `client_email` and `client_id`. Now copy them into your project in the `config/server.js` file.
- Get your authentication credentials from the Firebase console under _project settings>general>your apps_ Add a new web app if you don't already have one. Under _Firebase SDK snippet_ choose _Config_ to get the configuration as JSON. It will include keys like `apiKey`, `authDomain` and `databaseUrl` and it goes into your project in `config/client.js`.
- Back at the Firebase web console, go to _Authentication>Sign-in method_ and enable _Google_.
- Create a database in the "Database" tab and select Realtime Database. Then go to "rules" and set up your write, read rules to this:

```
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    ".read": "false",
    ".write": "false",
    "sessions": {
      ".read": "false",
      ".write": "false"
    },
  }
}
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

After `now` successfully deploys, a URL will for your site will be displayed. Copy that URL and navigate to your Firebase project's Authentication tab. Scroll down in the page to "Authorized domains" and add that URL to the list.

## The idea behind the example

The goal is to authenticate users with firebase and store their auth token in sessions and store the sessions in firebase Realtime Database.
