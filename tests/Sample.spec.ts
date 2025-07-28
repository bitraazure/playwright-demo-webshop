import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { BooksPage } from '../pages/BooksPage';
import { ShoppingCart } from '../pages/ShoppingCart';
import { TestConfig } from '../test.config';

test.describe("Demo Web Shop Tests (POM)", ()=>{

    test.beforeEach(async ({page})=>{
        const home = new HomePage(page);
        await home.navigate();
    })

    test("Login with valid credentials", async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage()
        await login.loginDetails(TestConfig.validEmail, TestConfig.validPassword);
        await login.assertLoginSuccess();

        await page.screenshot({path: "screenshots/"+"SuccessfulLoginpage"+Date.now()+".png"});
    })

    test("Login with invalid credentials", async ({page})=>{
        const login = new LoginPage(page);
        await login.gotoLoginPage();
        await login.loginDetails("invalid@invalid.com", "password");
        await login.assertLoginFailure();

        await page.screenshot({path: "screenshots/"+"UnsuccessfulLoginpage"+Date.now()+".png"});
    })

    test("Add an item to cart", async ({page})=>{
        const login = new LoginPage(page);
        const home = new HomePage(page);
        const books = new BooksPage(page);
        const cart = new ShoppingCart(page);

        await login.gotoLoginPage();
        await login.loginDetails(TestConfig.validEmail, TestConfig.validPassword);
        await cart.clearCartIfNotEmpty();
        await home.gotoBooks();
        await books.selectBookName();
        await books.addBookToCart();
        await home.gotoShoppingCart();    
        await cart.assertProductInCart("1");

        await page.screenshot({path: "screenshots/"+"ShoppingCartPage"+Date.now()+".png"});
    })

    test("Edit an item quantity in cart", async ({page})=>{
        const login = new LoginPage(page);
        const home = new HomePage(page);
        const books = new BooksPage(page);
        const cart = new ShoppingCart(page);

        await login.gotoLoginPage();
        await login.loginDetails(TestConfig.validEmail, TestConfig.validPassword);
        await cart.clearCartIfNotEmpty();
        await home.gotoBooks();
        await books.selectBookName();
        await books.addBookToCart();
        await home.gotoShoppingCart();
        await cart.updateQuantity("2");
        await cart.assertUpdatedQuantity("2");

        await page.screenshot({path: "screenshots/"+"EditItemQuantity"+Date.now()+".png"});
    })

    test("Delete an item from the cart", async ({page})=>{
        const login = new LoginPage(page);
        const home = new HomePage(page);
        const books = new BooksPage(page);
        const cart = new ShoppingCart(page);

        await login.gotoLoginPage();
        await login.loginDetails(TestConfig.validEmail, TestConfig.validPassword);
        await home.gotoBooks();
        await books.selectBookName();
        await books.addBookToCart();
        await home.gotoShoppingCart();
        await cart.removeItem();
        await cart.assertCartIsEmpty();

        await page.screenshot({path: "screenshots/"+"EmptyShoppingCartPage"+Date.now()+".png"});
    })

})