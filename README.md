# Project Overview

This repository contains the backend and frontend components of our application. The backend is developed using Laravel, and the frontend is built with Next.js. Additionally, the repository includes unit and integration tests.

## Project Structure

- `backend`: Contains the Laravel backend code.
- `test`: Contains the unit and integration tests.
- `front`: Contains the Next.js frontend code.

## Backend (Laravel)

### Prerequisites

- PHP >= 8.0
- Composer
- MySQL or any other database

### Installation

1. Navigate to the `backend` directory.

2. Install the dependencies by running `composer install`.

3. Create a copy of the `.env` file by running `cp .env.example .env`.

4. Generate an application key by running `php artisan key:generate`.

5. Configure your database settings in the `.env` file.

6. Run the database migrations by running `php artisan migrate`.

### Running the Server

Start the Laravel development server by running `php artisan serve`. The server will start at `http://localhost:8000`.

## Tests

### Unit and Integration Tests

Navigate to the `test` directory to find the unit and integration tests.

#### Running Tests

1. Navigate to the `test` directory.

2. Run the tests by running `phpunit`.

## Frontend (Next.js)

### Prerequisites

- Node.js >= 14.x
- pnpm

### Installation

1. Navigate to the `front` directory.

2. Install the dependencies by running `pnpm install`.

3. Create a copy of the `.env` file by running `cp .env.example .env.local`.

4. Update the `.env.local` file to point to your backend API, setting `NEXT_PUBLIC_API_URL` to `http://localhost:8000`.

### Running the Development Server

Start the Next.js development server by running `pnpm dev`. The server will start at `http://localhost:3000`.
