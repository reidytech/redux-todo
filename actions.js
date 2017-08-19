/* actions describe the fact that something happened,
but don't describe how the state has changed */

/* these are actions, which are payloads of information that
send data from your application to your store */

const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/* I guess these are like sub action constants, update this
when you get a better idea of what they are*/

const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/* then we use action creators to create these actions, action creators
simply return an action */

function addTodo(text)){
    return {
        type: ADD_TODO,
        text
    }
}

function toggleTodo(index){
    return {
        type: TOGGLE_TODO,
        index
    }
}

function setVisibilityFilter(filter){
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}