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

How to install Newman?
•	Download and install node.js
•	Cmd > node -v
•	Cmd > npm -v
•	Cmd > npm install -g newman
•	Cmd > newman -v

How to execute postman collections from command prompt?
•	Export collections and save it with .json extension (Booking_API_Collection.json)
•	Export Environment variables and save it with .json extension (Booking_API_Environment.json)
•	Cmd > cd <location_of_the_json_files_exported>
•	Cmd > newman run <collections_file.json> -e <environment_file.json>

How to generate standard HTML report?
•	Install newman-reporter-html
•	Cmd > npm i -g newman-reporter-html
•	Cmd > newman run <collections_file.json> -e <environment_file.json>
•	Cmd > newman run <collections_file.json> -e <environment_file.json> -r html
When we run this command, a folder with a name ‘newman’ will be created with html report in it.


