import { Carousel } from "../components/carousel.js";
import { Calendar } from "../components/calendar.js";
import {getAllPosts} from '../database.js';
import { Modal } from '../components/modal.js';








async function Home() {
    const app = document.getElementById('app');

    const posts = await getAllPosts();

    posts.reverse();


    function displayPost() {
        const p = posts[this.id];
        $('.modal-body').html(`
            <h4>${p.title}</h4>
            <p>${p.description}</p>
        `);
    }


    
    app.innerHTML = `
    <div class="row no-gutters"  style="margin-top:5vw;">
        <div class="col-md">
            ${Carousel()}
        </div>
    </div>
    <div class="row" id="aboutAndContact">
        <div 
        class="col-md text-center border border-primary rounded" 
        style="margin:5vw; padding-top:2vw;"
        >
            <h2>Small About Blurb</h2>
            <p>This would be a space to say a sentence or two about the website.</p>
        </div>
    </div>
    <div class="row" id="calendarAndNews">
        <div 
        class="col-md text-center border border-primary rounded" 
        style="margin:5vw; padding-top:2vw;"
        >
            <h2>News Feed</h2>
            <div class='text-left overflow-auto' style='max-height: 80%;'>
                ${posts.map((p, index) => post(p, index)).join('')}
            </div>
            
        </div>
    </div>
    
    `;


    Calendar('calendarAndNews');

    $('.newspost').click(displayPost);

    Modal('News Post', '', null);

}



const post = ({id, title, description}, index) => {
    
    if (description.length > 40) {
        description = description.substring(0, 40) + '...';
    }


    return `
        <div 
        onMouseOver='this.style.backgroundColor="cyan"'
        onMouseOut='this.style.backgroundColor="white"'
        class='newspost border border-primary' 
        id='${index}'
        data-toggle='modal' 
        data-target="#exampleModal"
        style='cursor: pointer; padding: 1em;'
        >
            <p style='color:blue'>#${id}-${title}</p> ${description}
        </div>`;
}





export { Home }