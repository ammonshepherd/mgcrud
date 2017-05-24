# CRUD backend for the makergrounds.virginia.edu website

# Development

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
  - `npm install`

- Run
  - `npm start`


