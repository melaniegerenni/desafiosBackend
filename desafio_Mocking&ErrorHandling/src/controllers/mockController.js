import { generateProduct } from "../utils.js";

export default class MockController {
  getMockProducts = async (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
    res.json({ status: "success", payload: products });
  };
}
