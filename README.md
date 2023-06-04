# TheSimpsonsDatabase

Simple app to keep track of your watched episodes of The Simpsons.

## Deployment

TSDB Can be run using Docker or standalone using Node.js

### 0. Prerequisites

- Node.js
- pnpm
- PostgreSQL

Environment variables can be set using a `.env.production.local` file in the root directory, or by setting them in the environment (obviously)

```env
# The port to listen on
PORT=3000

# The URL to the PostgreSQL database
DATABASE_URL=postgres://user:password@host:port/database
```

### 1. Clone the repository

```sh
git clone https://github.com/MaximMaximS/TSDB.git
cd TSDB
```

### 2. Install dependencies

```sh
pnpm run deps
```

### 3. Prepare the database

```sh
pnpm run deploy
```

### 4a. Docker

```sh
# Build
docker build -t maximmaxims/tsdb .

# Start
docker run --env-file .env.production.local -p 3000:3000 maximmaxims/tsdb
```

### 4b. Standalone

This requires Node.js and pnpm to be installed.
Note that the env file must be moved to the `dist` directory.

```sh
# Build
pnpm run builder

# Start
cd dist
node server.js
```
