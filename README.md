* CRUD backend for the makergrounds.virginia.edu website

# DEVELOPMENT

## PostgreSQL

- Install PostgreSQL.
  - Mac
    - Easiest option is to install Postgres.app: http://postgresapp.com/
    - Also install the graphical client, pgAdmin 4: https://www.pgadmin.org/download/
  - Windows
    - https://www.postgresql.org/download/windows/
    - Also install the graphical client, pgAdmin 4: https://www.pgadmin.org/download/

### Schema

The database schema is located in the `schema.sql` file. 

Change `databaseName` in the `schema.sql` file to the name of your database.
```
DROP DATABASE IF EXISTS databaseName;
--
-- Name: databaseName; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE databaseName WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

\connect databaseName
```


To load this file into your PostgreSQL database (after it has been started)
- `psql < schema.sql`

To regenerate this file if changes to the database
- `npm run schema`

### PostgreSQL Manual

The manual: https://www.postgresql.org/docs/9.5/static/backup-dump.html



## NodeJS

- Install Node and npm
  - Install Node and npm from here: https://nodejs.org/en/download/

## Setup

- Clone files
  - `git clone https://github.com/mossiso/mgcrud.git`

- Install dependencies
  - `cd mgcrud` Change into the newly created folder
  - `npm install`

- Create an environment file
  - In a text editor make a new file named `.env` and add the following to it
  ```
  DB_HOST='127.0.0.1|localhost|some.domain.name.com'
  DB_USER='pguser'
  DB_PASS='Super Secure Password!'
  DB_BASE='database'
  NODE_ENV='development|production'
  ```
  - DB_HOST = the IP address, localhost, or domain name of the PostgreSQL
    server. 
  - DB_USER = the name of the PostgreSQL account
  - DB_PASS = the password for the user
  - DB_BASE = the name of the database
  - NODE_ENV = set to 'development' when developing, and 'production' on the
    production server.

  - Make the uploads directory
  - `mkdir app/public/uploads`

- Run
  - `npm start`
  - View the site in your browser at http://locahost:3000


# PRODUCTION

- Change the .env file 
  - NODE_ENV='production'
