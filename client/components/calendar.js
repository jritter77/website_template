const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const d = new Date();

const c_year = d.getFullYear();
const c_month = d.getMonth();
const c_date = d.getDate();
const c_day = d.getDay();



function getStartDate(date, day) {
    let result = (date % 7) - day;

    if (!day) {
        while (result>1) {
            result -= 7;
        }
    }
    
    return result;
}



function printDays(i, month) {
    if (i < 1) {
        return dCount[((month-1 < 0) ? 11 : month-1)] + i;
    }
    else if (i > dCount[month]) {
        return i - dCount[month];
    }
    else {
        return i;
    }
}




function getDays() {
    let i = getStartDate(c_date, c_day);

    let html = ``;
    for (let r = 0; r < 6; r++) {
        html += `<div class="row no-gutters">`;
        for (let c = 0; c < 7; c++) {
            html += `
                <div class="col"><div style="height:10vw;border:1px solid black">
                    <p class="day">${printDays(i, c_month)}</p>
                </div></div>`
                i++;
        }
        html += `</div>`;
    }
    return html;
}






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

    $('.day').each(function(i, e) {
        e.innerHTML = printDays(start, month);
        start++;
    })
}


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

    $('.day').each(function(i, e) {
        e.innerHTML = printDays(start, month);
        start++;
    })
}


function Calendar(par) {
    return  `
        <div class="col" id="calendar">
            <div class="row">
                <div class="col text-center"><h4 id="year">${c_year}</h4></div>
            </div>
            <div class="row">
                <div class="col text-right">
                    <button id="prevMonth" class="btn"><b>&lt</b></button>
                </div>
                <div class="col text-center">
                    <h3 id="month">${months[c_month]}</h3>
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
            ${getDays()}
        </div>
    `
}


export { Calendar, getNextMonth, getPrevMonth }