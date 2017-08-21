import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

/* All container components need access to the Redux store so that
they can subscribe to it. 

One way would be to pass it as a prop to every container component,
but that would be work, because you would have to wire store
even through presentational components just because they
happen to render a container deep in the component tree.

A better option is to use React-Redux component <Provider> to
make the store available to all container components in the 
application without passing it explicitly. You only need to use
it once when you render the root component.
Learn about "context"? That's the link mentioned in
---> <Provider>
*/

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)


/* Presentation:

todos: Array is an array of todo items with [id, text, completed] shape.
onTodoClick(id: number) is a callback to invoke when a todo is clicked

Todo is a single todo item
text: string - text to show
completed: boolean - whether the todo should appear crossed out
onClick() is a callback to invoke when a todo is clicked

Link - is a link with a callback
onClick() - is a callback to invoke when link is clicked.

Footer - where we let the user change currently visible todos
App - the root component that renders everything else

Container components needed to connect presentational components
to Redux -

TodoList needs a container like VisibleTodoList that subscribes
to the Redux store and knows how to apply the current visibility
filter

To change visibility filter, we provide a FilterLink container
component that renders a Link that dispatches an appropriate action
to click

VisibileTodoList - filters todos according to visibility, renders
a TodoList

FilterLink - gets current visibility filter, renders a Link.
fliter: string is visibility filter it represents.

/*

We could start writing tests for reducers and action creators:

import {
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilters
  } from './actions'
  
  // Log the initial state
  console.log(store.getState())
  
  // Every time the state changes, log it
  // Note that subscribe() returns a function for unregistering the listener
  let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  )
  
  // Dispatch some actions
  store.dispatch(addTodo('Learn about actions'))
  store.dispatch(addTodo('Learn about reducers'))
  store.dispatch(addTodo('Learn about store'))
  store.dispatch(toggleTodo(0))
  store.dispatch(toggleTodo(1))
  store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
  
  // Stop listening to state updates
  unsubscribe()
  */