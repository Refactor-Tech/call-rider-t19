import { test, expect, type Page } from "@playwright/test";

test.describe("Sign up", () => {
  test("should sign up a new user", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByTestId("form-name").fill("John Doe");
    await page
      .getByTestId("form-email")
      .fill(`john.doe${Math.random()}@example.com`);
    await page.getByTestId("form-cpf").fill("87748248800");
    await page.getByTestId("form-password").fill("123456");
    await page.getByTestId("form-is-passenger").check();
    await page.getByTestId("btn-signup").click();
    await expect(page.getByTestId("status")).toHaveText(
      "User created successfully!"
    );
  });

  test("should not sign up a new user with invalid payload", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");
    await page.getByTestId("form-name").fill("John");
    await page
      .getByTestId("form-email")
      .fill(`john.doe${Math.random()}@example.com`);
    await page.getByTestId("form-cpf").fill("87748248800");
    await page.getByTestId("form-password").fill("123456");
    await page.getByTestId("form-is-passenger").check();
    await page.getByTestId("btn-signup").click();
    await expect(page.getByTestId("status")).toHaveText("Error creating user");
    await expect(page.getByTestId("message")).toHaveText("Invalid name");
  });
});
