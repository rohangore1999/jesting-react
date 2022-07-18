import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import PostList from './PostList'

// importing useQuery to mock its behaviour(returns), so that we can test them
import { useQuery } from 'react-query' // role of useQuery is to call an api and show data
import { BrowserRouter } from "react-router-dom";

// mocking using jest react-query library, so that we can control our useQuery return
// jest.mock("react-query")

// to mock api call
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import * as reactQuery from 'react-query'


// setting up the server (we have setted up globally but we can set from each individual test cases)
const server = setupServer(rest.get('http://localhost:3002/posts'), (req, res, ctx) => {
    // req :- to request from api.. request.body or request.header 
    // res :- to send the response 
    // ctx :- some helper functions

    return res(
        ctx.json([
            { id: 1, title: "API Dummy title" },
            { id: 2, title: "API Dummy title2" }
        ])

    )
})


/* 
In testing we have common pattern AAA's: Arrange, Act and Assertion
Arrange: we are arranging env such that we can test in our component. eg. useQuery.mockReturnValue({})
Act: based on arrange env how the component is arranging

*/

// to organise our test cases >>> eg. each test cases as a file and describle is a folder
describe('PostList', () => {
    // scenarios
    let useQuery = null //declaring useQuery outside so that we can use it throughout the describe block

    beforeAll(() => {
        // for entire describe block it will run for 1 time
        // spyOne will take one object(console) and we want to overwite on 'log' functionality
        useQuery = jest.spyOn(reactQuery, 'useQuery')

        // to start the server
        server.listen()

    })

    beforeEach(() => {
        // execute before each individual test case running
        
        // after each individual test case run, clearing server
        server.resetHandlers()

        useQuery.mockClear() //so that it will reset it for each test cases
    })

    // afterAll will execute after all the test cases gets executed
    afterAll(() => {
        // after executing all the test cases, we will close
        server.close()
    })

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
        // The jest.fn method allows us to create a new mock function directly
        render(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />) //as PostList component takes two argument value, func[for that we used mock func]

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
        const data = screen.getAllByTestId('listItem').map((li) => li.textContent)
        console.log(data)


        expect(data).toEqual(['Dummy title', 'Dummy title2'])
        // if you have big array then instead of toEqual() use toMatchInlineSnapshot()

        // expect(data).toMatchInlineSnapshot()

    })

    it('API call made to POST endpoint', async() => {
        // if we want to use orginal implementation of the useQuery
        useQuery.mockRestore()
        render(
            <BrowserRouter>
                {/* as prev we were not loading data so it didnt give Link error */}
                <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
            </BrowserRouter>
        ) //as PostList component takes two argument value, func[for that we used mock func]

        await waitForElementToBeRemoved(()=> screen.getByTestId('loading-text'))
    })


})