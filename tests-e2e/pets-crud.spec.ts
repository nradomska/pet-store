import { test, expect } from '@playwright/test';

const photoUrl = 'https://t4.ftcdn.net/jpg/00/27/27/71/360_F_27277141_4uhRVl4hJgtacBgDPla0sklkxaFWFFPA.jpg';
const baseUrl = 'http://localhost:4200/';
const viewportSize = {
  width: 936,
  height: 695,
};

test.describe('view-pet', () => {
  test('should display pets list', async ({ page }) => {
    await page.setViewportSize(viewportSize);
    await page.goto(baseUrl);

    await page.waitForResponse('https://petstore.swagger.io/v2/pet/findByStatus?status=sold');

    await expect(page.locator('.mat-mdc-cell').first()).toBeVisible();
    await expect(page.locator('.status').first()).toBeVisible();
  });
});

test.describe('add-pet', () => {
  test('should add pet', async ({ page }) => {
    await page.setViewportSize(viewportSize);
    await page.goto(baseUrl);

    await page.getByRole('link', { name: 'Add pet' }).click();
    await page.locator('.pet-form__name').fill('Black cat');
    await page.locator('.pet-form__category').fill('kitten');
    await page.locator('#mat-select-value-2').click();
    await page.locator('#mat-option-7').click();
    await page.locator('.pet-form__photo').fill(photoUrl);
    await page.locator('.pet-form__tag').fill('tag1');
    await page.locator('.pet-form__submit button').click();

    await page.waitForLoadState();
    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
  });
});

test.describe('edit-pet', () => {
  test('should edit pet', async ({ page }) => {
    await page.setViewportSize(viewportSize);
    await page.goto(baseUrl);

    // add pet
    await page.getByRole('link', { name: 'Add pet' }).click();
    await page.locator('.pet-form__name').fill('Black cat');
    await page.locator('.pet-form__category').fill('kitten');
    await page.locator('#mat-select-value-2').click();
    await page.locator('#mat-option-7').click();
    await page.locator('.pet-form__photo').fill(photoUrl);
    await page.locator('.pet-form__submit button').click();
    await page.waitForLoadState();
    await page.getByRole('link', { name: 'Home' }).click();

    await page.locator('.pets-view__filter-by-status').click();
    await page.getByRole('option', { name: 'pending' }).click();
    await page.getByPlaceholder('Filter by name').fill('Black cat');
    await page.locator('.pets-view__action-button--edit').first().click();
    await page.locator('.pet-form__name').fill('Black cat edited');
    await page.locator('.pet-form__submit button').click();

    await page.waitForLoadState();
    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Black cat edited' }).first()).toBeVisible();
  });
});


test.describe('delete-pet', () => {
  test('should delete pet', async ({ page }) => {
    await page.setViewportSize(viewportSize);
    await page.goto(baseUrl);

    // add pet
    await page.getByRole('link', { name: 'Add pet' }).click();
    await page.locator('.pet-form__name').fill('Black cat');
    await page.locator('.pet-form__category').fill('kitten');
    await page.locator('#mat-select-value-2').click();
    await page.locator('#mat-option-7').click();
    await page.locator('.pet-form__photo').fill(photoUrl);
    await page.locator('.pet-form__submit button').click();
    await page.waitForLoadState();
    await page.getByRole('link', { name: 'Home' }).click();

    await page.locator('.pets-view__filter-by-status').click();
    await page.getByRole('option', { name: 'pending' }).click();
    await page.getByPlaceholder('Filter by name').fill('Black cat');
    await page.locator('.pets-view__action-button--delete').first().click();
    await page.locator('.mat-mdc-dialog-container').isVisible();
    await page.locator('.confirm-dialog__confirm').click();

    await page.waitForLoadState();
    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
  });

  test('should cancel deleting pet', async ({ page }) => {
    await page.setViewportSize(viewportSize);
    await page.goto(baseUrl);

    await page.locator('.pets-view__filter-by-status').click();
    await page.getByRole('option', { name: 'pending' }).click();
    await page.getByPlaceholder('Filter by name').fill('Black cat');
    await page.locator('.pets-view__action-button--delete').first().click();
    await page.locator('.mat-mdc-dialog-container').isVisible();
    await page.locator('.confirm-dialog__cancel').click();

    await page.waitForLoadState();
    await expect(page.locator('mat-snack-bar-container')).not.toBeVisible();
  });
});
