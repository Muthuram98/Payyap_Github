import { loginData } from "../../datasheet/login";
import LoginPage from "../../locator/LoginPage.js";
import NegativeProductPage from "../../locator/NegativeProductPage.js";
import { Negative } from "../../datasheet/Negative.js";

describe("Add Product Workflow", () => {
  it("Login and Create Products", async () => {
    // Login
    await LoginPage.login(loginData.username, loginData.password);

    await NegativeProductPage.createProduct(Negative);
    await browser.pause(1000);
  });
});
