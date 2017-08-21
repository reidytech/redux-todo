/* actions describe the fact that something happened,
but don't describe how the state has changed */

/* these are actions, which are payloads of information that
send data from your application to your store */


/*
Changed this file ->
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
*/


/* I guess these are like sub action constants, update this
when you get a better idea of what they are*/


/* Changed this file
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}
*/

/* then we use action creators to create these actions, action creators
simply return an action */

/* Changed all of thise to what's below
export function addTodo(text){
    return {
        type: ADD_TODO,
        text
    }
}

export function toggleTodo(index){
    return {
        type: TOGGLE_TODO,
        index
    }
}

export function setVisibilityFilter(filter){
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}
*/

let nextTodoId = 0 // aded this

export const addTodo =  text => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

export const setVisibilityFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}