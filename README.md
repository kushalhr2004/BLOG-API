# Simple Blog Backend

This is a Node.js/Express backend for a simple blog system using PostgreSQL.

## Prerequisites
- Node.js installed
- PostgreSQL installed and running locally
- A PostgreSQL database password matching `mydatabase`.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   Run the `schema.sql` file against your PostgreSQL instance to create the necessary tables.
   Assuming your default `postgres` user and a database named `postgres`:
   ```bash
   psql -U postgres -d postgres -f schema.sql
   ```

3. **Environment Variables**
   The `.env` file should have the following defaults (feel free to change `DB_USER` or `DB_NAME` based on your setup):
   ```
   DB_USER=postgres
   DB_PASSWORD=mydatabase
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=postgres
   JWT_SECRET=supersecretjwtkey
   PORT=3000
   ```

4. **Run the Project**
   ```bash
   node index.js
   ```

## Database Schema & Relationships

The database uses three main tables:
- **Users**: Contains `id`, `username`, and `password_hash`. `username` is defined as `UNIQUE` to prevent duplicate registrations.
- **Posts**: Contains `id`, `title`, `content`, and `user_id`. `user_id` is a foreign key referencing `users(id)` with `ON DELETE CASCADE`.
- **Comments**: Contains `id`, `content`, `post_id`, and `user_id`. `post_id` references `posts(id)` and `user_id` references `users(id)`, both with `ON DELETE CASCADE`.

## API Documentation

### Authentication
- `POST /api/signup`
  - **Body**: `{ "username": "...", "password": "..." }`
  - **Validation**: Requires both username and password. Returns `400` if the username is already taken.
- `POST /api/login`
  - **Body**: `{ "username": "...", "password": "..." }`
  - **Returns**: `{ "token": "...", "user": {...} }`
  - **Validation**: Checks if user exists and compares hashed passwords.

### Posts
- `POST /api/posts` (Requires JWT)
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `{ "title": "...", "content": "..." }`
  - **Validation**: Requires both title and content.
- `GET /api/posts`
  - **Returns**: A list of all posts ordered descending by creation date, including an attached `comments` array for each post containing all associated comments.

### Comments
- `POST /api/posts/:postId/comments` (Requires JWT)
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `{ "content": "..." }`
  - **Validation**: Requires comment content. Returns a `404` error if the given `postId` does not exist in the database.
