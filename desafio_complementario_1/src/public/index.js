const socketClient = io();
socketClient.emit("message", "me comunico desde el cliente");

const formAdd = document.getElementById("add");
const listado = document.getElementById("products");
const formDelete = document.getElementById("delete");

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const { title, description, code, price, stock, category } = e.target;
  const product = {
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    stock: stock.value,
    category: category.value,
  };
  //console.log(product);
  socketClient.emit("addProduct", product);
});

formDelete.addEventListener("submit", (e) => {
  e.preventDefault();
  socketClient.emit("deleteProduct", e.target.id.value);
});

socketClient.on("products", (data) => {
  let prods = "";
  data.forEach((item) => {
    prods += `<li>${item.title}: $${item.price}</li>\n`;
    listado.innerHTML = prods;
  });
});
