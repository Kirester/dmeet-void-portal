## [UNFINISHED]

# 🕳️ VOID PORTAL | dMeet Secure Gateway

A decentralized meeting entry-point built for the **dTelecom** ecosystem. This portal allows users to resolve encrypted room links, persist session data via **Supabase**, and join high-fidelity video rooms through a secure terminal interface.

## 🚀 Live Demo
**[CLICK HERE TO ENTER THE VOID](https://your-vercel-link-here.vercel.app)**

---

## 🛠️ Technical Stack
- **Framework:** React 18 + Vite (Vibe Coding implementation)
- **Styling:** Tailwind CSS v4 (Custom scanline terminal aesthetic)
- **Database:** Supabase (Auth & Meeting Persistence)
- **Protocol:** dTelecom SDK / LiveKit Gateway
- **Hosting:** Vercel (CI/CD Pipeline)

---

## 🧬 Core Features
- **Smart Link Resolver:** Custom regex logic to extract Room IDs from complex dMeet URLs (including query parameters).
- **Session Persistence:** Full-stack integration that saves meeting history to a private database for user tracking.
- **Terminal UI:** An immersive, low-resource hacker aesthetic designed for Web3 power users.
- **Environment Security:** Secure handling of API keys via Vercel's encrypted environment variables.

---

## 📂 Project Structure
```text
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx    # The "Hacker" UI & Link Resolver logic
│   │   └── SupabaseAuth.tsx # Secure entry-point
│   ├── lib/
│   │   └── supabase.ts      # Database configuration
│   └── App.tsx              # Main routing & state controller
├── .env.example             # Template for local development
└── vite.config.ts           # Build optimization settings
