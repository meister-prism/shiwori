import {GOOGLE_BOOKS} from '../address';

/**
 * request,正常ならキーワードの検索結果が返ってきます。
 * googleBooksAPI keywords search
 * @param {string} key keyword
 * @return {Promise.resolve} responese {status_code:(int),"body":"(json)"}
 * @return {Promise.reject}  response {status_code:(int),"body":null}
 */
export function gbapi_search(key) {
    let response = {"status_code": "", "body": ""};
    return new Promise(function(resolve, reject) {
      fetch(GOOGLE_BOOKS+"?q="+key)
        .then((res) => {
          response.status_code = res.status
          if(res.status != 200) reject(null);
          return res.json();
        })
        .then((resJson) => {
          response.body = resJson;
          resolve(response);
        });
    });
  }

  // この下にresponseから重要情報を抽出する関数たちを書きたい