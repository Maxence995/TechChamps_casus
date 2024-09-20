# Contributing to the RPG Game Playwright Test Automation Project

We welcome contributions to our Playwright test automation project for the RPG game. This document provides guidelines for contributing to ensure consistency and quality across the project.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Code Style](#code-style)
3. [Creating Tests](#creating-tests)
4. [Submitting Changes](#submitting-changes)
5. [Reporting Issues](#reporting-issues)

## Getting Started

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Install the project dependencies by running `npm install`.
4. Create a new branch for your feature or bug fix.

## Code Style

- We use TypeScript for this project. Ensure your code adheres to TypeScript best practices.
- Use meaningful variable and function names.
- Keep functions small and focused on a single task.
- Comment your code where necessary, especially for complex logic.
- Use async/await for asynchronous operations.

## Creating Tests

1. Place new test files in the `tests/` directory.
2. Use descriptive names for your test files and test cases.
3. Follow the Page Object Model pattern. Place page objects in the `page-object/` directory.
4. Use the existing utility functions in `utils/` where applicable.
5. Ensure your tests are independent and can run in isolation.
6. Use test data from `fixtures/testData.ts` where possible to keep tests consistent.

Example test structure:

```typescript
import { test, expect } from '@playwright/test';
import { PlayPage } from '../page-object/PlayPage';
import { testData } from '../fixtures/testData';

test.describe('New Feature Tests', () => {
    let playPage: PlayPage;

    test.beforeEach(async ({ page }) => {
        playPage = new PlayPage(page);
        await playPage.goToPlayUrl();
    });

    test('should do something specific', async () => {
        // Test implementation
    });
});
```

## Submitting Changes

1. Ensure your code passes all existing tests.
2. Add new tests for your changes where applicable.
3. Update documentation if you've made significant changes.
4. Commit your changes with a clear and descriptive commit message.
5. Push your changes to your fork on GitHub.
6. Submit a pull request to the main repository.

## Reporting Issues

- Use the GitHub issue tracker to report bugs.
- Clearly describe the issue, including steps to reproduce when possible.
- Include browser and environment details where relevant.

Thank you for contributing to our project!