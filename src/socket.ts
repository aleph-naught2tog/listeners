import { handleError } from './handleError';

const SOCKET_PORT = 3333;
const getSocketUrl = (port: number): string => `ws://localhost:${port}`;

const url = getSocketUrl(SOCKET_PORT);
const webSocket = new WebSocket(url);

const ERRORS: {[key: string]: number} = {};
let ERROR_COUNT = 0;


// ahhh, hmmmmm. how do I determine when all errors have been cleared? oof. hm.
// when we get a filechange on that file with no error data?
const handleMessage = (eventSent: MessageEvent) => {
  const eventData = JSON.parse(eventSent.data);
  const { event, shouldReload } = eventData;

  if (event.error) {
    ERROR_COUNT += 1;
    const errorMessage = event.error
      .replace(/\u001b/g, '')
      .replace(/\[\d+?m/g, '')
      .replace(/\r?\n/, '');


    const errorKeyParts = /^([^:]+):(\d+):(\d+)[^T]+(TS\d+)/.exec(
      errorMessage
    );
      console.log(errorKeyParts)
    if (!errorKeyParts) {
      throw new Error('Parts not found');
    }

    const [_, filename, lineNumber, columnNumber, errorCode] = errorKeyParts;
    const errorKey = `${filename}:${lineNumber}:${columnNumber}:${errorCode}`;

    if (errorKey in ERRORS) {
      ERRORS[errorKey] += 1;
      return;
    }

    ERRORS[errorKey] = 1;

    // src/renderer/index.ts:35:58 - error TS1005:
    // /^([^:]+):(\d+):(\d+)[^T]+(TS\d+)/.exec(str)
    /*
      1: "src/renderer/index.ts" // filename
      2: "35" // line number
      3: "58" // column number
      4: "TS1005" // error code
    */

    handleError(errorMessage);
    return;
  }

  console.log(ERROR_COUNT)

  if (shouldReload && ERROR_COUNT === 0) {
    location.reload(); // `location.reload` refreshes the browser window
  }
};

webSocket.onmessage = handleMessage;

document.addEventListener('beforeunload', () => {
  // This makes sure we close our socket connection
  // when we refresh/leave the page
  webSocket.close();
});

export default webSocket;
