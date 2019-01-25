import {GOOGLE_BOOKS} from '../address';

/**
 * 絞り込み・並び替えなどのカスタム検索の初期値にはこれを用いてください。
 * *Note : Object.assign({},INITIAL_CONFIG)などをして値渡しをしてください。
 * 
 */
export const INITIAL_CONFIG = {
    // config
    startIndex : 0, 
    maxResults : 10,
    intitle : false,
    inauthor :false,
    inpublisher : false,
    newest : false,
}

/**
 * request,正常ならキーワードの検索結果が返ってきます。
 * @param >> config を指定しない場合、キーワード関連順、上位10位が返却されます。
 * @param >> config を詳細に指定して、絞込検索・検索結果の並び替えを行います。
 * gbapi_search_custom()より詳細に設定して検索できます。
 * googleBooksAPI keywords search
 * @param {string} key keyword
 * @return {Promise.resolve} responese {status_code:(int),"body":"(json)"}
 * @return {Promise.reject}  response {status_code:(int),"body":null}
 */
export function gbapi_search(key,config=INITIAL_CONFIG) {
  let response = {"status_code": "", "body": ""};
  let target = GOOGLE_BOOKS+"?q="; //default
  let tmp = true;
  if(config!=INITIAL_CONFIG){
    // 絞込
    if(config.intitle){
        target += "intitle:";
        tmp = true;
    }
    if(config.inauthor && !tmp){
        target += "inauthor:";
        tmp = true;
    }
    if(config.inpublisher && !tmp)target += "inpublisher:";
    target += key;
    if(config.startIndex!=0)target+=("&startIndex="+String(config.startIndex));
    if(config.maxResults!=10)target+=("&maxResults="+String(config.maxResults));
    if(config.newest)target += "&orderBy=newest";
  }else{
      target+=key;
  }
  return new Promise(function(resolve, reject) {
    fetch(target)
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

/**
 * googleBooksAPI id search
 * idに対する本の情報が返却されます
 * @param {string} key keyword
 * @return {Promise.resolve} responese {status_code:(int),"body":"(json)"}
 * @return {Promise.reject}  response {status_code:(int),"body":null}
 */
export function gbapi_search_specific(id) {
    let response = {"status_code": "", "body": ""};
    let target = GOOGLE_BOOKS+"/"+id;
    return new Promise(function(resolve, reject) {
      fetch(target)
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