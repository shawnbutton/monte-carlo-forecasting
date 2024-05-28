import { expect, test } from '@playwright/test'

test('home page has monte carlo title', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('link', { name: 'Monte Carlo Forecaster' })).toBeVisible()
})

test('can enter throughput data', async ({ page }) => {
	await page.goto('/')
	const throughput = page.getByPlaceholder('throughput data')
	await throughput.fill('2\n2\n2')

	await page.getByLabel('Sprints').click()

	const datePicker = page.locator('#start')
	await datePicker.fill('2024-05-05')

	await page.locator('.checkbox').first().click()

	await page.locator('input[name="periods"]').fill('5')

	const runButton = page.getByRole('button', { name: 'Run Trials' })
	await runButton.click()

	const forecastTextArea = page.getByPlaceholder('forecast data')
	await expect(forecastTextArea).toHaveValue(`"Date", 5%, 20%, 50%, 80%
2024-05-05, 2, 2, 2, 2
2024-05-19, 4, 4, 4, 4
2024-06-02, 6, 6, 6, 6
2024-06-16, 8, 8, 8, 8
2024-06-30, 10, 10, 10, 10`)
})
