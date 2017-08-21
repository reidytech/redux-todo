/* If you worry about mapStateToProps creating new objects
too often, learn about computing derived data with reselect 

Reselect is a library for creating memoized, composable selector functions.
Reselect selectors can be used to efficiently compute derived
data from the Redux store.

*/

import { connect } from 'react-redux'
import {setVisibilityFilter} from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink