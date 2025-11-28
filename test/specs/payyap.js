import LoginPage from "../../locator/LoginPage.js";
import ProductPage from "../../locator/ProductPage.js";
import { loginData } from "../../datasheet/login.js";
import { productData } from "../../datasheet/product.js";

describe("Add Product Workflow", () => {
  it("Login and Create Products", async () => {
    // Login
    await LoginPage.login(loginData.username, loginData.password);

    // How many products you want to run
    // const numberOfProducts = 20; // Change to 1, 5, 20 as needed
    // const productsToRun = productData.slice(0, numberOfProducts);

    // for (let i = 0; i < productsToRun.length; i++) {
    //     await ProductPage.createProduct(productsToRun[i]);
    //     await browser.pause(1000);
    // }
  });
});
