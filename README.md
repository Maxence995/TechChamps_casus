# Playwright Test Automation for RPG Game

This project contains automated tests for the RPG game at https://test-rpg.vercel.app/play using Playwright with TypeScript.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Project Structure](#project-structure)
4. [Running Tests](#running-tests)
5. [Test Structure](#test-structure)
6. [Acceptance Criteria Covered](#acceptance-criteria-covered)
7. [Viewing Test Results](#viewing-test-results)
8. [Contributing](#contributing)
9. [Troubleshooting](#troubleshooting)

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

4. Copy the `.env.example` file to `.env` and update any necessary variables:
   ```
   cp .env.example .env
   ```

## Project Structure

```
.
├── api/
│   └── handleApi.ts
├── fixtures/
│   └── testData.ts
├── page-object/
│   ├── components/
│   │   └── Header.ts
│   ├── BasePage.ts
│   └── PlayPage.ts
├── tests/
│   ├── login.spec.ts
│   └── playpage.spec.ts
├── utils/
│   ├── formControls.ts
│   ├── navigation.ts
│   └── filepath.ts
├── playwright.config.ts
├── package.json
├── README.md
└── CONTRIBUTING.md
```

## Running Tests

To run all tests:

```
npm test
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
- `tests/login.spec.ts`: Contains login-related test cases.
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

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Troubleshooting

If you encounter any issues:

1. Ensure that all dependencies are correctly installed and that you're using a compatible version of Node.js.
2. Check that your `.env` file is properly configured.
3. Verify that you have the latest version of Playwright browsers installed.
4. If problems persist, please check the [Playwright documentation](https://playwright.dev/docs/intro) or open an issue in this repository.