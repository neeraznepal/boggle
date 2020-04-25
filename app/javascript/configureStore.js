import {createStore} from 'redux'
import { func } from 'prop-types'

const initialState = {
    userName : null
}

function rootReducer(state,action){
    switch (action.type) {
        default:
            return state;
    }
}

export default function configureStore(){
    const store = createStore(rootReducer,initialState);
    return store;
}