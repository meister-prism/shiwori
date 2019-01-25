/**
 * response -> data
 * @pram result : レスポンス(res.body)
 * @pram index :  default : 0 res.body.items[index（このindexの値）
 * @return {obj} : 取得情報
 * key :    id,title,subtitle,authors,publisher,
 *          publisherDate,pageCount,imagelink
 */
export function getBooksData(result,index){
    let imageLink_smallThumbnail=null,
        imageLink_thumbnail=null,
        imageLink_small=null,
        imageLink_medium=null,
        imageLink_large=null,
        imageLink_extraLarge=null;
    if("imageLinks" in result.items[index].volumeInfo ){
        if('smallThumbnail' in result.items[index].volumeInfo.imageLinks)imageLink_smallThumbnail = result.items[index].volumeInfo.imageLinks.smallThumbnail;
        if( 'thumbnail' in result.items[index].volumeInfo.imageLinks)imageLink_thumbnail  = result.items[index].volumeInfo.imageLinks.thumbnail;
        if('small' in result.items[index].volumeInfo.imageLinks)imageLink_small      = result.items[index].volumeInfo.imageLinks.small;
        if('medium' in result.items[index].volumeInfo.imageLinks)imageLink_medium     = result.items[index].volumeInfo.imageLinks.medium;
        if('large' in result.items[index].volumeInfo.imageLinks)imageLink_large      = result.items[index].volumeInfo.imageLinks.large;
        if('extraLarge' in  result.items[index].volumeInfo.imageLinks)imageLink_extraLarge = result.items[index].volumeInfo.imageLinks.extraLarge;
    }
    let authors="";
    if("authors"  in result.items[index].volumeInfo){
        for(let i=0;i<result.items[index].volumeInfo.authors.length;i++){
            if(i!=0)authors+=", ";
            authors += result.items[index].volumeInfo.authors[i];
        }
    }
    let ret = {
        id            : result.items[index].id,
        SelfLink      : result.items[index].SelfLink,
        title         : result.items[index].volumeInfo.title,
        subtitle      : result.items[index].volumeInfo.subtitle,
        authors       : authors,
        publisher     : result.items[index].volumeInfo.publisher,
        publishedDate : result.items[index].volumeInfo.publishedDate,
        pageCount     : result.items[index].volumeInfo.pageCount,
        imageLink_smallThumbnail        : imageLink_smallThumbnail,
        imageLink_thumbnail             : imageLink_thumbnail,
        imageLink_small                 : imageLink_small,
        imageLink_medium                : imageLink_medium,
        imageLink_large                 : imageLink_large,
        imageLink_extraLarge            : imageLink_extraLarge,
    }
    return ret;
}

/**
 * response -> data *id検索で取得した場合に使用する*
 * @pram result : レスポンス(res.body)
 * @return {obj} : 取得情報
 * key :    id,title,subtitle,authors,publisher,
 *          publisherDate,pageCount,imagelink
 */
export function getBooksData_specific(result){
    let imageLink_smallThumbnail=null,
        imageLink_thumbnail=null,
        imageLink_small=null,
        imageLink_medium=null,
        imageLink_large=null,
        imageLink_extraLarge=null;
    if("imageLinks" in result.volumeInfo ){
        if('smallThumbnail' in result.volumeInfo.imageLinks)imageLink_smallThumbnail = result.volumeInfo.imageLinks.smallThumbnail;
        if( 'thumbnail' in result.volumeInfo.imageLinks)imageLink_thumbnail  = result.volumeInfo.imageLinks.thumbnail;
        if('small' in result.volumeInfo.imageLinks)imageLink_small      = result.volumeInfo.imageLinks.small;
        if('medium' in result.volumeInfo.imageLinks)imageLink_medium     = result.volumeInfo.imageLinks.medium;
        if('large' in result.volumeInfo.imageLinks)imageLink_large      = result.volumeInfo.imageLinks.large;
        if('extraLarge' in  result.volumeInfo.imageLinks)imageLink_extraLarge = result.volumeInfo.imageLinks.extraLarge;
    }
    let authors="";
    if("authors"  in result.volumeInfo){
        for(let i=0;i<result.volumeInfo.authors.length;i++){
            if(i!=0)authors+=", ";
            authors += result.volumeInfo.authors[i];
        }
    }
    let description="詳細情報はありません";
    if("description" in result.volumeInfo){
        description = description_convert(result.volumeInfo.description);
    }
    let ret = {
        id                          : result.id,
        SelfLink                    : result.SelfLink,
        title                       : result.volumeInfo.title,
        subtitle                    : result.volumeInfo.subtitle,
        authors                     : authors,
        publisher                   : result.volumeInfo.publisher,
        publishedDate               : result.volumeInfo.publishedDate,
        pageCount                   : result.volumeInfo.pageCount,
        imageLink_smallThumbnail    : imageLink_smallThumbnail,
        imageLink_thumbnail         : imageLink_thumbnail,
        imageLink_small             : imageLink_small,
        imageLink_medium            : imageLink_medium,
        imageLink_large             : imageLink_large,
        imageLink_extraLarge        : imageLink_extraLarge,
        description                 : description,
    }
    return ret;
}

/**
 * HTMLタグを除去して、テキストデータに変換する
 * @param {str} str googleBooksAPI,description 
 */
export function description_convert(str){
    str = str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
    return str;
}