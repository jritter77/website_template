import {article} from "/website_template/client/components/article.js";
import {get, post} from "/website_template/client/webRequest.js";

async function home() {

    // DEFINE ALL FUNCTIONS AND VARIABLES

    const articles = JSON.parse(await get('http://localhost/website_template/server/getAllRecords.php'));


    async function handleClick() {
        const result = await post('http://localhost/website_template/server/getRecord.php', '1');
        console.log(result);
    }


    function arrangeArticles() {
        let html = "";

        for (let i=0; i<articles.length; i++) {

            if (i%3 === 0) {
                if (i>0) {
                    html += "</div>";
                }
                html += "<div class='row'>" + article(articles[i]);
            }
            else {
                html += article(articles[i]);
            }
            
        }

        html += "</div>"

        return html;
    }

    
    // WRITE THE HTML TO THE APP CONTAINER
    
    const app = document.getElementById('app');
    
    app.innerHTML = arrangeArticles();

    $('img').click(handleClick);


    // DYNAMICALLY ADJUST WRITTEN HTML VIA JS

    document.getElementById("test_btn").onclick = handleClick;
}


export {home}