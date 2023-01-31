# Challenge

This project is test tech task by requirements:
[https://github.com/parcelLab/challenge-frontend-engineer](https://github.com/parcelLab/challenge-frontend-engineer)

Project is created with / using tools:
- `React cteate app` for project first installation (some structure redone)
- `Bootstrap` / `SASS` for elements styling
- `Storybook` for elements presentation
- `Cypress` for automated tests
- `React testing library` for unit tests
- `React hooks` / `TS` for components
- `axios` / `axios-mock-adapter` for conditional mocking of `order.json`

## Available Scripts

Before beginning you need install node modules:
run `npm install` in project root.

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.
Opens [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run test:c`

Launches unit tests with coverage collecting.
Coverage will be displayed in console or in ``coverage`` folder in root directory.

### `npm run cypress`

Will run cypress on desktop.

- Before running cypress tests `npm run build` and `npm run start` need to be executed.

### `npm run cypress:all`

Will run all automated tests in a headless mode in chrome.
Statistics will be available in console and in `mochawesome-report` directory in root.

- Before running cypress tests `npm run build` and `npm run start` need to be executed.


### `npm run build`

Builds the app for production to the `build` folder.

### `npm run storybook`

Runs project `storybook` on port [http://localhost:6000](http://localhost:6000).


## Side Notes

- `.env.development` file in root directory holds dev process variables
- `.env.production` file in root directory holds prod process variables
- `Khula` font is used as most similar to design font, but free
- app is responsive
- all text in light gray color changed to darker color as accessibility check argued on low contrast
- context instead of stores used by mean. We have simple app with not many states, so better to use context.
- suggestion: would be nice to have product images of different sizes for performance optimisation (consider avif format).
- no comments left in code, as believe that code should be self explanatory, 
  but somewhere left TODOs expressing thoughts on improvements. 
  

*Time for the challenge task was limited and needed to finish it at some point, but think there are still a lot of could be improved.*

## Screenshots

![alt text](https://github.com/Dariia/parcel-tracking/blob/main/public/images/screenshot-1.png?raw=true)

![alt text](https://github.com/Dariia/parcel-tracking/blob/main/public/images/screenshot-3.png?raw=true)