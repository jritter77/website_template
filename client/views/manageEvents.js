import { getAllEvents, addEvent, deleteEvent, editEvent } from '../database.js';
import { Calendar, setEventList, setEvents } from '../components/calendar.js';
import { Modal } from "../components/modal.js";
import { verifySession } from "../sessions.js";

let events = [];



function openNewCalendarEvent() {
    if (this.children[0].children.length > 0) {
        const e = this.children[0].children[0].id;
        $('#newCalendarEventTitle').val(events[e].title);
        $('#newCalendarEventDesc').val(events[e].description);

        $('#modalSubmit').val(events[e].id);

        $('#modalSubmit').off('click');
        $('#modalSubmit').click(editCalendarEvent);
        $('#deleteEventButton').off('click');
        $('#deleteEventButton').click(() => deleteCalendarEvent(events[e].id));
    }   
    else {
        $('#newCalendarEventTitle').val('');
        $('#newCalendarEventDesc').val('');

        $('#modalSubmit').val(this.children[0].id);
    
        $('#modalSubmit').off('click');
        $('#modalSubmit').click(newCalendarEvent);
        $('#deleteEventButton').off('click');
    }
    
}




async function newCalendarEvent(e) {
    e.preventDefault();
    
    const month = $('#month').val();
    const day = this.value;
    const year = $('#year').html();
    
    const title = $('#newCalendarEventTitle').val();
    const desc = $('#newCalendarEventDesc').val();


    if (title && desc) {
        await addEvent(title, month, day, year, desc);
        refreshEvents();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newCalendarEventModal').addClass('was-validated');
    }

}





async function editCalendarEvent(e) {
    e.preventDefault();

    const id = this.value;
    const title = $('#newCalendarEventTitle').val();
    const desc = $('#newCalendarEventDesc').val();


    if (title && desc) {
        await editEvent(id, title, desc);
        refreshEvents();
        $('#exampleModal').modal('hide');
    }
    else {
        $('#newCalendarEventModal').addClass('was-validated');
    }
}


async function deleteCalendarEvent(id) {
    await deleteEvent(id);
    refreshEvents();
    $('#exampleModal').modal('hide');
}


async function refreshEvents() {
    events = await getAllEvents();
    setEventList(events);
    setEvents();
}



async function ManageEvents() {

    events = await getAllEvents();

    $('#app').html('<div class="row" id="calendar"></div>');

    await verifySession();

    // create Modal for newCalendarEvent
    Modal('New Event', newCalendarEventModal, newCalendarEvent);

    
    eventCalendar();
}




async function eventCalendar() {
    setEventList(events);
    Calendar('calendar');
    $('.dayContainer').attr('data-toggle', 'modal');
    $('.dayContainer').attr('data-target', '#exampleModal');
    $('.dayContainer').click(openNewCalendarEvent);
    $('.modal-footer').prepend('<button id="deleteEventButton" class="btn btn-danger">Delete</button>');
}





const newCalendarEventModal = `
    <form id='newCalendarEventModal' class='needs-validation' novalidate>
        <div class='form-group'>
            <label for='newCalendarEventTitle'>Title</label>
            <input type='text' class='form-control' id='newCalendarEventTitle' placeholder='Title' required>
            <div class='invalid-feedback'>
                Please enter a title.
            </div>
        </div>
        <div class='form-group'>
            <label for='newCalendarEventDesc'>Description</label>
            <textarea class='form-control' id='newCalendarEventDesc' rows='3' placeholder='Description of Post.' required></textarea>
            <div class='invalid-feedback'>
                Please enter a description.
            </div>
        </div>
    </form>
    `;

export { ManageEvents };