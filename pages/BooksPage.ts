// Books Page: Fiction link, shopping cart link

import { Page, expect} from '@playwright/test';
import { TestConfig } from '../test.config';

export class BooksPage
{
    private readonly page: Page;
   
    //constructor
    constructor(page:Page)
    {
        this.page = page;
    }

    //Action methods
    async selectBookName()
    {
        await this.page.locator("h2 a[href='/fiction']").click();
    }

    async addBookToCart()
    {
        await this.page.locator("#add-to-cart-button-45").click();
        await this.page.waitForTimeout(2000);
        await expect(this.page.locator("p.content")).toContainText("added to your shopping cart");
    }
}