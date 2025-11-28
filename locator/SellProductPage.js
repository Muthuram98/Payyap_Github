import { keywords } from "../keyword.js";
const key = new keywords();

class SellProductPage {
  // ------------------- LOCATORS -------------------
  get sellButton() {
    return $(
      '//android.widget.LinearLayout[@resource-id="ch.payyap.smartpos:id/on_click_sell"]'
    );
  }

  get startSaleButton() {
    return $("id:dashboard_start_sale_btn");
  }

  get searchField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/input_edit_text_qr"]'
    );
  }

  get quantityField() {
    return $(
      '//android.widget.RelativeLayout[@resource-id="ch.payyap.smartpos:id/rlRedeemAmount"]'
    );
  }

  get addButton() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/tvAdd"]'
    );
  }

  get cartButton() {
    return $('//android.widget.TextView[@text="Cart"]');
  }

  get payButton() {
    return $('//android.widget.TextView[@text="Pay"]');
  }

  get cashPayment() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/tvName" and @text="Cash"]'
    );
  }

  get noReceiptButton() {
    return $('//android.widget.TextView[@text="No Receipt"]');
  }

  // ------------------- METHODS -------------------

  async openSellPage() {
    await this.sellButton.click();
    await key.AllureScreenshot("Sell Page Opened");
  }

  async searchAndSelectProduct(productName) {
    await this.searchField.clearValue();
    await browser.pause(500);

    // Type product name letter by letter
    let currentValue = "";
    for (const char of productName) {
      currentValue += char;
      await browser.pause(400);

      await this.searchField.setValue(currentValue);
      await browser.pause(400);
    }

    await key.AllureScreenshot(`Typed product name: ${productName}`);

    // Scroll to the product if not visible
    const productXpath = `//android.widget.TextView[@text="${productName}"]`;
    const productElement = await $(productXpath);

    if (!(await productElement.isDisplayed())) {
      await driver.execute("mobile: scroll", {
        direction: "down",
        element: (await this.searchField).elementId,
      });
    }

    if (await productElement.isDisplayed()) {
      await productElement.click();
      await key.AllureScreenshot(`Selected product: ${productName}`);
    } else {
      throw new Error(`Product not found: ${productName}`);
    }
  }

  // async searchAndSelectProduct(productName) {
  //     // Clear search and type the product name to narrow results (optional)
  //     await this.searchField.clearValue();
  //     await browser.pause(300);
  //     await this.searchField.setValue(productName);
  //     // Press Enter / Done key on Android to apply the search filter
  //     try {
  //         await driver.pressKeyCode(66);
  //     } catch (e) {
  //         // ignore if pressKeyCode isn't available in environment
  //     }

  //     await browser.pause(500);
  // // await browser.debug();

  //     // Primary approach: use Android UiScrollable to scroll the full view and locate the item by exact text
  //     const uiScrollable = `android=new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("${productName}").instance(0));`;
  //     try {
  //         const productElem = await $(uiScrollable);
  //         await productElem.waitForDisplayed({ timeout: 5000 });
  //         await productElem.click();
  //         await key.AllureScreenshot(`Selected product (UiScrollable): ${productName}`);
  //         return;
  //     } catch (err) {
  //         // Fallthrough to alternative strategies if UiScrollable didn't find the element
  //     }

  //     // Fallback 1: try locating by xpath and basic scroll command
  //     const productXpath = `//android.widget.TextView[@text="${productName}"]`;
  //     let productElement = await $(productXpath);
  //     if (await productElement.isDisplayed().catch(() => false)) {
  //         await productElement.click();
  //         await key.AllureScreenshot(`Selected product (xpath): ${productName}`);
  //         return;
  //     }

  //     // Fallback 2: perform a few manual swipe-up gestures and check for the element each time
  //     const maxSwipes = 6;
  //     for (let i = 0; i < maxSwipes; i++) {
  //         // Vertical swipe up (from near bottom to near top)
  //         try {
  //             await driver.touchAction([
  //                 { action: 'press', x: 500, y: 1600 },
  //                 { action: 'moveTo', x: 500, y: 400 },
  //                 'release'
  //             ]);
  //         } catch (e) {
  //             // If touchAction isn't supported, try execute mobile: swipe as a last resort
  //             try {
  //                 await driver.execute('mobile: swipe', { direction: 'up' });
  //             } catch (e2) {
  //                 // ignore and continue
  //             }
  //         }

  //         await browser.pause(700);
  //         productElement = await $(productXpath);
  //         if (await productElement.isDisplayed().catch(() => false)) {
  //             await productElement.click();
  //             await key.AllureScreenshot(`Selected product (swipe): ${productName}`);
  //             return;
  //         }
  //     }

  //     // If still not found, throw a clear error
  //     throw new Error(`Product not found after scrolling: ${productName}`);
  // }

  async enterQuantity(qty) {
    await this.quantityField.click();
    await key.enterNumberOnScreen(qty);
    await key.AllureScreenshot(`Quantity Added: ${qty}`);
  }

  async addToCart() {
    await this.addButton.click();
    await browser.pause(500);
    await key.AllureScreenshot("Added to Cart");
  }

  async goToCart() {
    await this.cartButton.click();
    await key.AllureScreenshot("Cart Page");
  }

  async makePayment() {
    await this.payButton.click();
    await this.cashPayment.click();
    await key.AllureScreenshot("Payment Completed");
  }

  async getToastMessage() {
    const toast = await $("//android.widget.Toast");
    return await toast.getText();
  }

  async finishWithoutReceipt() {
    await this.noReceiptButton.click();
  }

  // ------------------- LOOP FLOW FOR MULTIPLE PRODUCTS -------------------
  async sellMultipleProducts(productsArray) {
    for (const item of productsArray) {
      await this.searchAndSelectProduct(item.productName);
      await this.enterQuantity(item.quantity);
      await this.addToCart();
    }

    await this.goToCart();
    await this.makePayment();
  }
}

export default new SellProductPage();
