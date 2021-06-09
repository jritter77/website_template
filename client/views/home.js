import { Carousel } from "../components/carousel.js";
import { Calendar } from "../components/calendar.js";

function Home() {
    const app = document.getElementById('app');

    

    app.innerHTML = `
    <div class="row no-gutters"  style="margin-top:5vw;">
        <div class="col-md">
            ${Carousel()}
        </div>
    </div>
    <div class="row" id="calendarAndNews">
        <div 
        class="col-md text-center border border-primary rounded" 
        style="margin:5vw; padding-top:2vw;"
        >
            <h2>News Feed</h2>
            <p>This would be a space to provide updates to the public.</p>
            
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
    `;

    Calendar('calendarAndNews');

}

export { Home }