# Playwright Test Automation for RPG Game

This project contains automated tests for the RPG game at https://test-rpg.vercel.app/play using Playwright with TypeScript.

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)

## Setup

1. Clone this repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install Playwright browsers:
   ```
   npx playwright install
   ```

## Running Tests

To run all tests:

```
npx playwright test
```

To run tests in a specific file:

```
npx playwright test tests/playpage.spec.ts
```

To run tests in headed mode (with browser visible):

```
npx playwright test --headed
```

## Test Structure

- `tests/playpage.spec.ts`: Contains all test cases for the RPG game page.
- `page-object/PlayPage.ts`: Page Object Model for the RPG game page, containing methods to interact with page elements.

## Acceptance Criteria Covered

1. Character name validation (3-20 characters)
2. Changing character build type updates stats
3. Clicking button 5 times levels up character
4. Uploading file levels up character
5. Typing "Lorem Ipsum" levels up character
6. Moving slider to max levels up character
7. Verifying elements are disabled after completing tasks

## Viewing Test Results

After running tests, you can view the HTML report:

```
npx playwright show-report
```

This will open the HTML report in your default browser, showing detailed test results and any failures.

## Troubleshooting

If you encounter any issues, ensure that all dependencies are correctly installed and that you're using a compatible version of Node.js. If problems persist, please check the Playwright documentation or open an issue in this repository.