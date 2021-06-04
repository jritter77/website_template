import { Carousel } from "/website_template/client/components/carousel.js";
import { Calendar, getNextMonth, getPrevMonth} from "/website_template/client/components/calendar.js";

function Home() {
    const app = document.getElementById('app');

    

    app.innerHTML = `
    <div class="row">
        <div class="col">
            ${Carousel()}
        </div>
    </div>
    <div class="row">
        <div class="col text-center">
            <h2>Small About Blurb</h2>
            <p>This would be a space to say a sentance or two about the website.</p>
        </div>
        <div class="col text-center">
            <h2>News Feed</h2>
            <p>This would be a space to provide updates to the public.</p>
        </div>
    </div>
    <div class="row">
        <col>${Calendar()}</col>
    </div>
    `;


    $('#prevMonth').click(getPrevMonth);
    $('#nextMonth').click(getNextMonth);
}

export { Home }