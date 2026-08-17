import { test, expect } from '@playwright/test';

test('has title and hero section', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Marvel Watch Tracker/);

  // Expect the page to have the hero heading
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();

  // Check if navigation works
  if (!isMobile) {
    await page.click('text=Filmes');
    
    // Wait for the URL to change
    await expect(page).toHaveURL(/.*filmes/);
    
    // Expect the catalog heading
    await expect(page.locator('h1', { hasText: 'Catálogo Marvel' })).toBeVisible();
  }
});

test('mobile view test', async ({ page, isMobile }) => {
  // Simple check for mobile responsiveness
  await page.goto('/');
  const navbar = page.locator('nav');
  await expect(navbar).toBeVisible();
});
