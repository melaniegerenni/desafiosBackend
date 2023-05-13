const buttons = [...document.getElementsByTagName("button")];

buttons.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(e.target.id);
    const pid = e.target.id;
    //por ahora el cid lo hardcodeé a uno que tengo en la base de datos
    const cid = "645ef2eb5b9e59fa7cecba34";
    fetch(`/api/carts/${cid}/product/${pid}`, { method: "POST" })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  });
});
