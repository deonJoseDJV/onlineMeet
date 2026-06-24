// Backend base URL.
// In development it falls back to localhost; in production set
// REACT_APP_SERVER_URL (e.g. on Vercel) to your deployed backend URL.
const server =
  process.env.REACT_APP_SERVER_URL || "http://localhost:8000";

export default server;
