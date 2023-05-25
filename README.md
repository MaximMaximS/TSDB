# TheSimpsonsDatabase

Simple app to keep track of your watched episodes of The Simpsons.

## Usage

TSDB Can be run using Docker or standalone using Node.js

### Docker

```sh
# Clone
git clone https://github.com/MaximMaximS/TSDB.git

# Build
docker build -t maximmaxims/tsdb .

# Start
docker run -p 3000:3000 maximmaxims/tsdb
```

### Standalone

```sh
# Clone
git clone https://github.com/MaximMaximS/TSDB.git

# Install dependencies
pnpm install --frozen-lockfile

# Generate bundle
pnpm run bundle

# Start
cd dist
node server.js
```
