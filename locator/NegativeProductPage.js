import { $ } from "@wdio/globals";
import { keywords } from "../keyword.js";

const key = new keywords();

class NegativeProductPage {
  // Locators
  get addProductButton() {
    return $('//android.widget.TextView[@text="Add Product"]');
  }
  get productNameField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_name_edit_text"]'
    );
  }

  get visibilityDropdown() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_visibility_edit_text"]'
    );
  }
  visibilityOption(productVisibility) {
    return $(`//android.widget.TextView[@text="${productVisibility}"]`);
  }

  get unitDropdown() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_unit_edit_text"]'
    );
  }
  unitOption(unit) {
    return $(`//android.widget.TextView[@text="${unit}"]`);
  }
  get sellingPriceField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_selling_edit_text"]'
    );
  }
  get purchasePriceField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_purchase_edit_text"]'
    );
  }
  get vatSaleDropdown() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_vat_sale_edit_text"]'
    );
  }
  vatSaleOption(vatText) {
    return $(`//android.widget.TextView[@text="${vatText}"]`);
  }
  get vatPurchaseDropdown() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_vat_purchase_edit_text"]'
    );
  }
  vatPurchaseOption(vatText) {
    return $(`//android.widget.TextView[@text="${vatText}"]`);
  }

  skuTField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_sku_edit_text"]'
    );
  }

  barcodeField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_barcode_edit_text"]'
    );
  }
  get stockField() {
    return $('//android.widget.EditText[@text="0"]');
  }

  stockinputField() {
    return $(
      '(//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/stock_text_input_edit_text"])'
    );
  }
  get descriptionField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_description_edit_text"]'
    );
  }
  get saveButton() {
    return $('//android.widget.Button[@content-desc="Save"]');
  }
  get snackbarText() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/snackbar_text"]'
    );
  }

  async getSnackbarMessage() {
    await this.snackbarText.waitForDisplayed({ timeout: 5000 });
    await key.AllureScreenshot("Product is created"); // wait for snackbar
    return await this.snackbarText.getText();
    // get the text
  }

  async createProduct(data) {
    await key.verifyElementDisplayed(this.addProductButton, "Add Product");
    await this.addProductButton.click();
    await key.AllureScreenshot("Clicked Add Product Button");

    await this.productNameField.setValue(data.productName);
    await key.AllureScreenshot("Entered Product Name");

    await this.visibilityDropdown.click();
    await this.visibilityOption(data.productVisibility).click();
    await key.AllureScreenshot("Selected Product Visibility");
    const selectedType = await this.visibilityDropdown.getText();
    if (selectedType === data.productVisibility) {
      console.log(` Product Type selected correctly: ${selectedType}`);
      await key.AllureScreenshot(`Product Type Verified: ${selectedType}`);
    } else {
      console.log(
        `Product Type mismatch! Expected: ${data.productVisibility}, Actual: ${selectedType}`
      );
      await key.AllureScreenshot(
        `Product Type Verification Failed: ${selectedType}`
      );
    }

    await this.unitDropdown.click();
    await this.unitOption(data.unit).click();
    await key.AllureScreenshot("Selected Product Unit");
    const selectedunitType = await this.unitDropdown.getText();
    if (selectedunitType === data.unit) {
      console.log(` Product Type selected correctly: ${selectedunitType}`);
      await key.AllureScreenshot(`Product Type Verified: ${selectedunitType}`);
    } else {
      console.log(
        `Product Type mismatch! Expected: ${data.unit}, Actual: ${selectedunitType}`
      );
      await key.AllureScreenshot(
        `Product Type Verification Failed: ${selectedunitType}`
      );
    }

    await this.sellingPriceField.setValue(data.sellingPrice);
    await key.AllureScreenshot("Entered Selling Price");
    await this.purchasePriceField.setValue(data.purchasePrice);
    await key.AllureScreenshot("Entered Purchase Price");
    await this.vatSaleDropdown.click();
    await this.vatSaleOption(data.vatSale).click();
    await key.AllureScreenshot("Selected VAT Sale");

    await browser.hideKeyboard();
    await key.scrollToElement("Product description");

    const selectedVatSale = await this.vatSaleDropdown.getText();
    if (selectedVatSale === data.vatSale) {
      console.log(` Product Type selected correctly: ${selectedVatSale}`);
      await key.AllureScreenshot(`Product Type Verified: ${selectedVatSale}`);
    } else {
      console.log(
        `Product Type mismatch! Expected: ${data.vatSale}, Actual: ${selectedVatSale}`
      );
      await key.AllureScreenshot(
        `Product Type Verification Failed: ${selectedVatSale}`
      );
    }

    await this.vatPurchaseDropdown.click();
    await this.vatPurchaseOption(data.vatPurchase).click();
    await key.AllureScreenshot("Selected VAT Purchase");
    const selectedVatPurchase = await this.vatPurchaseDropdown.getText();
    if (selectedVatPurchase === data.vatPurchase) {
      console.log(` Product Type selected correctly: ${selectedVatPurchase}`);
      await key.AllureScreenshot(
        `Product Type Verified: ${selectedVatPurchase}`
      );
    } else {
      console.log(
        `Product Type mismatch! Expected: ${data.vatSale}, Actual: ${selectedVatPurchase}`
      );
      await key.AllureScreenshot(
        `Product Type Verification Failed: ${selectedVatPurchase}`
      );
    }

    const skuField = await this.skuTField();
    await skuField.clearValue();
    await skuField.setValue(data.sku);
    await key.AllureScreenshot("Entered SKU");

    await browser.hideKeyboard();
    await this.stockField.click(); // optional, if needed
    const stockInput = await this.stockinputField();
    await stockInput.clearValue();
    await stockInput.setValue(data.stock);
    await key.AllureScreenshot("Entered Stock");

    await $('//android.widget.TextView[@text="Save"]').click();

    await browser.hideKeyboard();
    await this.descriptionField.setValue(data.description);
    await key.AllureScreenshot("Entered Description");

    await this.saveButton.click();
    await key.AllureScreenshot("Clicked Save Button");

    const message = await this.getSnackbarMessage();
    console.log("Snackbar message:", message);

    if (
      expect(message).toContain(
        `${data.productName} has been created successfully!`
      )
    ) {
      await key.AllureScreenshot("Product created successfully");
      await key.AllurePass("Product created successfully");
    } else {
      console.log(
        "The popup for an already used SKU is displayed in German instead of English."
      );
      await key.AllureFail(
        "the popup for an already used SKU is displayed in German instead of English"
      );
    }
  }
}

export default new NegativeProductPage();
