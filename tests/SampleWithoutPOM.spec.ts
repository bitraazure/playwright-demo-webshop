    import { test, expect, Locator } from '@playwright/test';

    const baseURL = 'https://demowebshop.tricentis.com/';
    const validEmail = 'test@playwright.com';      
    const validPassword = 'Password@123';            

    test.describe('Demo Web Shop Tests', () => {

    test.beforeEach("Login to the base url", async ({ page})=>{
        await page.goto(baseURL);
    })

    test('Login with valid credentials', async ({ page }) => {
        
        await page.locator("a:has-text('Log in')").click();
        await page.locator("#Email").fill(validEmail);
        await page.locator("#Password").fill(validPassword);
        await page.locator("input[value='Log in']").click();

        // Assertion to check the email is being displayed on top of the screen
        await expect(page.locator("div[class='header-links'] a[class='account']")).toHaveText(validEmail);
    
        await page.screenshot({path: "screenshots/"+"SuccessfulLoginpage"+Date.now()+".png"});
    });

    test('Login with invalid credentials', async ({ page }) => {
        await page.locator("a:has-text('Log in')").click();
        await page.locator("#Email").fill("invalid@invalid.com");
        await page.locator("#Password").fill("password");
        await page.locator("input[value='Log in']").click();

        // Assertion to check the error message is being displayed
        await expect(page.locator(".message-error")).toContainText('Login was unsuccessful');
    
        await page.screenshot({path: "screenshots/"+"UnsuccessfulLoginpage"+Date.now()+".png"});
    });

    test('Add item to cart', async ({ page }) => {
        await page.locator('li[class="inactive"] a[href="/books"]').click(); // Go to Books
        await page.getByText('Fiction', { exact: true}).click(); // Click Fiction
        await page.locator("#add-to-cart-button-45").click(); // Add to Cart
        
        // Wait for the confirmation message
        await expect(page.locator("p.content")).toContainText("The product has been added to your shopping cart");

        await page.locator("span:has-text('Shopping cart')").click(); // Go to Shopping Cart

        // Assertion to check the added product name
        await expect(page.locator("table.cart tbody tr td a[class='product-name']")).toContainText('Fiction');
        
        // Assertion to check the quantity of the products
        await expect(page.locator("table.cart tbody tr td input[type='text']")).toHaveValue("1");

        // Assertion to check the quantity in Shopping cart
        await expect(page.locator("span[class='cart-qty']")).toHaveText("(1)")
        
        page.screenshot({path: "screenshots/"+"ShoppingCartPage"+Date.now()+".png"});
    });

    test('Edit item quantity in cart', async ({ page }) => {
        await page.locator('li[class="inactive"] a[href="/books"]').click(); // Go to Books
        await page.getByText('Fiction', { exact: true}).click(); // Select/Click Fiction
        await page.locator("#add-to-cart-button-45").click(); // Click on Add to Cart
        await page.locator("span:has-text('Shopping cart')").click(); // Navigate to cart
        await page.locator("td input[type='text']").fill("2");
        await page.click('input[name="updatecart"]');

        // Assertion to check the quantity of the products
        await expect(page.locator("table.cart tbody tr td input[type='text']")).toHaveValue("2");
        
        // Assertion to check the quantity in Shopping cart
        await expect(page.locator("span[class='cart-qty']")).toHaveText("(2)")

        await page.screenshot({path: "screenshots/"+"EditItemQuantity"+Date.now()+".png"});
    });

  test('Delete item from cart', async ({ page }) => {
        await page.locator('li[class="inactive"] a[href="/books"]').click(); // Go to Books
        await page.getByText('Fiction', { exact: true}).click(); // Select/Click Fiction
        await page.locator("#add-to-cart-button-45").click(); // Click on Add to Cart
        await page.locator("span:has-text('Shopping cart')").click(); // Navigate to cart
        await page.locator("tr td input[type='checkbox']").check();
        await page.click('input[name="updatecart"]');

        // Assertion to check the quantity in Shopping cart
        await expect(page.locator("span[class='cart-qty']")).toHaveText("(0)")

        // Assertion to check the message after deleting the items from cart
        await expect(page.locator('.order-summary-content')).toContainText('Your Shopping Cart is empty!');
    
        await page.screenshot({path: "screenshots/"+"EmptyShoppingCartPage"+Date.now()+".png"});
    });
});