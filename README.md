# RDF Parser

## Description

This is an example of an API for a blogging platform implemented with NodeJS and MongoDB.

Main functionalities:

- Parse files from Gutenberg Feeds https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip​

## Requirements

The following packages are required by this package

| Package Name | Description |
| ------------ |  ------------------------ |
| NodeJS |  12.16.3+ |
| MochaJS |  7.2.0+ |
| Sequelize | 5.21.11+ |
| Docker | https://www.docker.com/ | latest |
| Docker-Compose | https://docs.docker.com/compose/ | latest |


## <a name="setup"></a> Setup

1. Clone this repository
2. Download the RDF files form Gutenberg page https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip​
3. Untar and unzip the files
4. Copy the .env.example file to a new file called .env with `$ cp .env.example .env`
5. Configure envinronment variables in `.env` (see [env](#env)) make sure to define a number of threads not to big.
6. Go back to the init-db directory (`$ cd init-db`) configure .env like point 4 and run `docker-compose up` to start the Postgresql database and PgAdmin.
7. Create the (`ebooks`) database.


## Run

1. Go to the `application` directory using `$ cd rdf-parser`
2 .Configure envinronment variables in `.env` (see [env](#env)) and make sure that the database server is up and running with `docker ps` this should show the two containers started with the `docker-compose up` command.
3. To start the extractor you'll need to run:

        npm run extract


## <a name="env"></a> Global Env variables

| Environment variable name | Description |
| ------------ | ------------------------ |
| DATABASE_URL | Postgresql connection URL |
| PATH_TO_FILES |  Path to unziped RDF files |

## <a name="dockerEnv"></a> Docker Env variables

| Environment variable name | Description |
| ------------ | ------------------------ |
| POSTGRES_USER | Define the Postgres USERNAME for connections |
| POSTGRES_PASSWORD |  Password for that USERNAME |
| PGADMIN_DEFAULT_EMAIL |  Any email to login to PgAdmin |
| PGADMIN_DEFAULT_PASSWORD | Any password to login to PgAdmin


## Commands available

The following endpoints are available

| Commands | Description |
| ------------ |  ------------------------ |
| npm run extract |  get a list of public posts  | not required  |
| npm run tests |  allows the user to login and obtain a JWT  | not required |
| npm run coverage | allows the user to signup to the application  | not required |


## License

[MIT license](https://opensource.org/licenses/MIT).