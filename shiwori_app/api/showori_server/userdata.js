import {SHIWORI_ROUTE} from '../address';
 
//user情報に関するrequest

/**
 * user sign_up (register) *async*
 * @param {str} name
 * @param {str} email
 * @param {str} password
 * @return {json} responce
 */
export async function signup(name,email,password){
    return fetch(SHIWORI_ROUTE+'/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-SHIWORI-Signature' : 'prismprism'
            },
            body: JSON.stringify({
                "user_name": name,
                "email" : email,
                "password": password,
            }),
        })
        .then((response)=>response.json())
        .then((responseJson)=>responseJson);
}

