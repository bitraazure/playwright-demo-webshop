import { Locator, Page, expect} from '@playwright/test';
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
    const table:Locator = this.page.locator("table.cart"); //returns the table
    const rows:Locator = table.locator("tr"); //returns all the rows
    const columns:Locator = rows.locator("th"); //returns all the columns
    const firstRowCells:Locator = rows.nth(1).locator("td");
    const firstRowText:string[] = await firstRowCells.allInnerTexts();

    const allRowData = await rows.all(); //Returns array of locators
    for(let row of allRowData.slice(1)){ //slice(1) will skip the header row
        const cols = await row.locator("td").allInnerTexts();
        const product = cols[2];
        if(product === TestConfig.testBookName)
        {
            await expect(row).toContainText(TestConfig.testBookName);
        }
    }

    await expect(this.page.locator("table.cart tbody tr td.qty input.qty-input")).toHaveValue(quantity);
    await expect(this.page.locator("span[class='cart-qty']")).toHaveText(`(${quantity})`);
    }

    async updateQuantity(quantity: string) 
    {
    await this.page.locator("table.cart tbody input[type='text']").fill(quantity);
    await this.page.locator('input[name="updatecart"]').click();
    }

    async assertUpdatedQuantity(quantity: string) 
    {
    await expect(this.page.locator("table.cart tbody tr td input[type='text']")).toHaveValue(quantity);
    await expect(this.page.locator("span[class='cart-qty']")).toHaveText(`(${quantity})`);
    }

    async removeItem() 
    {
    await this.page.locator("table.cart tbody tr td input[type='checkbox']").check();
    await this.page.locator('input[name="updatecart"]').click();
    }

    async assertCartIsEmpty() 
    {
    await expect(this.page.locator("span[class='cart-qty']")).toHaveText("(0)");
    await expect(this.page.locator('.order-summary-content')).toContainText('Your Shopping Cart is empty!');
    }

    async clearCartIfNotEmpty(): Promise<void> {
    await this.page.goto('https://demowebshop.tricentis.com/cart');
    const removeCheckboxes = this.page.locator("input[name^='removefromcart']");
    const updateButton = this.page.locator("input[name='updatecart']");
    const count = await removeCheckboxes.count();
    
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            const checkboxLocator = removeCheckboxes.nth(i);
            await checkboxLocator.waitFor({ state: 'visible', timeout: 3000 }); 
            await checkboxLocator.check();
        }
        await updateButton.click();
        
        await expect(this.page.locator("div.order-summary-content")).toContainText("Your Shopping Cart is empty");
    }
}

}