import { test, expect } from '@playwright/test';
import { PlayPage } from '../page-object/PlayPage';
import { testData } from '../fixtures/testData';

const devices = ['Desktop', 'Mobile'] as const;

devices.forEach(device => {
    test.describe(`Play Page Tests - ${device}`, () => {
        let playPage: PlayPage;

        test.beforeEach(async ({ page }) => {
            playPage = new PlayPage(page);
            if (device === 'Mobile') {
                await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
            }
            await playPage.goToPlayUrl();
        });

        test('Character name validation', async () => {
            await playPage.verifyCharacterNameLength(testData.characterNames.shortName);
            await playPage.verifyCharacterNameLength(testData.characterNames.longName);
            await playPage.verifyCharacterNameLength(testData.characterNames.validName);
        });

        test('Changing character build type updates stats', async () => {
            await playPage.setCharacterName(testData.characterNames.validName);
            const initialStats = await playPage.characterStats.textContent();
            await playPage.changeBuildType('mage');
            const mageStats = await playPage.characterStats.textContent();
            expect(mageStats).not.toBe(initialStats);
        });

        test('Clicking button 5 times levels up character', async () => {
            await playPage.setCharacterName(testData.characterNames.validName);
            await playPage.clickStartButton();
            await playPage.clickButtonFiveTimes();
            await playPage.expectElementDisabled(playPage.clickMeButton);
        });

        test('Uploading file levels up character', async () => {
            await playPage.setCharacterName(testData.characterNames.validName);
            await playPage.clickStartButton();
            const filePath = 'utils/file.jpg';
            await playPage.uploadFile(filePath);
            await playPage.expectElementDisabled(playPage.fileUploadInput);
        });

        test('Typing "Lorem Ipsum" levels up character', async () => {
            await playPage.setCharacterName(testData.characterNames.validName);
            await playPage.clickStartButton();
            await playPage.typeLoremIpsum();
            await playPage.expectElementDisabled(playPage.loremIpsumInput);
        });

        test('Moving slider to max levels up character', async () => {
            await playPage.setCharacterName('TestCharacter');
            await playPage.clickStartButton();
            await playPage.moveSliderToMax(playPage.slider);
            await playPage.expectElementDisabledTrue(playPage.slider);
        });
    })
});
