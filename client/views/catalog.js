import {Article} from "../components/article.js";
import {Modal} from "../components/modal.js";
import {get, post} from "../webRequest.js";



async function addArticle() {
    const newTitle = $('#newArticleTitle').val();
    const newDesc =  $('#newArticleDesc').val();
    const newPrice = $('#newArticlePrice').val();
    const newImg = 'https://pbs.twimg.com/profile_images/531994916181012480/EBap51cO_400x400.png';
    
    if (newTitle && newDesc && newPrice) {
        await post('/website_template/server/addRecord.php', JSON.stringify({
            title: newTitle,
            description: newDesc,
            price: newPrice,
            img: newImg
        }));

        Catalog();
    }
    else {
        $('#app').prepend(`<div class='alert alert-danger' role='alert'>Unable to add new article...</div>`)
    }
}


async function Catalog() {

    // GET articles from db
    const articles = JSON.parse(await get('/website_template/server/getAllRecords.php'));

    // WRITE THE HTML TO THE APP CONTAINER  
    const app = document.getElementById('app');
    
    app.innerHTML = `
    <div class='row no-gutters'>
        <div class='col'>
            <div class='row d-flex justify-content-center'>
                ${articles.map(Article)}
            </div>
        </div>
        ${catalogCtl()}
    </div>
    `;


    const modalBody = `
        <form id='login'>
            <div class='form-group'>
                <label for='newArticleTitle'>Article Title</label>
                <input type='text' class='form-control' id='newArticleTitle' placeholder='Title'>
            </div>
            <div class='form-group'>
                <label for='newArticleDesc'>Description</label>
                <input type='text' class='form-control' id='newArticleDesc' placeholder='Description of article.'>
            </div>
            <div class='form-group'>
                <label for='newArticlePrice'>Price</label>
                <input type='text' class='form-control' id='newArticlePrice' placeholder='0.00'>
            </div>
        </form>  
    `;

    Modal('New Article', modalBody, addArticle);
}


// Catalog Control Component
const catalogCtl = () => `
    <div class='col-xs-1' style='margin-top:5vw;margin-right:3vw;'>
        <form class='border border-primary rounded'>
            ${filters()}
            ${search()}
        </form>
        ${(sessionStorage.getItem('token')) ? adminTools() : ""}
    </div>
  `;



// Search Component
const search = () => `
    <div style='margin:1vw;margin-top:3vw;'>
        <input class='form-control' placeholder='Search'></input>
        <button class='btn btn-primary' type='submit' style='margin-top:1vw'>Submit</button>
    </div>
    `;



// Filter Component
const filters = () => {

    let html = ``;
    for (let i=0; i<4; i++) {
        html += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="filter_${i}">
                <label class="form-check-label" for="filter_${i}">
                    Filter ${i}
                </label>
            </div>`
    }

    return `<div style='margin:1vw'>${html}</div>`;
    
}


const adminTools = () => {
    return `
        <div class='border border-primary rounded' style='margin-top:1vw'>
            <div style='margin:1vw'>
                <p>ADMIN TOOLS</p>
                <button class='btn btn-success' id='new_article_btn' data-toggle="modal" data-target="#exampleModal">New Article</button>
            </div>
        </div>
    `;
}






export {Catalog}