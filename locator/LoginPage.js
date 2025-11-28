import { $, browser } from "@wdio/globals";
import { keywords } from "../keyword.js";

const key = new keywords();

class LoginPage {
  get usernameField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/sign_in_email_edit_text"]'
    );
  }

  get passwordField() {
    return $(
      '//android.widget.EditText[@resource-id="ch.payyap.smartpos:id/sign_in_password_edit_text"]'
    );
  }

  get loginButton() {
    return $(
      '//android.widget.Button[@resource-id="ch.payyap.smartpos:id/sign_in_sign_in_button"]'
    );
  }

  async login(username, password, SignIn_Button_Color) {
    await browser.setTimeout({ implicit: 60000 });

    // Enter username
    await key.click(this.usernameField, "Click Username Field");
    await key.setValue(this.usernameField, username, "Enter Username");

    // Enter password
    await key.click(this.passwordField, "Click Password Field");
    await key.setValue(this.passwordField, password, "Enter Password");

    // Verify button background color
    await key.verifyButtonColor(
      this.loginButton,
      SignIn_Button_Color,
      "Sign In Button Color verification"
    );

    // Click login
    await key.click(this.loginButton, "Click Login Button");
  }
}

export default new LoginPage();
