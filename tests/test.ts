import { expect, test } from '@playwright/test'

test('home page has monte carlo title', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('link', { name: 'Monte Carlo Forecaster' })).toBeVisible()
})

test('can enter throughput data', async ({ page }) => {
	await page.goto('/')
	const throughput = page.getByPlaceholder('throughput data')
	await throughput.fill('2\n2\n2')

	await (page.getByLabel('Sprints').click())

	const datePicker = page.locator('#start')
	await datePicker.fill('2024-05-05')

	await(page.locator('.checkbox').first().click())

	await(page.locator('input[name="periods"]').fill('5'))

	const runButton = page.getByRole('button', { name: 'Run Trials' })
	await runButton.click()

	const forecastTextArea = page.getByPlaceholder('forecast data')
	await expect(forecastTextArea).toHaveValue(`"Date", 5%, 20%, 50%, 80%
2024-05-05, 2, 2, 2, 2
2024-05-19, 4, 4, 4, 4
2024-06-02, 6, 6, 6, 6
2024-06-16, 8, 8, 8, 8
2024-06-30, 10, 10, 10, 10
2024-07-14, 12, 12, 12, 12
2024-07-28, 14, 14, 14, 14
2024-08-11, 16, 16, 16, 16
2024-08-25, 18, 18, 18, 18
2024-09-08, 20, 20, 20, 20
2024-09-22, 22, 22, 22, 22
2024-10-06, 24, 24, 24, 24
2024-10-20, 26, 26, 26, 26
2024-11-03, 28, 28, 28, 28
2024-11-17, 30, 30, 30, 30
2024-12-01, 32, 32, 32, 32
2024-12-15, 34, 34, 34, 34
2024-12-29, 36, 36, 36, 36
2025-01-12, 38, 38, 38, 38
2025-01-26, 40, 40, 40, 40
2025-02-09, 42, 42, 42, 42
2025-02-23, 44, 44, 44, 44
2025-03-09, 46, 46, 46, 46
2025-03-23, 48, 48, 48, 48
2025-04-06, 50, 50, 50, 50`)

})

