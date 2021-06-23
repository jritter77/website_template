import {get, post, uploadImg} from './webRequest.js';


async function getAllRecords() {
    try {
        return JSON.parse(await get('./server/getAllRecords.php'));
    }
    catch {
        console.log(err);
    }
}



async function addRecord(title, desc, price, img, tags) {

    try {
        const imgPath = './images/' + await uploadImg(img);
        await post('./server/addRecord.php', JSON.stringify({
            title: title,
            description: desc,
            price: price,
            img: imgPath,
            tags: tags
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}


async function deleteRecord(id) {
    try {
        await post('./server/deleteRecord.php', JSON.stringify({
            id: id
        }));
    }
    catch (err) {
        console.log(err);
    }
}




async function getAllPosts() {
    try {
        return JSON.parse(await get('./server/getAllPosts.php'));
    }
    catch {
        console.log(err);
    }
}



async function addNewsPost(date, title, desc) {

    try {
        await post('./server/addPost.php', JSON.stringify({
            date: date,
            title: title,
            description: desc
        }));
    }
    catch (err) {
        console.log(err);
    }
    

}



async function deleteNewsPost(id) {
    try {
        return await post('./server/deletePost.php', JSON.stringify({
            id: id
        }));

    }
    catch (err) {
        console.log(err);
    }

    
}





export {addRecord, deleteRecord, getAllRecords, getAllPosts, addNewsPost, deleteNewsPost};