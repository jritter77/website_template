import {Article} from "/website_template/client/components/article.js";
import {get, post} from "/website_template/client/webRequest.js";

async function Catalog() {

    // DEFINE ALL FUNCTIONS AND VARIABLES

    const articles = JSON.parse(await get('http://localhost/website_template/server/getAllRecords.php'));


    function arrangeArticles() {
        let html = "";

        for (let i=0; i<articles.length; i++) {

            if (i%3 === 0) {
                if (i>0) {
                    html += "</div>";
                }
                html += "<div class='row d-flex justify-content-center'>" + Article(articles[i]);
            }
            else {
                html += Article(articles[i]);
            }
            
        }

        html += "</div>"

        return html;
    }

    
    // WRITE THE HTML TO THE APP CONTAINER
    
    const app = document.getElementById('app');
    
    app.innerHTML = arrangeArticles();

    


    // DYNAMICALLY ADJUST WRITTEN HTML VIA JS

    // ex: document.getElementById("test_btn").onclick = handleClick;

    //ex: $('img').click(handleClick);        // add click handler to all elements via jquery
}


export {Catalog}