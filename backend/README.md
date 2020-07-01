# ADONIS AUTH API

> This is the backend of Nuxt-Auth [AdonisJS](https://adonisjs.com/). It uses **AdonisJS v4.1**.

## Setup

Run the command below to install dependencies

```bash
$ npm install
```

### Environment variables

Duplicate `.env.example` in 2 files one called `.env` and the other `.env.testing`.

### Migrations

To setup your database. Create 2 database files in the database folder one called `adonis.sqlite` and the other `adotest.sqlite`

To setup e-mail functionality you can create a [Mailtrap](https://mailtrap.io/) account. From the Mailtrap settings you can copy the port, username and password.

Enter the following in `.env` file

```
HOST=localhost
WHOST=localhost
PORT=1000
WPORT=3000
NODE_ENV=development
APP_NAME=Adomail
APP_URL=http://${HOST}:${PORT}
WEB_URL=http://${WHOST}:${WPORT}
CACHE_VIEWS=false
APP_KEY=
DB_CONNECTION=sqlite
DB_DATABASE=adonis
HASH_DRIVER=bcrypt
SMTP_HOST=smtp.mailtrap.io
MAIL_USERNAME=
MAIL_PASSWORD=
FB_CLIENT_ID=
FB_CLIENT_SECRET=
FB_REDIRECT_URL=http://${HOST}:${PORT}/api/authenticated/facebook
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=http://${HOST}:${PORT}/api/authenticated/google
```

Enter the following in `.env.testing` file

```
HOST=localhost
PORT=4000
NODE_ENV=testing
DB_CONNECTION=sqlite
DB_DATABASE=adotest
```

Run this command to generate a key for the app.

```bash
$ adonis key:generate
```

Run the following command to run migration.

```bash
$ adonis migration:run
```

Seed the database:

```bash
$ adonis seed
```

To run the tests:

```bash
$ adonis test
```

Finally, start the application:

```bash
$ adonis serve --dev
```
