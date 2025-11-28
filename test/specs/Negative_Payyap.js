import { loginData } from "../../datasheet/login";
import LoginPage from "../../locator/LoginPage.js";
import NegativeProductPage from "../../locator/NegativeProductPage.js";
import { Negative } from "../../datasheet/Negative.js";
import Registerpage from "../../locator/Register.js";
import { EndToEnd } from "../../datasheet/EndToEnd.js";




describe("Negative Workflow", () => {
 
    it("Negative Popup", async () => {
        // Login
        await LoginPage.login(loginData.username, loginData.password);

            await Registerpage.Selectregister(EndToEnd);
        
       
             await NegativeProductPage.createProduct(Negative);
            await browser.pause(1000);
        
    });
});
 