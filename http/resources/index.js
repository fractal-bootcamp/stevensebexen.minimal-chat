const MAX_MESSAGES = 20;
const WEBSOCKET_PORT = 8080;

const context = {
  message: '',
  messageBox: null,
  sendButton: null,
  receivedMessages: [],
  receivedMessagesElement: null,
  ws: null,
};

function queryElements() {
  context.messageBox = document.querySelector('#message-box');
  context.sendButton = document.querySelector('#send-button');
  context.receivedMessagesElement = document.querySelector('#received-messages');
}

function initializeWebSocket() {
  context.ws = new WebSocket(`ws://localhost:${WEBSOCKET_PORT}`);
  context.ws.addEventListener('message', e => {
    context.receivedMessages.push(e.data);

    const newMessage = document.createElement('li');
    newMessage.class = 'received-message';
    newMessage.innerText = e.data;
    context.receivedMessagesElement.appendChild(newMessage);

    if (context.receivedMessages.length > MAX_MESSAGES) {
      context.receivedMessages.splice(0, context.receivedMessages.length - MAX_MESSAGES);
      context.receivedMessagesElement.removeChild(context.receivedMessagesElement.querySelector(':first-child'));
    }
  });
}

function addEventListeners() {
  context.messageBox.addEventListener('input', e => {
    context.message = e.target.value;
    context.messageBox.value = e.target.value;
  });

  context.sendButton.addEventListener('click', () => {
    if (!context.message) {
      return;
    }
    context.ws.send(context.message);
  })
}

function main() {
  queryElements();
  addEventListeners();

  try {
    initializeWebSocket();
  } catch (e) {
    console.error(e);
  }
}

window.onload = main;