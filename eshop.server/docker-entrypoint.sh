#!/bin/sh
set -e

# Add environment variable to disable SSL for database connections if needed
export DB_USE_SSL=false

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 10

# Create the database if it doesn't exist
echo "Creating database if it doesn't exist..."
npm run prestart

# Generate migrations
echo "Generating migrations..."
npm run migration:generate || {
  echo "Migration generation failed. This might be okay if migrations already exist."
  echo "Checking for existing migrations..."
  if [ -d "src/migrations" ] && [ "$(ls -A src/migrations)" ]; then
    echo "Found existing migration files. Proceeding with migration run."
  else
    echo "No existing migrations found and generation failed. Will attempt to continue anyway."
  fi
}

# Run migrations
echo "Running migrations..."
npm run migration:run || {
  echo "Error: Migration run failed. Attempting to continue startup..."
}

# Seed categories and products
echo "Seeding categories and products..."
# Run with more verbose output to catch any issues
NODE_OPTIONS="--trace-warnings" npm run seed:products || {
  echo "Product seeding failed. This might be due to categories or products already existing."
  echo "Continuing with startup..."
}

# Start the application
echo "Starting application..."
exec "$@"