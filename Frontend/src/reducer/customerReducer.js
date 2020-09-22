import {SET_YELPCUSTOMER,UPDATE_YELPCUSTOMERPROFILE} from '../actions/customerAction'

export const customerInitialState = {
    restaurantId: '',
    restaurantName: '',
    email: '',
    password: '', 
    description: '',
    contact: '',
    location: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    restaurantImage: '',
    timings: ''
}

const customerReducer = ((state = customerInitialState, action)=>{
    switch(action.type){
        case 'SET_YELPCUSTOMER':
            return Object.assign(state, action.payload)
        case 'UPDATE_YELPCUSTOMERPROFILE':
            return Object.assign(state,action.payload)
        default: return state
    }
})

export default customerReducer;