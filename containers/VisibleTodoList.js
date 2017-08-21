/*Now we are hooking up presentational components to redux
by using store.subscribe(), these are just React components that
use store.subscribe() to read a part of the Redux state tree and supply
props to a presentational component as it renders.

Docs say you could write these by hand but...
Better to generate container components with connect() from react-redux,
prevents re-renders. Don't have to use shouldComponentUpdate yourself.

connect() - to use it, you have to define special function 
mapStateToProps that tells how to transform Redux store state
into the props you want to pass to presentational component you
are wrapping. 

For ex. - VisibleTodoList needs to calculate todos to pass to
TodoList, so we must define function that filters state.todos
according to state.visibilityFilter, and use it in its mapState to props
*/

/* In addition to reading state, container components can dispatch
actions. You can define a function called mapDispatchToPros() that
receives the dispatch method and returns callback props
that you want to inject into presentational component.
For ex. - we want VisibleTodoList to inject a prop called
onTodoClick into TodoList component, and we want onTodoClick
to dispatch a TOGGLE_TODO action.
*/

/* We create the Visible TodoList by calling connect() and passing
these two functions: */

import {connect} from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
    }
}

const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList
