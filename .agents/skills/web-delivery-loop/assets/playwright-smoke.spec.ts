import { expect, test } from "@playwright/test";

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

test.describe("website smoke flow", () => {
  test("navigates and submits the contact flow", async ({ page }) => {
    await page.goto(baseUrl);

    // Replace headings, labels, and messages with your app's real UI text.
    await expect(page.getByRole("heading", { name: "Inicio" })).toBeVisible();

    await page.getByRole("link", { name: "Contacto" }).click();
    await expect(page.getByRole("heading", { name: "Contacto" })).toBeVisible();

    await expect(page.getByLabel("Nombre")).toBeVisible();
    await expect(page.getByLabel("Correo")).toBeVisible();

    await page.getByLabel("Nombre").fill("Edwin");
    await page.getByLabel("Correo").fill("edwin@example.com");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.getByText("Mensaje enviado")).toBeVisible();
  });
});
