import {Article} from "../components/article.js";
import {Modal} from "../components/modal.js";
import {get, post} from "../webRequest.js";

// Declare all global variables for the page
let articles;
let searchTerm = "";
let activeFilters;
let activePriceRange;


// Add Article function adds new article to database
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


async function deleteArticle(id) {
    await post('/website_template/server/deleteRecord.php', JSON.stringify({
        id: id
    }));

    Catalog();
}

// Checks for the current searchTerm in the title and description of given article
function checkSearchTerm(a) {
    const title = a.title.search(searchTerm) > -1;
    const desc = a.description.search(searchTerm) > -1;
    if (title || desc) {
        return true;
    }
    return false;
}


// Collects which filters are currently active and stores the results in activeFilters
function getActiveFilters() {
    activeFilters = [];
    $('.articleFilter').each((i, e) => {
        if (e.checked) {
            activeFilters.push(e.value);
        }
    });
}


// sets the current price range to the selected option
function getPriceRange() {
    $('.articlePriceRange').each((i, e) => {
        if (e.checked) {
            if (e.value === 'any') {
                activePriceRange = [0, Infinity];
                return false;
            }

            const range = e.value.split('-');
            range[1] = (range[1] === '*') ? Infinity : range[1];
            activePriceRange = range;
            return false;
        }
    });
}


// Filter function used to filter articles when searching
function filterArticles(a) {
    const tags = (a.tags) ? a.tags : "";
    const min = parseInt(activePriceRange[0]);
    const max = (activePriceRange[1] === Infinity) ? Infinity : parseInt(activePriceRange[1]);
    const price = parseInt(a.price);

    
    if (price >= min && price < max) {
        if (activeFilters.length > 0) {
            for (let af of activeFilters) {
                if (tags.indexOf(af) > -1) {
                     return checkSearchTerm(a);
                }
            }
        }
        else {
            return checkSearchTerm(a);
        }
    }
    
    
    return false;
}

// Filters the articles according to all search variables
function handleSearch() {
    searchTerm = $('#search').children(':first').val();
    searchTerm = (searchTerm) ? searchTerm : "";

    getActiveFilters();
    getPriceRange();
    
    $('#articles').html(articles.filter(filterArticles).map(Article));
    
}


// This is the main Page component to be displayed, houses all other components.
async function Catalog() {

    // GET articles from db
    articles = JSON.parse(await get('/website_template/server/getAllRecords.php'));

    // WRITE THE HTML TO THE APP CONTAINER  
    const app = document.getElementById('app');
    
    app.innerHTML = `
    <div class='row no-gutters'>
        ${catalogCtl()}
        <div class='col'>
            <div id='articles' class='row d-flex justify-content-center'>
                ${articles.map(Article).join('')}
            </div>
        </div>
        
    </div>
    `;


    
    // create Modal for newArticle
    Modal('New Article', newArticleModal, addArticle);

    // Set onSubmit of search form
    $('#search').on('submit', handleSearch);

    // Set onclick event of all deleteArticleButtons
    $('.deleteArticleButton').each((i, e) => {
        e.onclick = () => deleteArticle(e.value);
    })

}


// Catalog Control Component
const catalogCtl = () => `
    <div class='col-xs-1' style='margin-top:5vw;margin-right:3vw;'>
        <div class='border border-primary rounded'>
            <div class='row'>
                <div class='col'>${filters()}</div>
                <div class='col'>${priceRange()}</div>
            </div>
            <div class='row'>
                <div class='col'>${search()}</div>
            </div>
        </div>
        ${(sessionStorage.getItem('token')) ? adminTools() : ""}
    </div>
  `;



// Search Component
const search = () => `
    <form id='search' style='margin:1vw;margin-top:3vw;'>
        <input class='form-control' placeholder='Search'></input>
        <button class='btn btn-primary' type='submit' style='margin-top:1vw'>Submit</button>
    </form>
    `;



// Filter Component
const filters = () => {
    const terms = ['test', 'things', 'stuff'];


    let html = `<p>Filters:</p>`;
    for (let t of terms) {
        html += `
            <div class="form-check">
                <input class="form-check-input articleFilter" type="checkbox" value="${t}" id="filter_${t}">
                <label class="form-check-label" for="filter_${t}">
                    ${t}
                </label>
            </div>`
    }

    return `<div style='margin:1vw'>${html}</div>`;
    
}


// Price Range component
const priceRange = () => {
    const ranges = ['any', '0-50', '50-100', '100-*'];


    let html = `<p>Price Range:</p>`;
    for (let r of ranges) {
        html += `
            <div class="form-check">
                <input class="form-check-input articlePriceRange" name='price_range' type="radio" value="${r}" id="price_range_${r}" ${(r==='any') ? 'checked' : ''}>
                <label class="form-check-label" for="price_range_${r}">
                    ${r}
                </label>
            </div>`
    }

    return `<div style='margin:1vw'>${html}</div>`;
}


// Admin Tools component
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



// Body for New Article Modal component
const newArticleModal = `
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





export {Catalog}