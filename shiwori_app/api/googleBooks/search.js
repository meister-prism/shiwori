import {GOOGLE_BOOKS} from '../address';

// search
export async function gbapi_search(key){
    return fetch(GOOGLE_BOOKS+"?q="+key)
        .then((response)=>response.json())
        .then((responseJson)=>responseJson);
}

// getStatusCode
export async function gbapi_searchStatus(key){
    return fetch(GOOGLE_BOOKS+"?q="+key)
        .then((response)=>response.status)
        .then((status)=>status);
}