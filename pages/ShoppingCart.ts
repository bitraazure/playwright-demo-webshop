import { Page, expect} from '@playwright/test';
import { TestConfig } from '../test.config';

export class ShoppingCart
{
    private readonly page: Page;
   
    //constructor
    constructor(page:Page)
    {
        this.page = page;
    }

    async assertProductInCart(quantity:string) 
    {
    await expect(this.page.locator("tbody tr td a[class='product-name']")).toContainText(TestConfig.testBookName);
    await expect(this.page.locator("tbody tr td input[type='text']")).toHaveValue(quantity);
    await expect(this.page.locator("span[class='cart-qty']")).toHaveText(`(${quantity})`);
    }

    async updateQuantity(quantity: string) 
    {
    await this.page.locator("td input[type='text']").fill(quantity);
    await this.page.locator('input[name="updatecart"]').click();
    }

    async assertUpdatedQuantity(quantity: string) 
    {
    await expect(this.page.locator("tbody tr td input[type='text']")).toHaveValue(quantity);
    await expect(this.page.locator("span[class='cart-qty']")).toHaveText(`(${quantity})`);
    }

    async removeItem() 
    {
    await this.page.locator("tr td input[type='checkbox']").check();
    await this.page.locator('input[name="updatecart"]').click();
    }

    async assertCartIsEmpty() 
    {
    await expect(this.page.locator("span[class='cart-qty']")).toHaveText("(0)");
    await expect(this.page.locator('.order-summary-content')).toContainText('Your Shopping Cart is empty!');
    }

    async clearCartIfNotEmpty() {
    await this.page.goto('https://demowebshop.tricentis.com/cart');
    const removeCheckboxes = this.page.locator("input[name^='removefromcart']");
    const count = await removeCheckboxes.count();
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            await removeCheckboxes.nth(i).check();
        }
        await this.page.click("input[name='updatecart']");
    }
}

}