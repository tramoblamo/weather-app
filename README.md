# Weather App

## Running the project

```bash
pnpm install
pnpm run build && pnpm run preview
```

Create a .env file in the project root with the following content:

```
VITE_WEATHER_API_BASE_URL="https://weather-app-server-ucsj.onrender.com"
VITE_ENCRYPTION_KEY=<GENERATED_KEY_HERE>
```

A key can be generated using:

```bash
openssl rand -base64 32
```

## Additional notes

- **API key security**: API keys cannot be fully secured on the frontend, as the bundle is and exposed to users. To mitigate this, API requests are proxied to a lightweight backend server that stores the sensitive information. The server is hosted on Render's free tier, which means it may go to sleep after periods of inactivity. When accessed again, it can take up to a minute to become fully responsive
- **Local storage data encryption**: Although local storage data is encrypted using a cryptographic library, the encryption key is bundled with the frontend. As such, stored data should be considered not secure