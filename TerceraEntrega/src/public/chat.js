let socketClient;
const user = document.getElementById("username").innerHTML;
let chat = document.getElementById("chat");

socketClient = io();

chat.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  if (message.trim().length > 0) {
    socketClient.emit("message", {
      user,
      message,
    });
  }
  e.target.message.value = "";
});

socketClient.on("history", (data) => {
  let history = document.getElementById("history");
  let messages = "";
  data.reverse().forEach((item) => {
    messages += `<p>[<i>${item.user}</i>] dice: ${item.message}</p>`;
  });
  history.innerHTML = messages;
});
