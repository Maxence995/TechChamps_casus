import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { navigateTo } from '../utils/navigation';
import { BASE_URL } from '../utils/navigation';
import { fillInputField, clickButton } from '../utils/formControls';

export class PlayPage extends BasePage {
    private characterName: Locator;
    private characterNameInputField: Locator;
    readonly characterStats: Locator;
    private characterNameErrorMessage: Locator;
    private buildTypeSelect: Locator;
    readonly clickMeButton: Locator;
    readonly selectButton: Locator;
    readonly fileUploadInput: Locator;
    readonly loremIpsumInput: Locator;
    readonly slider: Locator;
    private levelUpMessageClicker: Locator;
    private levelUpMessageUploader: Locator;
    private levelUpMessageTyper: Locator;
    private levelUpMessageSlider: Locator;
    private startButton: Locator;

    constructor(page: Page) {
        super(page);
        this.characterName = page.locator('[data-testid="character-name"]');
        this.characterNameInputField = page.locator('[name="name"]');
        this.characterStats = page.locator('section[data-testid="character-stats"]');
        this.characterNameErrorMessage = page.locator('[id$="-form-item-message"]');
        this.buildTypeSelect = page.locator('[data-testid="character-card"] select');
        this.clickMeButton = page.locator('[data-testid="adventure-clicker"] button');
        this.selectButton = page.locator('button[role="combobox"]');
        this.fileUploadInput = page.locator('[data-testid="adventure-uploader"] input');
        this.loremIpsumInput = page.locator('[data-testid="adventure-typer"] input');
        this.slider = page.locator('[data-testid="adventure-slider"] span[dir="ltr"]');
        this.levelUpMessageClicker = page.locator('[data-task="clicker"]');
        this.levelUpMessageUploader= page.locator('[data-task="uploader"]');
        this.levelUpMessageTyper = page.locator('[data-task="typer"]');
        this.levelUpMessageSlider = page.locator('[data-task="slider"]');
        this.startButton = page.locator('button:has-text("Start!")');
    }

    async goToPlayUrl() {
        await navigateTo(this.page, '/play');
        await expect(this.page).toHaveURL(`${BASE_URL}/play`);
    }

    async setCharacterName(name: string) {
        await fillInputField(this.page, this.characterNameInputField, name);
        await this.page.waitForTimeout(1000);
        await expect(this.characterName).toHaveText(name);
    }

    async clickStartButton() {
        await this.startButton.click();
        await this.page.waitForTimeout(1000);
    }

    async clickSelectButton() {
        await this.selectButton.click({force: true});
        await this.page.waitForTimeout(1000); 
        await this.page.waitForSelector('select', { state: 'visible' });
    }

    async changeBuildType(buildType: string) {
        await this.clickSelectButton();
        await this.buildTypeSelect.selectOption(buildType);
        await this.page.waitForTimeout(1000); 
    }

    async clickButtonFiveTimes() {
        for (let i = 0; i < 5; i++) {
            await this.clickMeButton.click();
        }
        await this.expectLevelUpMessage(this.levelUpMessageClicker);
    }

    async uploadFile(filePath: string) {
        await this.fileUploadInput.setInputFiles(filePath);
        await this.expectLevelUpMessage(this.levelUpMessageUploader);
    }

    async typeLoremIpsum() {
        await this.loremIpsumInput.fill('Lorem Ipsum');
        await this.expectLevelUpMessage(this.levelUpMessageTyper);
    }

    async expectElementDisabled(locator: Locator) {
        await expect(locator).toBeDisabled();
    }

    async  expectElementDisabledTrue(locator: Locator) {
        await expect(locator).toHaveAttribute('aria-disabled', 'true');
    }

    async expectLevelUpMessage(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async verifyCharacterNameLength(name: string) {
        await this.setCharacterName(name);
        await this.clickStartButton();
        if (name.length < 3 || name.length > 20) {
            await expect(this.characterNameErrorMessage).toBeVisible({ timeout: 10000 });
            if (name.length < 3) {
                await expect(this.characterNameErrorMessage).toHaveText('Name must be at least 3 characters');
            }
            if(name.length > 20){
                await expect(this.characterNameErrorMessage).toHaveText('Name cannot be longer than 20 characters');
            }
        } else {
            await expect(this.characterNameErrorMessage).not.toBeVisible({ timeout: 10000 });
        }
    }

    async moveSliderToMax() {
        await this.page.evaluate(() => {
            window.scrollBy(0, 900);
        });
        const slider = this.slider;
        
        const boundingBox = await this.slider.boundingBox();
        if (!boundingBox) {
            throw new Error('Slider bounding box not found');
        }
    
        const targetX = boundingBox.x + boundingBox.width;
        await this.page.mouse.move(boundingBox.x + 1, boundingBox.y + boundingBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(targetX, boundingBox.y + boundingBox.height / 2, { steps: 50 });
        await this.page.mouse.up();
        
        await this.page.waitForTimeout(5000);
        
        await this.expectLevelUpMessage(this.levelUpMessageSlider);
    }
}