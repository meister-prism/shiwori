/**
 * response -> data
 * @pram result : レスポンス(res.body)
 * @pram index :  default : 0 res.body.items[index（このindexの値）
 * @return {obj} : 取得情報
 * key :    id,title,subtitle,authors{list},publisher,
 *          publisherDate,pageCount,imagelink
 */
export function getBooksData(result,index){
    let imageLink;
    if("imageLinks" in result.items[index].volumeInfo){
        imageLink = result.items[index].volumeInfo.imageLinks.smallThumbnail;
    }else{
        imageLink = null;
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
        imageLink     : imageLink,
    }
    return ret;
}