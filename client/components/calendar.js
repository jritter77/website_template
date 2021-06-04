const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const d = new Date();

const c_year = d.getFullYear();
const c_month = d.getMonth();
const c_date = d.getDate();
const c_day = d.getDay();


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


// Prints the actual dates to the calendar
function printDays(i, month) {
    const prevMonth = (month-1 < 0) ? 11 : month-1;
    const nextMonth = (month+1 > 11) ? 0 : month+1;


    if (i < 1) {
        return `<b 
                class='day text-muted'
                style="background-color: ${(i === c_date && prevMonth === c_month) ? 'aqua' : ''}"
                >
                    ${dCount[((month-1 < 0) ? 11 : month-1)] + i}
                </b>`;
    }
    else if (i > dCount[month]) {
        return `<b 
                class='day text-muted'
                style="background-color: ${((i - dCount[month]) === c_date && nextMonth === c_month) ? 'aqua' : ''}"
                >
                    ${i - dCount[month]}
                </b>`;
    }
    else {
        return `<b 
                class='day'
                style="background-color: ${(i === c_date && month === c_month) ? 'aqua' : ''}"
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
                    <div class='dayContainer' style="width:100%;height:0;padding-bottom:100%;border:1px solid black;">
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
}



// Sets the innerHTML of the par element
function Calendar(par) {
    $(`#${par}`).html(  `
        <div class="col">
            <div class="row">
                <div class="col text-center"><h4 id="year">${c_year}</h4></div>
            </div>
            <div class="row">
                <div class="col text-right">
                    <button id="prevMonth" class="btn"><b>&lt</b></button>
                </div>
                <div class="col text-center">
                    <h3 id="month"></h3>
                </div>
                 <div class="col text-left">
                    <button id="nextMonth" class="btn"><b>&gt</b></button>
                </div>
            </div>
            <div class="row no-gutters" id="days">
                <div class="col text-center"><h6>Sun</h6></div>
                <div class="col text-center"><h6>Mon</h6></div>
                <div class="col text-center"><h6>Tues</h6></div>
                <div class="col text-center"><h6>Wed</h6></div>
                <div class="col text-center"><h6>Thu</h6></div>
                <div class="col text-center"><h6>Fri</h6></div>
                <div class="col text-center"><h6>Sat</h6></div>
            </div>
            ${constructDays()}
        </div>
    `)

    getCurrentMonth();

    $('#prevMonth').click(getPrevMonth);
    $('#nextMonth').click(getNextMonth);
}


export { Calendar }