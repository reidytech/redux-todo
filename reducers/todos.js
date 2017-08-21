/* actions describe what happened, but don't specify how the application
state changed, which is what reducers are for */

/*application state is stored as a single object, so plan out state
before anything else*/

/*for todo app -> currently selected visibility filter
the list of todos */

/*reducer, pure function that takes previous state and and action,
and returns the next state*/

/* ??? It's called a reducer because it's the type of function you would pass to Array.prototype.reduce(reducer, ?initialValue).

Never do this inside a reducer:

Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random().

*/

/* By the way, we could also do this:

Note for ES6 Savvy Users

Because combineReducers expects an object, we can put all top-level reducers into a separate file, export each reducer function, and use import * as reducers to get them as an object with their names as the keys:

import { combineReducers } from 'redux'
import * as reducers from './reducers'

const todoApp = combineReducers(reducers)
Because import * is still new syntax, we don't use it anymore in the documentation to avoid confusion, but you may encounter it in some community examples.

*/

/*
Took this import out - split up visibilityFilter and todos reducers

import {
    ADD_TODO,
    TOGGLE_TODO,
    REMOVE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters,
    addTodo,
    toggleTodo,
    setVisibilityFilter
  } from './actions'
import { combineReducers } from 'redux'

//uses es6 destructuring

const {SHOW_ALL} = VisibilityFilters
*/

/* THIS IS WHAT IT WAS ->

ie., the todos before it became its own file

function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return [
          ...state,
          {
            text: action.text,
            completed: false
          }
        ]
      case TOGGLE_TODO:
        return state.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      default:
        return state
    }
  }

  */

  const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id, //I believe this is what you were missing
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_TODO':
        return state.map(todo => 
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
              : todo
          )
      default:
        return state
    }
  }

  export default todos
      /*
      THIS CHANGED
      case TOGGLE_TODO:
        return state.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
        */

  
  /* moved this to visibilityFilter.js, apparently 

  function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter
      default:
        return state
    }
  }
*/

/*

You could also give them different keys, or call functions differently. These two ways to write a combined reducer are equivalent:

const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
All combineReducers() does is generate a function that calls your reducers with the slices of state selected according to their keys, and combining their results into a single object again. It's not magic. And like other reducers, combineReducers() does not create a new object if all of the reducers provided to it do not change state.

*/

/* NEED TO TAKE THIS OUT, IT IS NOW IN INDEX.jS 
  const todoApp = combineReducers({
    visibilityFilter,
    todos
  })
  
  export default todoApp
  */

  /*

  This is equivalent to:
  
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}

*/





//this is the VERBOSE CODE:

//const initialState = {
    //visibilityFilter: visibilityFilter.SHOW_ALL,
    //todos: []
//}

//we can use the ES6 default arguments syntax
//to initialize state to initialState if it is undefined

//function todoApp(state = initialState, action){
    //switch(action.type){
        //case SET_VISIBILITY_FILTER:
            //return Object.assign({}, state, {
                /*so this is what it says in the redux docs:
                We don't mutate the state. We create a copy with Object.assign(). 
                Object.assign(state, { visibilityFilter: action.filter }) is also wrong: it will mutate the first argument. 
                You must supply an empty object as the first parameter. You can also enable the object spread operator proposal to write { ...state, ...newState } instead.
                We return the previous state in the default case. It's important to return the previous state for any unknown action.
                
                What's actually going on here is that we are creating a new, empty object, 
                giving it all the properties of state, plus the state change, and returning the object
                we just created. NOTE: we are NOT returning state. We are returning a new object
                with all the previous properties of state along with the updated properties that the action has affected.
                The reason for all of this stems from the way redux works. It works on the basis of pure functions.
                A pure function cannot alter input data, it has to give reliable, predictable output for
                every input, and have no side effects. Side effects are like when you do a = a + 1, by the way.
                We are returning a new object because redux takes that new object, compares it to
                the previous state we have stored, and then updates the state ONLY IF the state has changed. If
                we "mutated" the state or directly assigned it the state change, when redux compared 
                two states it would find that nothing had changed, because we already changed it. Therefore 
                redux would not update the state, and it would be as if no action had ocurred. How redux does
                this is my other question...which will require me to finish this application, so I can log redux's source code and
                understand it. Then I will update this.
                Update: _____
                */
                //visibilityFilter: action.filter
            //})
        //case ADD_TODO:
            //return Object.assign({}, state, {
                //todos: [
                    //...state.todos
                //],
                //text: action.text,
                //completed: false
            //})
        //case TOGGLE_TODO:
            //return Object.assign({}, state, {
                //todos: state.todos.map((todo, index) => {
                    //if(index === action.text){
                        //return Object.assign({}, todo, {
                            //completed: !todo.completed
                        //})
                    //}
                    //return todo
                //})
            //})
        //default:
            //return state
    //}

//}


/* Splitting this up in terms of reducer logic, 
ADD_TODO AND TOGGLE_TODO are the only actions
that actually affect todos, note SET_VISIBILITY FILTER doesn't need todo. Note
that the second functions's ADD_TODO/TOGGLE_TODO must utilize the first function to update
to update the todo array based on the action. So ADD_TODO falls into the logic under
TOGGLE_TODO, apparently, which is counterintuitive, as I would think that it would fall into case TOGGLE_TODO, and evaluate
as false, and then just return the previous state. So I'll have to test that. So we
could split up the logic as so:

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    default:
      return state
  }
}

*/