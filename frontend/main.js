const socket = io("ws://localhost:3000");

const joinForm = document.querySelector("form");
const nameInput = document.querySelector("#name");
const msgInput = document.querySelector("#message");
const chatRoom = document.querySelector("#room");
const activity = document.querySelector(".activity");
const usersList = document.querySelector(".user-list");
const roomList = document.querySelector(".room-list");
const chatDisplay = document.querySelector(".chat-display");

const sendMessage = (e) => {
  e.preventDefault();
  activity.textContent = "";
  const text = input.value;
  socket.emit("message", text);
  input.value = "";
};

form.addEventListener("submit", sendMessage);

const addMessage = (msg) => {
  const li = document.createElement("li");
  li.innerHTML = msg;
  document.querySelector("ul").appendChild(li);
};

socket.on("serverMessage", (data) => {
  addMessage(data);
});

input.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 6));
});

socket.on("activity", (name) => {
  activity.textContent = `${name} is typing`;
  setTimeout(() => {
    activity.textContent = "";
  }, 1500);
});
