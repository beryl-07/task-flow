# Task Flow API

## Tech Stack

- Nest.js
- Prisma
- PostgreSQL

## Running locally

1. Install dependencies using npm

   ```bash
   npm install
   ```
2. Create the postgreSQL Database for this project 


3. Copy the `.env.example` to `.env` and `.env.development.local` and update the variables.

   ```bash
   cp .env.example .env && cp .env.example .env.development.local
   ```

4. Push the database schema

   ```bash
   npm run prisma:push
   ```

5. Start the development server

   ```bash
   npm run start:dev
   ```
