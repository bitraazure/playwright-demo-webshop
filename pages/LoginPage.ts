// Home Page: Log in link, Email, Password, Log in button

import { Page, expect} from '@playwright/test';
import { TestConfig } from '../test.config';

export class LoginPage{
    private readonly page: Page;
    
    // Constructor
    constructor(page: Page)
    {
        this.page = page;
    }

    // Action methods
    async gotoLoginPage()
    {
        await this.page.locator("a:has-text('Log in')").click();
    }

    async loginDetails(email:string, password:string)
    {
        await this.page.locator("#Email").fill(email);
        await this.page.locator("#Password").fill(password);
        await this.page.locator("input[value='Log in']").click();
    }

    async assertLoginSuccess()
    {
    await expect(this.page.locator("a.account", {hasText: TestConfig.validEmail})).toBeVisible();
    }

    async assertLoginFailure()   
    {
        await expect(this.page.locator(".message-error")).toContainText("Login was unsuccessful")
    } 

}