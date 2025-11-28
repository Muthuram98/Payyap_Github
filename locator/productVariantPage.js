import { keywords } from "../keyword";
import ProductPage from "./ProductPage.js";
const key = new keywords();
class ProductvarientPage {

    // === Product Creation Locators ===
    get addProductButton() { return $('//android.widget.TextView[@text="Add Product"]'); }
    get productTypeField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_type_edit_text"]'); }
    productTypeOption(option) { return $(`//android.widget.TextView[@text="${option}"]`); }

    get productNameField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_name_edit_text"]'); }

    get visibilityDropdown() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_visibility_edit_text"]'); }
    visibilityOption(option) { return $(`//android.widget.TextView[@text="${option}"]`); }

    get unitDropdown() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_unit_edit_text"]'); }
    unitOption(option) { return $(`//android.widget.TextView[@text="${option}"]`); }

    get vatSaleDropdown() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_vat_sale_edit_text"]'); }
    vatSaleOption(option) { return $(`//android.widget.TextView[@text="${option}"]`); }

    get vatPurchaseDropdown() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_vat_purchase_edit_text"]'); }
    vatPurchaseOption(option) { return $(`//android.widget.TextView[@text="${option}"]`); }

    get productDescriptionField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_description_edit_text"]'); }

    get continueToVariantButton() { return $('//android.widget.Button[@resource-id="ch.payyap.smartpos:id/btnContinueToVariant"]'); }
    get variantNameField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/input_edit_text"]'); }
    get variantAttributeField() { return $('//androidx.recyclerview.widget.RecyclerView[@resource-id="ch.payyap.smartpos:id/rvSuggestions"]/android.widget.LinearLayout'); }
    get addOptionButton() { return $('//android.widget.TextView[@text="Add option"]'); }
    get optionNameField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/etOptionName"]'); }
    // get createVariantButton() { return $('//android.widget.Button[@resource-id="ch.payyap.smartpos:id/btnContinueToVariant"]'); }
    // //android.widget.Button[@resource-id="ch.payyap.smartpos:id/btnContinueToVariant"]
 get createVariantButton() {
    return $('android=new UiSelector().resourceId("ch.payyap.smartpos:id/btnContinueToVariant")');
}

get createvarientconfirmButton() {
 return $('//android.widget.Button[@resource-id="ch.payyap.smartpos:id/btnCreateVariants"]');
}
    get stockField() { return $('//android.widget.EditText[@text="0"]'); }
    get stockInputField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/stock_text_input_edit_text"]'); }
    get saveStockButton() { return $('//android.widget.TextView[@text="Save"]'); }

    get sellingPriceField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_selling_edit_text"]'); }
    get purchasePriceField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/product_purchase_edit_text"]'); }
    get saveProductButton() { return $('//android.widget.Button[@content-desc="Save"]'); }

    // === Product Search Locators ===
    get menuButton() { return $('//android.widget.ImageButton[@content-desc="Open navigation drawer"]'); }
    get productsMenuItem() { return $('//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/item_side_menu_title" and @text="Products"]'); }
    get productSearchField() { return $('//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/input_edit_text_qr"]'); }
    searchedProduct(name) { return $(`//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/product_desc_first_line_name" and @text="${name}"]`); }

    // === Methods ===

    async createProduct(p, key) {
        await this.addProductButton.click();
        await key.AllureScreenshot('Add Product Page Opened');
        await this.productTypeField.click();
        await key.AllureScreenshot('Product Type Dropdown Opened');
        await this.productTypeOption(p.variant).click();
        await key.AllureScreenshot(`Selected Product Type: ${p.variant}`);

        const selectedType = await this.productTypeField.getText(); 
if (selectedType === p.variant) {
    console.log(` Product Type selected correctly: ${selectedType}`);
    await key.AllureScreenshot(`Product Type Verified: ${selectedType}`);
} else {
    console.log(`Product Type mismatch! Expected: ${p.variant}, Actual: ${selectedType}`);
    await key.AllureScreenshot(`Product Type Verification Failed: ${selectedType}`);
}


        await this.productNameField.setValue(p.name);
    

        await this.visibilityDropdown.click();
        await key.AllureScreenshot('Visibility Dropdown Opened');
        await this.visibilityOption(p.visibility).click();
        await key.AllureScreenshot(`Selected Visibility: ${p.visibility}`);

        const selectedvisibilityType = await this.visibilityDropdown.getText(); 
if (selectedvisibilityType === p.visibility) {
    console.log(` Product Type selected correctly: ${selectedvisibilityType}`);
    await key.AllureScreenshot(`Product Type Verified: ${selectedvisibilityType}`);
} else {
    console.log(`Product Type mismatch! Expected: ${p.visibility}, Actual: ${selectedvisibilityType}`);
    await key.AllureScreenshot(`Product Type Verification Failed: ${selectedvisibilityType}`);
}


        await this.unitDropdown.click();
        await key.AllureScreenshot('Unit Dropdown Opened');
        await this.unitOption(p.unit).click();
        await key.AllureScreenshot(`Selected Unit: ${p.unit}`);
  const selectedUnitType = await this.unitDropdown.getText(); 
if (selectedUnitType === p.unit) {
    console.log(` Product Type selected correctly: ${selectedUnitType}`);
    await key.AllureScreenshot(`Product Type Verified: ${selectedUnitType}`);
} else {
    console.log(`Product Type mismatch! Expected: ${p.unit}, Actual: ${selectedUnitType}`);
    await key.AllureScreenshot(`Product Type Verification Failed: ${selectedUnitType}`);
}


        await this.vatSaleDropdown.click();
        await key.AllureScreenshot('VAT Sale Dropdown Opened');
        await this.vatSaleOption(p.vatSale).click();
        await key.AllureScreenshot(`Selected VAT Sale: ${p.vatSale}`);
const selectedVatType = await this.vatSaleDropdown.getText(); 
if (selectedVatType === p.vatSale) {
    console.log(` Product Type selected correctly: ${selectedVatType}`);
    await key.AllureScreenshot(`Product Type Verified: ${selectedVatType}`);
} else {
    console.log(`Product Type mismatch! Expected: ${p.vatSale}, Actual: ${selectedVatType}`);
    await key.AllureScreenshot(`Product Type Verification Failed: ${selectedVatType}`);
}


        await this.vatPurchaseDropdown.click();
        await key.AllureScreenshot('VAT Purchase Dropdown Opened');
        await this.vatPurchaseOption(p.vatPurchase).click();
        await key.AllureScreenshot(`Selected VAT Purchase: ${p.vatPurchase}`);
const selectedVatPurchaseType = await this.vatPurchaseDropdown.getText(); 
if (selectedVatPurchaseType === p.vatPurchase) {
    console.log(` Product Type selected correctly: ${selectedVatPurchaseType}`);
    await key.AllureScreenshot(`Product Type Verified: ${selectedVatPurchaseType}`);
} else {
    console.log(`Product Type mismatch! Expected: ${p.vatPurchase}, Actual: ${selectedVatPurchaseType}`);
    await key.AllureScreenshot(`Product Type Verification Failed: ${selectedVatPurchaseType}`);
}



        await key.scrollToElement('Product description');
        await this.productDescriptionField.setValue(p.description);
        await key.AllureScreenshot('Entered Product Description');

        await browser.hideKeyboard();
        // const bgColor = await this.continueToVariantButton.getAttribute('background');
        // console.log("Button background:", bgColor);

        await this.continueToVariantButton.click();
        await key.AllureScreenshot('Variant Page Opened');

        await this.variantNameField.setValue(p.variantAttribute);
        await this.variantAttributeField.click();


        await this.addOptionButton.click();
        await key.AllureScreenshot('Add Option Dialog Opened');
        await this.optionNameField.setValue(p.optionName);
        await browser.hideKeyboard();

        await this.createVariantButton.click();
        await key.AllureScreenshot('Variants Created');
        await this.createvarientconfirmButton.click();
        await key.AllureScreenshot('Confirmed Variant Creation');

        await this.stockField.click();
        await this.stockInputField.clearValue();
        await this.stockInputField.setValue(p.stock);
        await this.saveStockButton.click();
        await key.AllureScreenshot('Stock Added');

        await this.sellingPriceField.setValue(p.sellingPrice);
        await key.AllureScreenshot('Entered Selling Price');
        await this.purchasePriceField.setValue(p.purchasePrice);
        await key.AllureScreenshot('Entered Purchase Price');

        await this.saveProductButton.click();
        await key.AllureScreenshot('Product Saved');

       

            // Optional: get toast message
          async function getToastMessage(timeout = 3000) {
    const start = Date.now();
    while ((Date.now() - start) < timeout) {
        const pageSource = await driver.getPageSource();
        // Only match Toast elements
        const toastMatches = pageSource.match(/<android\.widget\.Toast[^>]*text="([^"]+)"[^>]*\/>/g);
        if (toastMatches && toastMatches.length > 0) {
            // Take the first Toast element
            const firstToast = toastMatches[0].match(/text="([^"]+)"/);
            if (firstToast && firstToast[1]) {
                return firstToast[1];
            }
        }
        await new Promise(r => setTimeout(r, 100));
    }
    throw new Error('Toast message not found');
}

            const toastMsg = await getToastMessage(3000);
            console.log('Toast Message:', toastMsg);
            await key.AllureScreenshot(`Toast Message: ${toastMsg}`);
            await key.AllureScreenshot('Product Created Toast Displayed');

    }

    async searchProduct(name) {
        await this.menuButton.click();
        await key.AllureScreenshot('Menu Opened');
        await this.productsMenuItem.click();
        await key.AllureScreenshot('Products Page Opened');
        await this.productSearchField.setValue(name);
        await key.AllureScreenshot(`Searched for Product: ${name}`);

        const product = await this.searchedProduct(name);
        return product.isDisplayed();
    }


}

export default new ProductvarientPage();
