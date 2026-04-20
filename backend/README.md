# Social Media Backend (Laravel 12)

## Requirements
- PHP 8.2+
- Composer
- MySQL 8+

## Setup
1. Install dependencies:
   ```bash
   composer install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
3. Set DB in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=social_media
   DB_USERNAME=root
   DB_PASSWORD=secret
   ```
4. Link storage and migrate:
   ```bash
   php artisan storage:link
   php artisan migrate
   ```
5. Run backend:
   ```bash
   php artisan serve
   ```

## API overview
- Auth: `/api/register`, `/api/login`, `/api/logout`
- Profile: `/api/profile/me`, `/api/profile/{user}`
- Posts: `/api/posts`
- Likes: `/api/posts/{post}/likes/toggle`
- Comments: `/api/posts/{post}/comments`
- Follows: `/api/users/{user}/follow/toggle`, `/api/users/{user}/connections`
- Messages: `/api/messages`, `/api/messages/{userId}`
