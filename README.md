# Description

- this is a bare bones fullstack vite-react-express template. follow the steps below for setup

# Setup

- create database

```
createdb some_db_name

OR

> psql
> CREATE DATABASE some_db_name;
```

- install dependencies

```
npm install && cd client && npm install
```

- start express server in root directory of repository

```
npm run start:dev
```

- start vite server in client directory

```
npm run dev
```

# To test deployment

```
cd client && npm run build && npm run preview
```

make sure your backend is running and access the localhost url via the browser shown in terminal

# To deploy

- build script for deploy

```
npm install && cd client && npm install && npm run build

```

- start script for deploy

```
node server/index.js

```

- environment variables for deployed site

```
JWT for jwt secret
DATABASE_URL for postgres database
```
