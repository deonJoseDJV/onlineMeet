<div align="center">

# 🎥 Meetly

### Video meetings, reimagined.

A full-stack, browser-based video-conferencing app — HD peer-to-peer calls, screen sharing, and real-time chat with no downloads required.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?logo=socket.io&logoColor=white)](https://socket.io)
[![WebRTC](https://img.shields.io/badge/WebRTC-P2P-333333?logo=webrtc&logoColor=white)](https://webrtc.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

</div>

---

## ✨ Features

- **HD video calling** — low-latency, peer-to-peer streaming over WebRTC with a Socket.io signaling server.
- **Multi-participant rooms** — auto-arranging, responsive video grid.
- **Screen sharing** — present your screen with one click.
- **Real-time chat** — in-call messaging with unread badges.
- **Instant meetings** — generate a room and share an invite link in one tap.
- **Pre-join lobby** — preview your camera, and toggle mic/cam before joining.
- **Authentication** — register & sign in, with hashed passwords (bcrypt) and token-based sessions.
- **Meeting history** — every room you join is saved to your account so you can rejoin.
- **Polished, responsive UI** — modern dark theme, works on desktop, tablet, and mobile.

## 🖼️ Screenshots

> _Add your own screenshots here once running locally — they make the repo (and your resume) shine._

| Landing | Dashboard | In-call |
| --- | --- | --- |
| `docs/landing.png` | `docs/home.png` | `docs/call.png` |

## 🧱 Tech Stack

**Frontend:** React 18, React Router, Material UI, Socket.io-client, WebRTC, react-toastify
**Backend:** Node.js, Express, Socket.io, Mongoose
**Database:** MongoDB (Atlas)
**Auth:** bcryptjs password hashing + crypto session tokens
**Deploy:** Vercel (frontend) · Render (backend)

## 🏗️ How it works

```
                    ┌─────────────────────┐
   Browser A  ◄────►│  Socket.io server   │◄────►  Browser B
   (React)          │  (signaling + chat) │        (React)
       │            └─────────────────────┘            │
       │                                               │
       └───────────  WebRTC peer-to-peer  ─────────────┘
                    (audio / video / screen)
```

The Express + Socket.io server handles **signaling** (exchanging SDP offers/answers
and ICE candidates) and relays chat messages. Once peers are connected, audio and
video flow **directly between browsers** over WebRTC — the server never sees the
media stream. User accounts and meeting history are stored in MongoDB.

## 📁 Project structure

```
proj1/
├── backend/                # Express + Socket.io API & signaling server
│   ├── src/
│   │   ├── app.js          # entry point (env config, routes, DB)
│   │   ├── controllers/    # auth logic + socket manager
│   │   ├── models/         # Mongoose schemas (User, Meeting)
│   │   └── routes/         # REST routes
│   └── .env.example
├── frontend/               # React single-page app
│   ├── src/
│   │   ├── components/      # Logo, HeroArt
│   │   ├── contexts/        # AuthContext
│   │   ├── pages/           # landing, auth, home, history, VideoMeet
│   │   ├── styles/          # CSS modules
│   │   └── theme.js         # MUI dark theme
│   ├── vercel.json
│   └── .env.example
└── render.yaml             # Render Blueprint for the backend
```

## 🚀 Getting started (local)

### Prerequisites
- [Node.js](https://nodejs.org) 18+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB)

### 1. Clone
```bash
git clone <your-repo-url>
cd proj1
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env       # then edit .env and add your MONGO_URI
npm run dev                # starts on http://localhost:8000
```

### 3. Frontend
```bash
cd frontend
npm install
# optional: cp .env.example .env  (defaults to http://localhost:8000)
npm start                  # opens http://localhost:3000
```

Open **http://localhost:3000**, create an account, and start a meeting. To test a
real call, open the same room link in a second browser tab or window.

## 🌐 Deployment

### Backend → Render
1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, select the repo (it reads `render.yaml`).
3. Add environment variables in the dashboard:
   - `MONGO_URI` — your Atlas connection string
   - `CORS_ORIGIN` — your deployed frontend URL (e.g. `https://meetly.vercel.app`)
4. Deploy. Note the service URL (e.g. `https://meetly-backend.onrender.com`).

### Frontend → Vercel
1. In Vercel: **Add New → Project**, import the repo.
2. Set **Root Directory** to `frontend`.
3. Add an environment variable:
   - `REACT_APP_SERVER_URL` — your Render backend URL.
4. Deploy. Vercel builds the React app and serves it as a SPA (`vercel.json`
   rewrites all routes to `index.html`).

> ⚠️ **Use your own database.** The sample `.env` ships with a shared tutorial
> cluster so the app runs out-of-the-box — replace `MONGO_URI` with your own
> Atlas cluster before deploying anything real.

## 🗺️ Roadmap / ideas

- Mute-all & host controls
- Persistent participant names across the call
- Recording & virtual backgrounds
- TURN server for restrictive networks (currently STUN-only)
- Reactions and raise-hand

## 📄 License

MIT — free to use, learn from, and build on.
