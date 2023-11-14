import { Page } from '@playwright/test';

export class FetchChallenge {
    private page: Page;
    private leftblock0 ;
    private leftblock1;
    private leftblock2;
    private rightblock0;
    private rightblock1;
    private rightblock2;
    private weightBtn;

    constructor(page: Page) {
        this.page = page;
        this.leftblock0 = page.locator('#left_0');
        this.leftblock1 = page.locator('#left_1');
        this.leftblock2 = page.locator('#left_2');
        this.rightblock0 = page.locator('#right_0');
        this.rightblock1 = page.locator('#right_1');
        this.rightblock2 = page.locator('#right_2');
        this.weightBtn = page.locator('role=button[name="Weigh"]');
    }

    public async sdetChallenge(page) {
        await this.leftblock0.fill('0');
        await this.leftblock1.fill('1');
        await this.leftblock2.fill('2');
        await this.rightblock0.fill('3');
        await this.rightblock1.fill('4');
        await this.rightblock2.fill('5');
        await this.weightBtn.click();

        await this.page.waitForTimeout(3000);
        await this.page.waitForSelector('.result .button');

        const firstWeighingResult = await this.page.textContent('.result .button');
        let suspectGroup: number[];
       
        if (firstWeighingResult === "<") {
            suspectGroup = [0, 1, 2];
        } else if (firstWeighingResult === ">") {
            suspectGroup = [3, 4, 5];
        } else {
            suspectGroup = [6, 7, 8];
        }

        await this.page.click('text=Reset');
        await this.leftblock0.fill(String(suspectGroup[0]));
        await this.rightblock0.fill(String(suspectGroup[1]));
        await this.weightBtn.click();

        await this.page.waitForTimeout(3000);
        const secondWeighingResult = await this.page.textContent('.result .button');
        
        let fakeBarIndex: number;
        if (secondWeighingResult === "<") {
            fakeBarIndex = suspectGroup[0];
        } else if (secondWeighingResult === ">") {
            fakeBarIndex = suspectGroup[1];
        } else {
            fakeBarIndex = suspectGroup[2];
        }

        await this.page.waitForTimeout(3000);

        this.page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        await this.page.click(`#coin_${fakeBarIndex}`);
        
    }
}
