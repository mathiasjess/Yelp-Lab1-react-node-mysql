import restaurantReducer from './restaurantReducer'
import customerReducer from './customerReducer'
import {combineReducers} from 'redux'

const allYelpReducers = combineReducers({
    restaurantReducer : restaurantReducer,
    customerReducer : customerReducer
})

export default allYelpReducers;