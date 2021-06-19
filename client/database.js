import {get, post, uploadImg} from './webRequest.js';


async function getAllRecords() {
    try {
        return JSON.parse(await get('./server/getAllRecords.php'))
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

export {addRecord, deleteRecord, getAllRecords};