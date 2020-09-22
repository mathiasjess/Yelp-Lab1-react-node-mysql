export const SET_RESTAURANTUSER = 'SET_RESTAURANTUSER';
export const UPDATE_RESTAURANTOWNERPROFILE = 'UPDATE_RESTAURANTOWNERPROFILE';

export function restaurantLogin(data){
    return {
        type: SET_RESTAURANTUSER,
        payload : data
    }
}

export function restaurantProfileUpdate(data){
    return {
        type: UPDATE_RESTAURANTOWNERPROFILE,
        payload : data
    }
}