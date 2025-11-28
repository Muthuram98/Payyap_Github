import { keywords } from "../keyword.js";
const key = new keywords();

class Registerpage {
  // Locators
  get messageText() {
    return $("id=android:id/message");
  }

  get okButton() {
    return $("id=android:id/button2");
  }

  get plusbutton() {
    return $('//android.widget.Button[@content-desc="Save"]');
  }

  get new_Register() {
    return $('//android.widget.TextView[@text="New Register"]');
  }

  get register_name_field() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/etNote"]'
    );
  }

  get select_warehouse() {
    return $('//android.widget.EditText[@text="Select warehouse"]');
  }

  get warehouse_option() {
    return $(
      '//android.widget.LinearLayout[@resource-id="ch.payyap.smartpos:id/tInSearch"]'
    );
  }

  get select_warehouse_option() {
    return $(
      '//android.widget.LinearLayout[@resource-id="ch.payyap.smartpos:id/llRoot"]/android.widget.ImageView'
    );
  }

  get save_button() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/btnApply"]'
    );
  }

  get add_button() {
    return $('//android.widget.Button[@content-desc="Add"]');
  }

  get choose_register() {
    return $('//android.widget.TextView[@text="test2"]');
  }

  get select_register_Option() {
    return $('//android.widget.TextView[@text="Select register"]');
  }

  get link_registerPopup() {
    return $('//android.widget.TextView[@resource-id="android:id/message"]');
  }

  // fixed duplicate by keeping one correct selector
  get linkregisterOk_Button() {
    return $('//android.widget.Button[@resource-id="android:id/button1"]');
  }

  get search_Register_Field() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/input_edit_text"]'
    );
  }

  get search_Register_Field() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/input_edit_text"]'
    );
  }

  get opencash_Register_Option() {
    return $('//android.widget.TextView[@text="Open the cash register"]');
  }

  get cash_Balance_Field() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/register_opening_balance"]'
    );
  }

  get open_button() {
    return $('//android.widget.TextView[@text="Open"]');
  }

  get menuButton() {
    return $(
      '//android.widget.ImageButton[@content-desc="Open navigation drawer"]'
    );
  }
  get dahsboard() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/item_side_menu_title" and @text="Dashboard"]'
    );
  }

  get registers() {
    return $(
      '//android.widget.TextView[@resource-id="ch.payyap.smartpos:id/item_side_menu_title" and @text="Registers"]'
    );
  }

  get unlink_registers() {
    return $('//android.widget.TextView[@text="Unlink register"]');
  }

  /**
   * Selectregister
   * - uses common key methods for click, setValue and getText
   * - attaches Allure screenshots via key.AllureScreenshot when needed
   */
  async Selectregister(Registername = "test2") {
    // 1) If message alert displayed, validate and click ok
    try {
      await key.waitForDisplayed(
        this.messageText,
        5000,
        "Wait for Register Alert"
      );
      const message = await key.getText(
        this.messageText,
        "Read register alert message"
      );
      console.log("Message Text:", message);

      // assert message
      expect(message).toEqual("Please select a register");

      // click OK on alert using key wrapper
      await key.click(this.okButton, "Click OK on Register Alert");
    } catch (err) {
      // If the alert is not present, continue — message might not be shown always
      console.log(
        "[INFO] Register alert not present or already handled:",
        err.message ?? err
      );
    }

    //   await key.click(this.search_Register_Field, "Click Search Register Field");

    //   await key.setValue(
    //     this.search_Register_Field,
    //     Registername,
    //     "Enter Register Search Value"
    //   );

    //   await key.click(this.choose_register, "Select Register from Search List");

    //   await key.click(this.unlink_registers, "Click Unlink Register Button");

    //   await key.waitForDisplayed(
    //     this.linkregisterOk_Button,
    //     10000,
    //     "Wait for Unlink Register ok Popup"
    //   );

    //   await key.click(
    //     this.linkregisterOk_Button,
    //     "Click OK on Unlink Register Popup"
    //   );

    //   await browser.pause(5000);

    //   await key.click(this.choose_register, "Select Register from Search List");

    //   await key.click(this.select_register_Option, "Confirm Register Selection");

    //   // 3) If link register popup appears, validate and click ok
    //   try {
    //     await key.waitForDisplayed(
    //       this.link_registerPopup,
    //       5000,
    //       "Wait for Link Register Popup"
    //     );
    //     const linkPopupText = await key.getText(
    //       this.link_registerPopup,
    //       "Read Link register popup message"
    //     );
    //     console.log("Link Popup Text:", linkPopupText);

    //     //   // assert popup message
    //     expect(linkPopupText).toEqual("Link register to serial number");

    //     // click OK on link popup
    //     await key.click(
    //       this.linkregisterOk_Button,
    //       "Click OK on Link Register Popup"
    //     );
    //   } catch (err) {
    //     // popup may not always appear
    //     console.log(
    //       "[INFO] Link register popup not present or already handled:",
    //       err.message ?? err
    //     );
    //   }

    // Search for register
    await key.click(this.search_Register_Field, "Click Search Register Field");
    await key.setValue(
      this.search_Register_Field,
      "test2",
      "Enter Register Name"
    );
    await key.click(this.choose_register, "Select Register");

    // If unlink option is visible, unlink first
    if (await this.unlink_registers.isDisplayed()) {
      await key.click(this.unlink_registers, "Click Unlink Register Button");
      await key.click(this.linkregisterOk_Button, "Confirm Unlink Register");

      // Re-search register after unlink
      await key.click(this.search_Register_Field, "Click Search Field Again");
      await key.setValue(
        this.search_Register_Field,
        "test2",
        "Enter Register Name Again"
      );
      await key.click(this.choose_register, "Select Register Again");
      await key.click(
        this.select_register_Option,
        "Confirm Register Selection"
      );
    } else {
      // Direct select if no unlink option
      await key.click(
        this.select_register_Option,
        "Confirm Register Selection"
      );
    }

    // Handle link popup if displayed
    if (await this.link_registerPopup.isDisplayed()) {
      await key.waitForDisplayed(
        this.link_registerPopup,
        10000,
        "Wait Link Register Popup"
      );
      const Link_Popup = await key.getText(
        this.link_registerPopup,
        "Read Link Register Popup Text"
      );

      console.log("Message Text:", Link_Popup);

      // Validate popup message
      expect(Link_Popup).toEqual("Link register to serial number");

      // Click OK on popup
      await key.click(
        this.linkregisterOk_Button,
        "Click OK on Link Register Popup"
      );
    }
  }
}

export default new Registerpage();
