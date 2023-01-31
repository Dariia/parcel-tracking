import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles/index.scss';

export const decorators = [
  (Story) => (
    <Suspense fallback="Loading localization…">
      <Story/>
    </Suspense>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
