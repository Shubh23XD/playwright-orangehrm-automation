# Playwright Automation - OrangeHRM

## Overview

This project demonstrates end-to-end UI automation using Playwright (JavaScript) on the OrangeHRM demo application.

## Tech Stack

* Playwright (JS)
* Node.js
* GitHub Actions (CI)

## Test Coverage

### Authentication

* Login with valid credentials
* Login with invalid credentials
* Validation for empty fields
* Password masking verification
* Forgot password navigation

## Project Structure

```
/tests
/pages
/utils
```

## How to Run Tests

```bash
npm install
npx playwright install
npx playwright test
```

## View Report

```bash
npx playwright show-report
```

## CI/CD

Tests run automatically on every push using GitHub Actions.

## Key Highlights

* Page Object Model (POM)
* Cross-browser testing
* HTML reporting with traces/screenshots
* Scalable test structure

```
```
