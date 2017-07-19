CRUD backend for the makergrounds.virginia.edu website, written in NodeJS,
Express, PugJS, and the MaterializeCSS framework.
  - https://expressjs.com/
  - https://pugjs.org/
  - http://materializecss.com/

# DEVELOPMENT

## Prerequisites
### PostgreSQL

This app uses PostgreSQL as a database backend. 

- Install PostgreSQL.
  - Mac
    - Easiest option is to install Postgres.app: http://postgresapp.com/
    - Also install the graphical client, pgAdmin 4: https://www.pgadmin.org/download/
  - Windows
    - https://www.postgresql.org/download/windows/
    - Also install the graphical client, pgAdmin 4: https://www.pgadmin.org/download/
The manual: https://www.postgresql.org/docs/9.5/static/backup-dump.html

### NodeJS

- Install Node and npm
  - Install Node and npm from here: https://nodejs.org/en/download/

## Setup

- Clone files
  - `git clone https://github.com/mossiso/mgcrud.git`

- Install dependencies
  - Change into the newly created folder
    - `cd mgcrud`
  - Let NPM install all of the dependencies
    - `npm install`

- Create an environment file
  - In a text editor make a new file named `.env` in the project's root
    directory and add the following to it
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

- Edit the schema file
  - Change `databaseName` in the `schema.sql` file to the name of your database.
  ```
  DROP DATABASE IF EXISTS databaseName;
  --
  -- Name: databaseName; Type: DATABASE; Schema: -; Owner: -
  --

  CREATE DATABASE databaseName WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

  \connect databaseName
  ```

- Load Schema into Database
  - On the command line, in the same directory as the schema.sql file (the
    project's root folder) run:
    - `psql < schema.sql`

- Run
  - `npm start`
  - View the site in your browser at http://locahost:3000


## Notes on the Schema file
The database schema is located in the `schema.sql` file. 

- Load Schema into Database 
  - Load this file into your PostgreSQL database (after it has been started)
  - `psql < schema.sql`

- Generate the Schema file
  - To regenerate this file after changes to the database (replace 'databasename'
  with the name of the database)
    - `npm run schema databasename`

## Notes on writing npm scripts
This app uses the scripty module. Add an executable file in the scripts
directory to call it with `npm run`. See https://github.com/testdouble/scripty


# PRODUCTION

- Change the .env file 
  - NODE_ENV='production'
