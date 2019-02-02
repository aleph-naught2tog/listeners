const SOCKET_PORT = 3333;
const getSocketUrl = (port: number): string => `ws://localhost:${port}`;

const url = getSocketUrl(SOCKET_PORT);
const webSocket = new WebSocket(url);

const handleMessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data);

  if (data.shouldReload) {
    location.reload(); // `location.reload` refreshes the browser window
  }
};

webSocket.onmessage = handleMessage;

document.addEventListener("beforeunload", () => {
  // This makes sure we close our socket connection
  // when we refresh/leave the page
  webSocket.close();
});
