import { SHIWORI_ROUTE } from '../address';
import { SHIWORI_SIG } from '../signatures';
// 統計データに関するrequest

/**
 * get statistics *async
 * @param {str} user_id 
 */
export async function get(user_id) {
    let response = {"status": "", "body": ""};
    return new Promise(function(resolve, reject) {
        fetch(SHIWORI_ROUTE + '/user/home?user_id='+user_id,{
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-SHIWORI-Signature': SHIWORI_SIG 
            }
        })
          .then((res) => {
            response.status = res.status
            if(res.status != 200) reject(res.status);
            return res.json();
          })
          .then((resJson) => {
            response.body = resJson;
            resolve(response);
          });
      });
}