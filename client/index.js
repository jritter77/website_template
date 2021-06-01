import {get, post} from "/website_template/client/webRequest.js";

import {home} from "/website_template/client/views/home.js";
import {about} from "/website_template/client/views/about.js";
import {contact} from "/website_template/client/views/contact.js";

const pages = {
    home: home,
    about: about,
    contact: contact
}

// Populate contentDiv wtih retrieved HTML
function loadContent() {
    let fragmentId = location.hash.substr(1);
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