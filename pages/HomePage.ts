// Home Page: Books link

import { Page, expect} from '@playwright/test';
import { TestConfig } from '../test.config';

export class HomePage
{
    private readonly page: Page;
    
    //constructor
    constructor(page:Page)
    {
        this.page = page;
    }

    // Action methods
    async navigate() 
    {
    await this.page.goto(TestConfig.appUrl);
    }

    async gotoBooks()
    {
        await this.page.getByRole('link', { name: 'Books' }).nth(0).click();
    }

    async gotoShoppingCart()
    {
        await this.page.locator("span:has-text('Shopping cart')").click();
    }
}