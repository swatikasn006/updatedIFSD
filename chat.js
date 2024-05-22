const socket = io.connect("http://localhost:3000");

const sender = document.querySelector("#Name");
const text = document.querySelector("#textmessage");
const submit = document.querySelector("#send");
const contents = document.querySelector("#message");

submit.addEventListener("click", () => {
  socket.emit("CHAT", {
    message: text.value,
    sender: sender.innerHTML,
  });
});
socket.on("CHAT", (data) => {
  contents.innerHTML +=
    "<ul><li id='username'>" +
    data.sender +
    " : </li><li id = 'textcont'>" +
    data.message +
    "</li></ul>";
  text.value = " ";
});
