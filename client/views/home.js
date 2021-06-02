import { Carousel } from "/website_template/client/components/carousel.js";

function Home() {
    const app = document.getElementById('app');

    $('#nav').hide();

    app.innerHTML = `
    <div class="row">
        <div class="col">
            ${Carousel()}
        </div>
    </div>
    `;
}

export { Home }