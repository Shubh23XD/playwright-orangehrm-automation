// pages/loginPage.js
class LoginPage { // Tip: Capital 'L' for classes
    constructor(page) {
        this.page = page;
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialsMessage = page.getByText('Invalid credentials');
        this.requiredMessage = page.getByText('Required');
        this.forgotPasswordButton = page.getByText('Forgot your password?');
    }

    async gotoLoginPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username, password) {
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }

    async loginWithEmptyCredentials() {
        await this.loginButton.click();
    }


}

module.exports = { LoginPage }; // MAKE SURE THIS LINE IS PRESENT
