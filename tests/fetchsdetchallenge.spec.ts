import { expect, test } from '@playwright/test';
import { FetchChallenge } from '../pages/homePage';

test('fetch', async ({ page }) => {

  await page.goto('http://sdetchallenge.fetch.com/');

  await expect(page).toHaveURL('http://sdetchallenge.fetch.com/');

  const fetchChallenge = new FetchChallenge(page);
  try {
    await fetchChallenge.sdetChallenge(page);
  } catch (error) {
    console.error('Error encountered during the fetch challenge:', error);
    throw error; 
  }
});
