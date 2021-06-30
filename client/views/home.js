import { Carousel } from "../components/carousel.js";
import { Calendar, setEventList, setEvents } from "../components/calendar.js";
import {getAllEvents, getAllPosts} from '../database.js';
import { Modal } from '../components/modal.js';



let posts = [];
let events = [];


function displayEvent(el) {
    if (el.children[0].children.length) {
        let id = el.children[0].children[0].id;
        let ev = events[id];
        $('.modal-title').html(ev.title);
        $('.modal-body').html(`<p>${ev.description}</p>`)
        $('#exampleModal').modal('toggle');
    }
}



function displayPost() {
    const p = posts[this.id];
    $('.modal-title').html(p.title);
    $('.modal-body').html(`<p>${p.description}</p>`);
}



async function Home() {
    const app = document.getElementById('app');

    posts = await getAllPosts();
    events = await getAllEvents();

    posts.reverse();


    


    
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

    setEventList(events);
    Calendar('calendarAndNews');


    $('.newspost').click(displayPost);

    Modal('News Post', '', null);

    $('.dayContainer').each((i, el) => {
        el.onclick = () => displayEvent(el);
    })

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
            <p style='color:blue'>#${id} - ${title}</p> ${description}
        </div>`;
}





export { Home }