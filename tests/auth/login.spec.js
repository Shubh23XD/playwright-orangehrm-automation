// tests/auth/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage'); // Use { LoginPage }

test('TC-01: Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page); // Use 'login' instead of 'loginPage'
    await login.gotoLoginPage();
    await login.login('Admin', 'admin123');
    await expect(page).toHaveURL(/dashboard/);
});

test('TC-02: Login with incorrect password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('Admin', 'Test123');
    await expect(login.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/i);
});

test('TC-03: Login with incorrect username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('Test', 'admin123');
    await expect(login.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/i);
});

test('TC-04: Required message for empty Login attempt', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.loginWithEmptyCredentials();
    await expect(login.requiredMessage).toHaveCount(2);
    await expect(page).toHaveURL(/auth\/login/i);
});

test('TC-05: Login with only username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('Admin', '');
    await expect(login.requiredMessage).toHaveCount(1);
    await expect(page).toHaveURL(/auth\/login/i);
});

test('TC-06: Login with only password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('', 'admin123');
    await expect(login.requiredMessage).toHaveCount(1);
    await expect(page).toHaveURL(/auth\/login/i);
});

test('TC-07: Login with different case username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('admin', 'admin123');
    await expect(login.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/i);
});

test('TC-08: Password field should be masked', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await expect(login.passwordTextbox).toHaveAttribute('type', 'password');
});

test('TC-09: Forgot Password navigation', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.forgotPasswordButton.click();
    await expect(page).toHaveURL(/requestPasswordResetCode/);
    await expect(page.getByRole('button', { name: 'Reset Password' })).toBeVisible();
});

test('TC-10: Login with SQL injection attempt', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login("' OR '1'='1", "' OR '1'='1");
    await expect(login.invalidCredentialsMessage).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/i);
});