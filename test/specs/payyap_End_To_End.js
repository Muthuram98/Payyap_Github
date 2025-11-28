import LoginPage from "../../locator/LoginPage.js";
import productandsellPage from "../../locator/productandsellPage.js";
import { loginData } from "../../datasheet/login.js";
import Registerpage from "../../locator/Register.js";
import { EndToEnd } from "../../datasheet/EndToEnd.js";
import SellProductPage from "../../locator/SellProductPage.js";
import { keywords } from "../../keyword.js";

const key = new keywords();

describe("End-to-End Product Workflow", () => {
  it("Login, create product, sell and verify inventory", async () => {
    // Login

    await LoginPage.login(
      loginData.username,
      loginData.password,
      EndToEnd.Sign_in_Button_Color
    );

    //Select Register

    await Registerpage.Selectregister(SellProductPage.register);

    // // Create product
    await productandsellPage.createProduct(EndToEnd);

    // // Sell product
    await productandsellPage.sellProduct(EndToEnd);

    // // Verify in inventory
    await productandsellPage.searchInventory(EndToEnd.productName);
  });
});
