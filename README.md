# CRUD backend for the makergrounds.virginia.edu website

# Devlopment

## PostgreSQL

- Install PostgreSQL.
  - Mac
    - Easiest option is to install Postgres.app: http://postgresapp.com/
    - Also install the graphical client, pgAdmin 4: https://www.pgadmin.org/download/
  - Windows
    - https://www.postgresql.org/download/windows/
    - Also install the graphical client, pgAdmin 4: https://www.pgadmin.org/download/

## NodeJS

- Install Node and npm
  - Install Node and npm from here: https://nodejs.org/en/download/

## Files

- Clone files
  - `git clone https://github.com/mossiso/mgcrud.git`

- Install dependencies
  - `npm install`

- Upload the database schema.
  - On the command line, in the mgcrud directory, there should be a schema.sql
    file:
    - `pgsql < schema.sql`

- Run
  - `npm start`
