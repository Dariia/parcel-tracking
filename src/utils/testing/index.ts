export const getMockHistory = ({
  action = "PUSH",
  replace = jest.fn(),
  push = jest.fn(),
  go = jest.fn(),
  goForward = jest.fn(),
  goBack = jest.fn(),
  location = {
    hash: "",
    pathname: "/test",
    state: {}
  },
  listen = jest.fn(),
  length = 5
} = {}) => ({
  replace,
  push,
  go,
  goForward,
  goBack,
  location,
  listen,
  length,
  action
});