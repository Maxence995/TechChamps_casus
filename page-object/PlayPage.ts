import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { navigateTo } from '../utils/navigation';
import { BASE_URL } from '../utils/navigation';
import { fillInputField, clickButton } from '../utils/formControls';

/**
 * PlayPage class represents the Page Object Model for the RPG game play page.
 * It contains methods to interact with various elements on the page and perform game actions.
 */
export class PlayPage extends BasePage {
    // Locators for various elements on the play page
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
        // Initialize all locators
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

    /**
     * Navigate to the play page and verify the URL
     */
    async goToPlayUrl() {
        await navigateTo(this.page, '/play');
        await expect(this.page).toHaveURL(`${BASE_URL}/play`);
    }

    /**
     * Set the character name and verify it's displayed correctly
     * @param name - The name to set for the character
     */
    async setCharacterName(name: string) {
        await fillInputField(this.page, this.characterNameInputField, name);
        await this.page.waitForTimeout(1000);
        await expect(this.characterName).toHaveText(name);
    }

    /**
     * Click the start button and wait for the page to update
     */
    async clickStartButton() {
        await this.startButton.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Click the select button for changing build type
     */
    async clickSelectButton() {
        await this.selectButton.click({force: true});
        await this.page.waitForTimeout(1000); 
        await this.page.waitForSelector('select', { state: 'visible' });
    }

    /**
     * Change the character's build type
     * @param buildType - The build type to select
     */
    async changeBuildType(buildType: string) {
        await this.clickSelectButton();
        await this.buildTypeSelect.selectOption(buildType);
        await this.page.waitForTimeout(1000); 
    }

    /**
     * Click the "Click Me" button five times and verify level up message
     */
    async clickButtonFiveTimes() {
        for (let i = 0; i < 5; i++) {
            await this.clickMeButton.click();
        }
        await this.expectLevelUpMessage(this.levelUpMessageClicker);
    }

    /**
     * Upload a file and verify level up message
     * @param filePath - The path of the file to upload
     */
    async uploadFile(filePath: string) {
        await this.fileUploadInput.setInputFiles(filePath);
        await this.expectLevelUpMessage(this.levelUpMessageUploader);
    }

    /**
     * Type "Lorem Ipsum" and verify level up message
     */
    async typeLoremIpsum() {
        await this.loremIpsumInput.fill('Lorem Ipsum');
        await this.expectLevelUpMessage(this.levelUpMessageTyper);
    }

    /**
     * Expect an element to be disabled
     * @param locator - The locator of the element to check
     */
    async expectElementDisabled(locator: Locator) {
        await expect(locator).toBeDisabled();
    }

    /**
     * Expect an element to have the 'aria-disabled' attribute set to 'true'
     * @param locator - The locator of the element to check
     */
    async expectElementDisabledTrue(locator: Locator) {
        await expect(locator).toHaveAttribute('aria-disabled', 'true');
    }

    /**
     * Expect a level up message to be visible
     * @param locator - The locator of the level up message element
     */
    async expectLevelUpMessage(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    /**
     * Verify character name length constraints
     * @param name - The name to verify
     */
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

    /**
     * Move the slider to its maximum value
     */
    async moveSliderToMax(locator: Locator) {
        await this.page.evaluate(() => {
            window.scrollBy(0, 900);
        });
        
        const boundingBox = await locator.boundingBox();
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