import LoginPage from "../../locator/LoginPage.js";
import { loginData } from "../../datasheet/login.js";

import { productvarientData } from "../../datasheet/productVarient.js";
import ProductvarientPage from "../../locator/productVariantPage.js";
import { keywords } from "../../keyword.js";

const key = new keywords();

describe("Add Product Workflow", () => {

   it("Create multiple products with variants", async () => {
        // Login
        await LoginPage.login(loginData.username, loginData.password);

        // Number of products to create
        const numberOfProducts = productvarientData.length;

        for (let i = 0; i < numberOfProducts; i++) {
            const product = productvarientData[i];

            // Create product
            await ProductvarientPage.createProduct(product, key);

            // Verify product creation
            const isDisplayed = await ProductvarientPage.searchProduct(product.name);
            if (isDisplayed) {
                console.log(`Product "${product.name}" successfully created and displayed.`);
                await key.AllureScreenshot(`Product ${product.name} Found`);
            } else {
                console.log(`Product "${product.name}" not found in the list.`);
                await key.AllureScreenshot(`Product ${product.name} Not Found`);
            }

            // Go back to Dashboard before next iteration
            const menubutton = await $('//android.widget.ImageButton[@content-desc="Open navigation drawer"]');
            await menubutton.click();
            const dashboard = await $('//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/item_side_menu_title" and @text="Dashboard"]');
            await dashboard.click();
        }
    });
});
