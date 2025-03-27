import { test, expect } from '@playwright/test'

test.describe('ToDo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://ole-leo.github.io/TodoApp/')
  })

  test('should add a new todo', async ({ page }) => {
    await page.fill('[data-testid="new-todo-input"]', 'New Task')
    await page.press('[data-testid="new-todo-input"]', 'Enter')
    await expect(page.locator('text=New Task')).toBeVisible()
  })

  test('should mark a todo as completed', async ({ page }) => {
    const firstTodo = page.locator('[data-testid^="todo-checkbox-"]').first()
    await firstTodo.click()
    await expect(firstTodo).toBeChecked()
  })

  test('should filter active todos', async ({ page }) => {
    await page.click('[data-testid="active"]')
    const completedTodos = await page.locator(
      '[data-testid^="todo-checkbox-"]:checked',
    )
    await expect(completedTodos).toHaveCount(0)
  })

  test('should filter completed todos', async ({ page }) => {
    await page.locator('[data-testid^="todo-checkbox-"]').first().click()
    await page.click('[data-testid="completed"]')
    const activeTodos = await page.locator(
      '[data-testid^="todo-checkbox-"]:not(:checked)',
    )
    await expect(activeTodos).toHaveCount(0)
  })

  test('should clear completed todos', async ({ page }) => {
    await page.locator('[data-testid^="todo-checkbox-"]').first().click()
    await page.click('[data-testid="clear-completed"]')
    const completedTodos = await page.locator(
      '[data-testid^="todo-checkbox-"]:checked',
    )
    await expect(completedTodos).toHaveCount(0)
  })
})
