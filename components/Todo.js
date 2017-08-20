//if and when you need to add local state, lifecycle methods,
//or performance optimizations, you can convert them to classes
//write now we're writing pure functions because we don't have to

import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
    {text}
    </li>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Todo