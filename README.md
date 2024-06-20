Demo: https://t.me/TestAssignmentBot

---

# Project Overview. How to start app?

This repository consists of two main projects:

1. **Telegram Bot** - node.js application that interacts with the Telegram API.
2. **Web App** – generate static files for the web app.

---

## Dependencies

Repository uses npm [workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) to manage dependencies.

To install all dependencies, run the following command in the root directory:

```bash
npm install
```

## Telegram Bot

### Environment Configuration

To configure the Telegram bot, create a `./telegram-bot/.env.local` file with the following contents:

- `TELEGRAM_BOT_TOKEN`: Obtain this token from [BotFather]( https://t.me/BotFather) on Telegram.
- `ADMINS`: List of admin IDs separated by commas.
- `DB_PATH`: Path to the database.
- `WEB_APP_URL`: The URL of the **web app** used to generate links in the bot's messages.

You can find an example of the `.env` file in the following location:
[./telegram-bot/.env](telegram-bot%2F.env)

### Running the Bot

1. Make `.env.local` file with the appropriate values.
2. Start the bot using the following command:
   ```bash
   npm start -w telegram-bot
   ```

## Web App

### Building and Serving the Web App

1. Build the static files using the following command:
   ```bash
    npm run build -w web-app
    ``` 
2. Will generate the static files in the `./web-app/dist/` directory.
3. Deploy the generated static files to any server and provide the URL for access.

### Running the Web App Locally

For local development,
you can build and serve the app using [serve](https://www.npmjs.com/package/serve)
and [ngrok](https://ngrok.com/):

```bash
npm run serve -w web-app
serve ./web-app/dist
ngrok http http://localhost:3000/
```

---

// TODO add more details
