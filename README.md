# Cloudflare DDNS

Automatyczny klient DDNS aktualizujący rekordy DNS w Cloudflare na podstawie aktualnego adresu IP. Wysyła powiadomienia przez Telegram.

---

Automatic DDNS client that updates DNS records in Cloudflare based on your current IP address. Sends notifications via Telegram.

---

## Wymagania / Requirements

- Node.js (recommended: Bun)
- Cloudflare account with API Key/API Token
- Telegram bot and chat_id
- Docker (optional)

## Instalacja / Installation

1. Sklonuj repozytorium / Clone the repository:
   ```
   git clone https://github.com/Szymon3eK/cloudflareDDNS.git
   cd cloudflareDDNS
   ```

2. Skonfiguruj plik `.env` / Configure the `.env` file:

   ```
   TELEGRAM_CHAT_ID=your_chat_id
   TELEGRAM_BOT_TOKEN=your_bot_token
   CLOUDFLARE_EMAIL=your_email
   CLOUDFLARE_ZONE_ID=your_zone_id
   CLOUDFLARE_API_KEY=your_api_key
   ```

3. Dodaj plik `dns.json` z listą nazw rekordów DNS do aktualizacji /  
   Add a `dns.json` file with a list of DNS record names to update, e.g.:
   ```json
   [
     "example.yourdomain.com",
     "another.yourdomain.com"
   ]
   ```

4. Zainstaluj zależności / Install dependencies:
   ```
   bun install
   ```

5. Uruchom aplikację / Run the app:
   ```
   bun run index.ts
   ```

## Docker

Możesz uruchomić projekt w kontenerze:  
You can run the project in a container:

1. Zbuduj i uruchom / Build and run:
   ```
   docker-compose up --build
   ```

2. Upewnij się, że pliki `.env` i `dns.json` są w katalogu głównym projektu.  
   Make sure `.env` and `dns.json` files are in the project root.

## Funkcjonalności / Features

- Automatyczna aktualizacja rekordów DNS w Cloudflare co minutę  
  Automatic DNS record update in Cloudflare every minute
- Powiadomienia o zmianach przez Telegram  
  Telegram notifications about changes
- Obsługa wielu rekordów DNS  
  Supports multiple DNS records

## Konfiguracja / Configuration

- Wszystkie dane konfiguracyjne pobierane są z pliku `.env`  
  All configuration is loaded from the `.env` file
- Rekordy DNS do aktualizacji definiujesz w `dns.json`  
  DNS records to update are defined in `dns.json`

## Licencja / License

MIT