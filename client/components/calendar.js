const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const d = new Date();

const c_year = d.getFullYear();
const c_month = d.getMonth();
const c_date = d.getDate();
const c_day = d.getDay();


const testEvents = [{name: 'event1', year: 2021, month: 5, date: 21}, {name: 'event_2', year: 2021, month: 6, date: 15}];



// Sets all events for the current calendar
function setEvents(events) {
    let curMonth = months.indexOf($('#month').html());
    let curYear = parseInt($('#year').html());


    events = events.filter(e => (e.month === curMonth && e.year === curYear));

    for (let ev of events) {

        // set the current event
        $('.day').each(function(i, el) {
            let date = parseInt(el.innerHTML);
            
            if (ev.date === date) {
                let p = document.createElement("p");
                p.innerHTML = ev.name;
                p.style.fontSize = '.8em';
                el.append(p);
                return false;
            }
        }) 
    }
}


// returns the date of the top left square for any given date and day
function getStartDate(date, day) {
    let result = (date % 7) - day;

    if (!day) {
        while (result>1) {
            result -= 7;
        }
    }
    
    return result;
}


function checkLeapYear(year) {
    if (!(year % 4)) {
        dCount[1] = 29;
    }
    else {
        dCount[1] = 28;
    }
}


// Prints the actual dates to the calendar
function printDays(i, month) {
    const prevMonth = (month-1 < 0) ? 11 : month-1;
    const nextMonth = (month+1 > 11) ? 0 : month+1;
    const year = parseInt($('#year').html());

    
    checkLeapYear();

    if (i < 1) {
        return `<b 
                class='day text-muted'
                style="background-color: ${((dCount[prevMonth] + i) === c_date && prevMonth === c_month && year === c_year) ? 'aqua' : ''}"
                >
                    ${dCount[((month-1 < 0) ? 11 : month-1)] + i}
                </b>`;
    }
    else if (i > dCount[month]) {
        return `<b 
                class='day text-muted'
                style="background-color: ${((i - dCount[month]) === c_date && nextMonth === c_month && year === c_year) ? 'aqua' : ''}"
                >
                    ${i - dCount[month]}
                </b>`;
    }
    else {
        return `<b 
                class='day'
                style="background-color: ${(i === c_date && month === c_month && year === c_year) ? 'aqua' : ''}"
                >
                    ${i}
                </b>`;
    }
}




// Sets up the boxes of the calendar and its initial values
function constructDays() {
    let i = getStartDate(c_date, c_day);

    let html = ``;
    for (let r = 0; r < 6; r++) {
        html += `<div class="row no-gutters">`;
        for (let c = 0; c < 7; c++) {
            html += `
                <div class="col">
                    <div class='dayContainer text-left' style="width:100%;height:0;padding-bottom:100%;border:1px solid white;">
                    </div>
                </div>`
                i++;
        }
        html += `</div>`;
    }
    return html;
}




// Changes all dates to reflect the next month
function getCurrentMonth() {    
    let start = getStartDate(c_date, c_day);


    $('#month').html(months[c_month]);

    $('.dayContainer').each(function(i, e) {
        e.innerHTML = printDays(start, c_month);
        start++;
    })

    setEvents(testEvents);
}



// Changes all dates to reflect the next month
function getNextMonth() {
    let month = months.indexOf($('#month').html()) + 1;
    let date = $('.day:last').html();
    
    if (month > 11) {
        month = 0;
        $('#year').html(parseInt($('#year').html()) + 1);
    }

    date++;
    date = date % dCount[((month-1 < 0) ? 11 : month-1)];
    
    let start = getStartDate(date, 0);

    console.log(month, date, start);


    $('#month').html(months[month]);

    $('.dayContainer').each(function(i, e) {
        e.innerHTML = printDays(start, month);
        start++;
    })

    setEvents(testEvents);

}


// Changes all dates to reflect the previous month
function getPrevMonth() {
    let month = months.indexOf($('#month').html()) - 1;
    let date = $('.day:first').html();
    

    if (month < 0) {
        month = 11;
        $('#year').html(parseInt($('#year').html()) - 1);
    }


    date--;
    if (date < 1) {
        date = dCount[month];
    }
    
    let start = getStartDate(date, 6);

    console.log(month, date, start);


    $('#month').html(months[month]);

    $('.dayContainer').each(function(i, e) {
        e.innerHTML = printDays(start, month);
        start++;
    })
    
    setEvents(testEvents);
    
}



// Sets the innerHTML of the par element
function Calendar(par) {
    $(`#${par}`).append(  `
        <div class="col-md border border-primary rounded text-center xs-col-12 md-col-6" style="margin:5vw;min-width:30px;">
            <div class="row no-gutters">
                <div class="col">
                    <button id="prevMonth" class="btn" ><b>&lt</b></button>
                </div>
                <div class="col">
                    <h4 id="year" >${c_year}</h4>
                </div>
                <div class="col">
                    <h4 id="month" ></h4>
                </div>
                 <div class="col">
                    <button id="nextMonth" class="btn" ><b>&gt</b></button>
                </div>
            </div>
            <div class="row no-gutters" id="days">
                <div class="col" ><h6 >Sun</h6></div>
                <div class="col" ><h6 >Mon</h6></div>
                <div class="col" ><h6 >Tues</h6></div>
                <div class="col" ><h6 >Wed</h6></div>
                <div class="col" ><h6 >Thu</h6></div>
                <div class="col" ><h6 >Fri</h6></div>
                <div class="col" ><h6 >Sat</h6></div>
            </div>
            ${constructDays()}
        </div>
    `)

    getCurrentMonth();

    $('#prevMonth').click(getPrevMonth);
    $('#nextMonth').click(getNextMonth);
}


export { Calendar }