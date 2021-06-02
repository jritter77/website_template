import {get, post} from "/website_template/client/webRequest.js";

import {Home} from "/website_template/client/views/home.js";
import {About} from "/website_template/client/views/about.js";
import {Contact} from "/website_template/client/views/contact.js";
import {Details} from "/website_template/client/views/details.js";
import {Catalog} from "/website_template/client/views/catalog.js";

const pages = {
    home: Home,
    about: About,
    contact: Contact,
    details: Details,
    catalog: Catalog
}

function getPageFromURL() {
    const loc = location.hash.substring(1);
    return loc.split("-")[0];
    
}

// Populate contentDiv wtih retrieved HTML
function loadContent() {
    let fragmentId = getPageFromURL();
    pages[fragmentId]();
}

// Set to home page if no hash
if (!location.hash) {
    location.hash = '#home';
}

// initial call to load content
loadContent();

// add event listener for hash
window.addEventListener('hashchange', loadContent);