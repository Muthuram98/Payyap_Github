// import LoginPage from "../../locator/LoginPage.js";
// import SellProductPage from "../../locator/SellProductPage.js";
// import { loginData } from "../../datasheet/login.js";
// import { sellData } from "../../datasheet/sellProduct.js"; // JSON with multiple products

// describe("Sell Product Workflow", () => {
//     it("Sell multiple products", async () => {
//         await LoginPage.login(loginData.username, loginData.password);

//         await SellProductPage.openSellPage();

//         // Loop through all products and sell them
//         await SellProductPage.sellMultipleProducts(sellData.products);

//         // Optional: get toast message
//         const toast = await SellProductPage.getToastMessage();
//         console.log("Toast Message:", toast);

//         await SellProductPage.finishWithoutReceipt();
//     });
// });



import LoginPage from "../../locator/LoginPage.js";
import { loginData } from "../../datasheet/login.js";
import { keywords } from "../../keyword.js";
 
 
const key = new keywords();
 
describe("Sell Product Workflow", () => {
 
    it("Sell Product", async () => {
 
        await LoginPage.login(loginData.username, loginData.password);
 
        // Click Sell button
        const sellProductButton = await $('//android.widget.LinearLayout[@resource-id="ch.payyap.smartpos:id/on_click_sell"]');
        await sellProductButton.click();
 
        // Get product name dynamically (from test data or user input)
        const productName = 'Grilled Salmon'; // can be anything
        const searchField = await $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/input_edit_text_qr"]');
 
        // Type character by character for dynamic search
       // Type one character at a time
let currentValue = '';
for (const char of productName) {
    currentValue += char;            // append next character
    await searchField.setValue(currentValue);  // update field with full text so far
    await browser.pause(1000);        // optional pause for app to process
}
 
        const searchedProduct = await $(`(//android.widget.LinearLayout[@resource-id="ch.payyap.smartpos:id/product_desc_layout"])[1]`);
        await searchedProduct.click();
 
        const addquantityField = await $('//android.widget.RelativeLayout[@resource-id="ch.payyap.smartpos:id/rlRedeemAmount"]');
       await addquantityField.click();
        await key.enterNumberOnScreen(2);
 
        const addbutton = await $('//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/tvAdd"]');
        await addbutton.click();
 
        const cartbutton = await $('//android.widget.TextView[@text="Cart"]');
        await cartbutton.click();
 
        const paybutton = await $('//android.widget.TextView[@text="Pay"]');;
        await paybutton.click();
 
        const cashbutton = await $('//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/tvName" and @text="Cash"]');;
        await cashbutton.click();
 
        // Wait for the toast message to appear
const toastMessage = await $('//android.widget.Toast[@text="Order has been placed successfully."]');
 
// Get its text
const toastText = await toastMessage.getText();
console.log('Toast message:', toastText);
await key.AllureScreenshot('Order placed successfully');
 
 
        const noreceiptbutton = await $('//android.widget.TextView[@text="No Receipt"]');;
        await noreceiptbutton.click();
 
       
    });
 
});
 