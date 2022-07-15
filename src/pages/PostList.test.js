import { render, screen } from "@testing-library/react";
import React from "react";
import PostList from './PostList'

// importing useQuery to mock its behaviour(returns), so that we can test them
import { useQuery } from 'react-query' // role of useQuery is to call an api and show data
import { BrowserRouter } from "react-router-dom";

// mocking using jest react-query library, so that we can control our useQuery return
jest.mock("react-query")


/* 
In testing we have common pattern AAA's: Arrange, Act and Assertion
Arrange: we are arranging env such that we can test in our component. eg. useQuery.mockReturnValue({})
Act: based on arrange env how the component is arranging

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

        console.log(screen.queryByTestId('loading-text').innerHTML) // checking for "Loading..." text present or not 
        const text = screen.queryByText('Loading..').innerHTML // =>> loading by text
        // const text = screen.queryByTestId('loading-text').innerHTML // =>> loading by id

        /* Assertion */
        // in Assertion we have to check as we have make Loading=True so Loading.. text is showing or not
        expect(text).toBe('Loading..')
    })


    it('when data is true', () => {
        useQuery.mockReturnValue({
            isLoading: false,
            error: null,
            data: {
                data: [{ id: 1, title: "Dummy title" }, { id: 2, title: "Dummy title2" }]
            }
        })


        const { debug } = render(
            <BrowserRouter>
            {/* as prev we were not loading data so it didnt give Link error */}
                <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
            </BrowserRouter>
        ) //as PostList component takes two argument value, func[for that we used mock func]

        // debug()

        // as getAll will give list of result so we will map them
        // we are using li.textContent because if we do li.innerHTML then it will return a-tag(as they are present in li)
        const data = screen.getAllByTestId('listItem').map((li)=>li.textContent)
        console.log(data)


        expect(data).toEqual([ 'Dummy title', 'Dummy title2' ])
        // if you have big array then instead of toEqual() use toMatchInlineSnapshot()

        // expect(data).toMatchInlineSnapshot()

    })


})