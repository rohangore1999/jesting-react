Unit Testing on React components using Jest.

### Testing commong approaches AAA's: Arrange, Act and Assertion.

Arrange: we are arranging env such that we can test in our component. eg. useQuery.mockReturnValue({})
Act: based on arrange env how the component is arranging
Assertion: to expect the outcome


- Mocked useQuery which is a custom hook to call an api and return following states:
{isLoading, data, error}.
- Checked isLoading working as expected by creating mock useQuery return states.
- is it mounting in DOM
- comparing expected outcome

React Component: PostList.js
```
{isLoading ? (
        <div data-testid="loading-text">Loading..</div> //while testing it is good practise to make test-id, so that we can access that text
      ): (...data)
```

React Testing Component: PostList.test.js
```
import { render, screen } from "@testing-library/react";
import React from "react";
import PostList from './PostList'

// importing useQuery to mock its behaviour(returns), so that we can test them
import { useQuery } from 'react-query' // role of useQuery is to call an api and show data

// mocking using jest react-query library, so that we can control our useQuery return
jest.mock("react-query")


/* 
In testing we have common pattern AAA's: Arrange, Act and Assertion
Arrange: we are arranging env such that we can test in our component. eg. useQuery.mockReturnValue({})
Act: based on arrange env how the component is arranging
Assertion: to expect the outcome

*/

// to organise our test cases >>> eg. each test cases as a file and describle is a folder
describe('PostList', () => {
    // scenarios

    // we can use test() or it()
    it("when is loading is true then loading text should display", () => {
        // as we are testing the component so we need render from testing library

        /* Arrange */
        // modifying our mock useQuery returns, here we are testing isLoading
        useQuery.mockReturnValue({
            isLoading: true,
            error: null,
            data: null
        })


        /* Act - mounting that componect in a way we arrange above */
        // The jest. fn method allows us to create a new mock function directly
        const { debug } = render(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />) //as PostList component takes two argument value, func[for that we used mock func]

        // debug()

        console.log(screen.queryByText('Loading..').innerHTML) // checking for "Loading..." text present or not 
        const text = screen.queryByText('Loading..').innerHTML // =>> loading by text
        // const text = screen.queryByTestId('loading-text').innerHTML // =>> loading by id

        /* Assertion */
        // in Assertion we have to check as we have make Loading=True so Loading.. text is showing or not
        expect(text).toBe('Loading..')
    })


})
```




-------------------------------------------------------------------------------------------------------------------------------------------------


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
# jesting-react
# jesting-react
