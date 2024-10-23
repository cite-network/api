# cite-api

REST API for managing citations.

## Development

Setup a database.

```bash
docker run -d --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres
```

Create the database.

```bash
docker exec -it postgres psql -U postgres -c "CREATE DATABASE cite"
```

Install dependencies.

```bash
yarn
```

Run migrations.

```bash
yarn migrate
```

Start the server.

```bash
yarn start:dev
```
