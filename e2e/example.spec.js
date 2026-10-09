import { test } from '@playwright/test';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { options } from '../vrt.config.js';
import abp from '../abp.cjs';

// Example on an external demo (not the application under test): the registration page before and
// after filling it with the administrator credentials of the repository's .env. In the project,
// compare the same page in the two versions of the application (abp.ABP_URL and abp.ABP_RC_URL).
const PAGE_URL = "https://angular-6-registration-login-example.stackblitz.io/register";
const [firstName, ...lastName] = abp.ABP_ADMIN_NAME.split(" ");

test.describe("registration", () => {
  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);
  });

  test('vrt', async ({ page }) => {
    await page.goto(PAGE_URL);
    // StackBlitz shows a button that starts the demo before showing it.
    await page.getByRole("button").click();
    await page.locator('input[formcontrolname="username"]').waitFor();
    await page.screenshot({ path: beforePath });

    await page.locator('input[formcontrolname="firstName"]').fill(firstName);
    await page.locator('input[formcontrolname="lastName"]').fill(lastName.join(" "));
    await page.locator('input[formcontrolname="username"]').fill(abp.ABP_ADMIN_EMAIL);
    await page.locator('input[formcontrolname="password"]').fill(abp.ABP_ADMIN_PASSWORD);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });
});
