/* OK so he takes out the exporting of the text assignments 
to the actions */

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter
      default:
        return state
    }
  }

  export default visibilityFilter