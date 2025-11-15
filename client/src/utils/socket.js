import { io } from "socket.io-client";

let socket = null;

export function getSocketClient() {
  if (socket) return socket;

  const token = window.localStorage.getItem("pp_token");
  if (!token) return null;

  const url =
    import.meta.env.VITE_WS_BASE_URL ||
    (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api").replace(
      /\/api\/?$/,
      ""
    );

  socket = io(url, {
    transports: ["websocket"],
    auth: { token },
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error", err.message);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
