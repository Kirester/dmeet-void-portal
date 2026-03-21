# 🌐 VOID_PORTAL // dMeet Lobby Grid
### [ STATUS: ONLINE // LIVE ]

**VOID_PORTAL** is a custom decentralized meeting gateway built for the dTelecom ecosystem. It acts as a visual discovery layer (Lobby) for dMeet rooms, allowing users to broadcast their signals and join others through a high-fidelity, cyberpunk-inspired terminal interface.

---

## ✅ PROJECT_STATUS: COMPLETE
This repository is a fully functional dMeet gateway. The dTelecom backend has been successfully bridged, and all core modules are fully integrated and operational.

---

## 🛠️ CURRENT_FEATURES
* **Visual Lobby Grid:** A 4-column gallery showing active public rooms with custom thumbnails.
* **Signal Broadcasting:** Users can submit their meeting links with a custom Display Name and Image URL to the global lobby.
* **Link Resolver:** Automatically extracts Room IDs from standard dMeet URLs.
* **Sync Protocol:** One-click "Sync to Portal" to pull lobby room data into the primary terminal joiner.
* **Cyberpunk UI:** Built with Tailwind CSS, featuring scanline effects, glow-text, and a monochrome "Phosphor" color palette.

---

## 🛰️ TECH_STACK
* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Database:** Supabase (PostgreSQL)
* **Video Engine:** dTelecom / LiveKit
* **Deployment:** Vercel

---

## 📥 INSTALLATION_LOG
```bash
# Clone the repository
git clone https://github.com/your-username/dmeet-void-portal.git

# Install dependencies
npm install

# Initialize environment variables
# Create a .env file with your SUPABASE_URL and SUPABASE_ANON_KEY

# Launch local terminal
npm run dev
```

---

## 🛡️ SYSTEM_ARCHITECTURE
The portal utilizes a **Broadcast-Listen** pattern:
1.  **Broadcast:** Users write room metadata to a Supabase `meetings` table.
2.  **Listen:** The Dashboard fetches all `is_public` rows every 30 seconds to update the Global Lobby.
3.  **Bridge:** Upon joining, the UI performs a live handshake with the fully integrated dTelecom backend before opening the native audio/video uplink.

---
