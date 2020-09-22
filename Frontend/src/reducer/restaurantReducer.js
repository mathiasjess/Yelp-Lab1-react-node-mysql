import {SET_RESTAURANTUSER, UPDATE_RESTAURANTOWNERPROFILE} from '../actions/restaurantAction';

 
export const restaurantInitialState = {
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

const restaurantReducer = ((state = restaurantInitialState, action)=>{
    switch(action.type){
        case 'SET_RESTAURANTUSER':
            return Object.assign(state, action.payload)
        case 'UPDATE_RESTAURANTOWNERPROFILE':
            return Object.assign(state,action.payload)
        default: return state
    }
})

export default restaurantReducer;