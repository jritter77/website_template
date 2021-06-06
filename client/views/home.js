import { Carousel } from "../components/carousel.js";
import { Calendar } from "../components/calendar.js";

function Home() {
    const app = document.getElementById('app');

    

    app.innerHTML = `
    <div class="row">
        <div class="col">
            ${Carousel()}
        </div>
    </div>
    <div class="row" id="calendarAndNews">
        <div 
        class="col text-center border border-primary rounded" 
        style="margin:5vw; padding-top:2vw;"
        >
            <h2>News Feed</h2>
            <p>This would be a space to provide updates to the public.</p>
            
        </div>
    </div>
    <div class="row" id="aboutAndContact">
        <div 
        class="col text-center border border-primary rounded" 
        style="margin:5vw; padding-top:2vw;"
        >
            <h2>Small About Blurb</h2>
            <p>This would be a space to say a sentance or two about the website.</p>
        </div>
        <div 
        class="col text-center border border-primary rounded" 
        style="margin:5vw; padding-top:2vw;"
        >
            <h2>Quick Contact</h2>
            <p>This would be a space to provide links to contact and other short contact info.</p>
            <p style="margin-top:20%;">Phone: 555-555-5555</p>
            <p>Email: websiteName@gmail.com</p>
        </div>
    </div>
    `;

    Calendar('calendarAndNews');

}

export { Home }