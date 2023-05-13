let socketClient;
let user;
let chat = document.getElementById("chat");

Swal.fire({
  title: "Chat ecommerce",
  input: "text",
  text: "Set your username for the chat",
  inputValidator: (value) => {
    return !value.trim() && "Please write a username";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  document.getElementById("username").innerHTML = user;
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
});
