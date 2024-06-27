🌐 Demo: https://t.me/TestAssignmentBot

# Technologies list:
- **Telegram Bot:**
  - Node.js
  - TypeScript
  - Grammy
  - TypeORM/SQLite/MySQL
  - Zod
  - tsx & pkgroll
- **Web App:**
  - Rollup
  - TypeScript
  - Snabbdom

<details>
  <summary>Few words about the project (click)</summary>
  The last time I created a bot was back in 2018.
  The bot used to read chats, and if someone typed “!Friday”,
  it would send a random video.
  As an Easter egg, I’ve added a similar command in memory of that first bot.
  
  Overall, I was very excited to work on this test assignment.
  It was a stroke of luck because I had been planning
  to integrate a bot for one of my projects and needed to delve deeper into it.
  Naturally, I ended up spending more time on it than initially planned.
  
  I can say that Telegram has changed significantly over these six years.
  Additionally, I finally got a chance to try Rollup directly and Snabbdom.
  I had wanted to for a long time, but never had a reason until now.
</details>

---

# Test Assignment

> Create a Simple Telegram Web App Bot in Node.js
>
> ### Requirements:
>
> 1. `/start` Command:
>   - The bot should have a `/start` command that sends a message with a web app button.
>   - The button should open a website displaying the user’s Telegram first name (e.g., “Hello, !”).
> 2. Database Integration:
>   - The bot should save the users of the bot in a database (SQLite or PostgreSQL).
> 3. Admin Command:
>   - The bot should have an `/adminhello <telegram_id> <text>` command that only certain Telegram users can use.
>   - Example usage: `/adminhello 274139721 Hello from admin!`
>   - This command should send a message from the bot, “Hello from admin!” to the user with a Telegram ID of 274139721.
>   - Admin users can get user IDs directly from the database. Admins can be hardcoded.

---

# Project Overview. How to start app?

This repository consists of two main projects:

1. **Telegram Bot** - node.js application that interacts with the Telegram API.
2. **Web App** – generate static files for the Web App.

---

## Dependencies

Repository uses npm [workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) to manage dependencies.

To install all dependencies, run the following command in the root directory:

```bash
npm install
```

## Telegram Bot

### 🔥 Fast Start

You can register a new bot using BotFather: https://t.me/botfather

To start the bot, you need to provide the following environment variables:

```bash
TELEGRAM_BOT_TOKEN="<telegram-token>" ADMINS="<telegram-id>" npm start -w telegram-bot
```

Or, to configure the Telegram bot before starting it,
create a `./telegram-bot/.env.local` file with the following contents:

```dotenv
### File: ./telegram-bot/.env.local

TELEGRAM_BOT_TOKEN=<telegram-token>
ADMINS=<telegram-id>
```

Then, run the bot using the following command:

```bash
npm start -w telegram-bot
```

🚀 Now your bot is running and ready to accept commands.

### 🧩 Full Configuration for local development

For local development, you need to install
[serve](https://www.npmjs.com/package/serve)
and [ngrok](https://ngrok.com/).

```dotenv
### File: ./web-app/.env.local

TELEGRAM_BOT_NAME=<telegram-bot-name>
```

To start the `web-app`, run the following commands:

```bash
npm run build -w web-app
serve ./web-app/dist
ngrok http http://localhost:3000/
```

From ngrok, copy the URL and paste it into the `WEB_APP_URL` environment variable in the `./telegram-bot/.env.local` file.
The link should look like `https://<your-ngrok-id>.ngrok.io`.

To start the bot, you need to provide the following environment variables:

```dotenv
### File: ./telegram-bot/.env.local

TELEGRAM_BOT_TOKEN=<telegram-token>
ADMINS=<telegram-id>[,<telegram-id>,...]
SQLITE_PATH=.temp/database/path/
WEB_APP_URL=https://<your-ngrok-id>.ngrok.io
```

```bash
npm start -w telegram-bot
```

### 📝 Deployment to production (cPanel example)

> **Note:** Why do I deploy to **cPanel**? I just have cheap hosting for many years.

1. Configure environment variables for the Telegram bot in the `./telegram-bot/.env.production.local` file or in the **cPanel** environment variables.

   ```dotenv
    ### File: ./telegram-bot/.env.production.local

    TELEGRAM_BOT_TOKEN=<telegram-token>
    ADMINS=<telegram-id>[,<telegram-id>,...]
    ### Database settings:
    DATABASE_TYPE=mysql
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER=<mysql-user>
    MYSQL_PASSWORD=<mysql-password># 🥲
    MYSQL_DATABASE=<mysql-database>
    ### Webhook settings:
    WEBHOOK_BASE_URL=https://<your-server>/
    WEBHOOK_PATH=/webhook
    ### Web App settings:
    WEB_APP_URL=https://<your-server>/
   ```

2. Configure environment variables for the `web-app` in the `./web-app/.env.production.local` file.

   ```dotenv
    ### File: ./web-app/.env.production.local

    TELEGRAM_BOT_NAME=<telegram-bot-name>
   ```

3. Build the `telegram-bot` and `web-app`
   ```bash
   npm run build --workspaces
   # or
   # npm run build -w telegram-bot
   # npm run build -w web-app
   ```
4. Create cPanel ESM starter script (_cPanel specific_)

   ```javascript
   // File: ./telegram-bot/dist/index.cjs

   import("index.mjs");
   ```

5. Upload the `./telegram-bot/dist` and `./web-app/dist` directories to the server.
