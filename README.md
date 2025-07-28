# Playwright Test Automation - Demo Web Shop

This project contains end-to-end automated UI tests for the Demo Web Shop application using **Playwright** and **Page Object Model (POM)**.

---

## Quick Setup (1–2 minutes)

### Prerequisites
- Node.js (v16+ recommended)
- Git installed

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/bitraazure/playwright-demo-webshop.git
cd playwright-demo-webshop

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Run all tests
npx playwright test

### Run a specific test

npx playwright test tests/demoWebShop.spec.ts --grep "Login"

### View HTML test report

npx playwright show-report

### API Testing with Postman/Newman

newman run restful-booker.postman_collection.json

### Author
Github: bitraazure
Contact: sarathbabubitra@gmail.com

