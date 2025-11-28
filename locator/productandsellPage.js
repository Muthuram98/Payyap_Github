import { $ } from "@wdio/globals";
import { keywords } from "../keyword.js";
const key = new keywords();
import { EndToEnd } from "../datasheet/EndToEnd.js";

class productandsellPage {
  // ================= Locators =================
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
  visibilityOption(option) {
    return $(`//android.widget.TextView[@text="${option}"]`);
  }

  get unitDropdown() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_unit_edit_text"]'
    );
  }
  unitOption(option) {
    return $(`//android.widget.TextView[@text="${option}"]`);
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
  vatSaleOption(option) {
    return $(`//android.widget.TextView[@text="${option}"]`);
  }

  get vatPurchaseDropdown() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_vat_purchase_edit_text"]'
    );
  }
  vatPurchaseOption(option) {
    return $(`//android.widget.TextView[@text="${option}"]`);
  }

  get stockField() {
    return $('//android.widget.EditText[@text="0"]');
  }
  stockInputField() {
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

  // Sale locators
  get sellButton() {
    return $(
      '//android.widget.LinearLayout[@resource-id="ch.payyap.smartpos:id/on_click_sell"]'
    );
  }
  get plusButton() {
    return $('//android.widget.Button[@content-desc="Add New"]');
  }
  get selectTable() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/tvName"]'
    );
  }
  get searchOrderField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/input_edit_text_qr"]'
    );
  }
  get selectOrderedProduct() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/tvName"]'
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
  get placeOrderButton() {
    return $(
      '//android.widget.ImageView[@resource-id="ch.payyap.smartpos:id/ivCreateAndPay"]'
    );
  }
  get closeBillButton() {
    return $(
      '//android.widget.Button[@resource-id="ch.payyap.smartpos:id/btnCloseBill"]'
    );
  }
  get cashButton() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/tvName" and @text="Cash"]'
    );
  }

  // Inventory locators
  get backToHomeButton() {
    return $('//android.widget.ImageButton[@content-desc="Navigate up"]');
  }
  get menuButton() {
    return $(
      '//android.widget.ImageButton[@content-desc="Open navigation drawer"]'
    );
  }
  get inventoryMenu() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/item_side_menu_title" and @text="Inventory"]'
    );
  }
  get inventorySearchField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/input_edit_text_qr"]'
    );
  }

  // ================= Methods =================

  // Product creation
  async createProduct(data) {
    await key.waitForDisplayed(
      this.addProductButton,
      10000,
      "Wait for Add Product Button"
    );

    await key.click(this.addProductButton, "Click Add Product Button");

    await key.setValue(
      this.productNameField,
      data.productName,
      "Enter Product Name"
    );

    await key.click(this.visibilityDropdown, "Open Visibility Dropdown");
    await key.click(
      this.visibilityOption(data.productVisibility),
      "Select Product Visibility"
    );

    await key.click(this.unitDropdown, "Open Unit Dropdown");
    await key.click(this.unitOption(data.unit), "Select Product Unit");

    await key.setValue(
      this.sellingPriceField,
      data.sellingPrice,
      "Enter Selling Price"
    );
    await key.setValue(
      this.purchasePriceField,
      data.purchasePrice,
      "Enter Purchase Price"
    );

    await key.scrollToElement("Product description");

    await key.click(this.vatSaleDropdown, "Open VAT Sale Dropdown");
    await key.click(this.vatSaleOption(data.vatSale), "Select VAT Sale");

    await key.click(this.vatPurchaseDropdown, "Open VAT Purchase Dropdown");
    await key.click(
      this.vatPurchaseOption(data.vatPurchase),
      "Select VAT Purchase"
    );

    await key.click(this.stockField, "Click Stock Field");
    const stockInput = await this.stockInputField();
    await stockInput.clearValue();
    await key.setValue(stockInput, data.stock, "Enter Stock Value");

    await key.click(
      $('//android.widget.TextView[@text="Save"]'),
      "Click First Save Button"
    );

    await key.setValue(
      this.descriptionField,
      data.description,
      "Enter Product Description"
    );

    await key.click(this.saveButton, "Click Final Save Button");

    await key.waitForDisplayed(
      this.snackbarText,
      5000,
      "Wait for Snackbar Message"
    );
    const message = await key.getText(this.snackbarText, "Read Snackbar Text");
    expect(message).toContain(
      `${data.productName} has been created successfully!`
    );
  }

  // Sell product
  async sellProduct(data) {
    await key.click(this.sellButton, "Click Sell Button");

    await key.waitForDisplayed(this.plusButton, 10000, "Wait Plus Button");
    await key.click(this.plusButton, "Click Plus Button");

    await key.waitForDisplayed(this.selectTable, 10000, "Wait for Table");
    await key.click(this.selectTable, "Select Table");

    await key.waitForDisplayed(
      this.searchOrderField,
      10000,
      "Wait Order Search"
    );
    await key.setValue(
      this.searchOrderField,
      data.productName,
      "Search Product"
    );

    await key.waitForDisplayed(this.selectOrderedProduct, 10000);
    await key.click(this.selectOrderedProduct, "Select Ordered Product");

    await key.waitForDisplayed(this.quantityField, 10000);
    await key.click(this.quantityField, "Click Quantity");
    await key.enterNumberOnScreen(data.sellQuantity);

    await key.waitForDisplayed(this.addButton, 10000);
    await key.click(this.addButton, "Click Add Item");

    // Toast
    // const toast = await this._getToastMessage(3000).catch(() => "");
    // if (toast) console.log("Toast:", toast);

    const toastMsg = await key.getToastMessage(3000, "Toast after Add Item");
    if (toastMsg) console.log("Toast Message:", toastMsg);

    await key.waitForDisplayed(this.placeOrderButton, 10000);
    await key.click(this.placeOrderButton, "Place Order");

    const toastMsg1 = await key.getToastMessage(
      3000,
      "Toast after Place Order"
    );
    if (toastMsg1) console.log("Toast1:", toastMsg1);
    // if (toast2) console.log("Toast2:", toast2);

    await key.waitForDisplayed(this.closeBillButton, 10000);
    await key.click(this.closeBillButton, "Close Bill");

    await key.waitForDisplayed(this.cashButton, 10000);
    await key.click(this.cashButton, "Select Cash Payment");

    // Price verification
    const totalPrice =
      parseFloat(data.sellingPrice) * parseInt(data.sellQuantity);
    const totalPriceText = `CHF ${totalPrice}.00`;
    const totalPriceElement = await $(
      `//android.widget.TextView[@text="${totalPriceText}"]`
    );

    await key.waitForDisplayed(totalPriceElement, 5000, "Wait Total Price");
    const displayed = await key.getText(totalPriceElement, "Read Total Price");
    expect(displayed).toEqual(totalPriceText);
  }

  // Inventory search
  async searchInventory(productName) {
    await key.click(this.backToHomeButton, "Navigate Back to Home");

    await key.click(this.menuButton, "Open Side Menu");

    await key.click(this.inventoryMenu, "Open Inventory Menu");

    await key.setValue(
      this.inventorySearchField,
      productName,
      "Search Product in Inventory"
    );

    const searchValue = await key.getText(
      this.inventorySearchField,
      "Read Search Field"
    );
    expect(searchValue).toContain(productName);

    await browser.pause(2000); // You can replace with key.wait(2)

    const productElement = await $(
      `//android.widget.TextView[contains(@text, "${productName}")]`
    );
    await key.waitForDisplayed(
      productElement,
      5000,
      "Wait for Product in Inventory"
    );

    const remaining =
      parseFloat(EndToEnd.stock) -
      parseFloat(EndToEnd.sellQuantity) +
      ".00 " +
      EndToEnd.unit;
    const remainingStockElement = await $(
      `//android.widget.TextView[@text="${remaining}"]`
    );

    await key.waitForDisplayed(
      remainingStockElement,
      5000,
      "Wait for Remaining Stock"
    );
  }
}

export default new productandsellPage();
