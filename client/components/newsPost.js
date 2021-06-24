function newsPost({ id, date, title, description }) {
    return `
    <div class='row no-gutters text-center'>
        <div class='col'>
            <div class='row no-gutters'>
                <div class='col' ><button class='btn btn-danger deletePostButton' value='${id}'>X</button></div>
                <div class='col'><button class='btn btn-primary'>Edit</button></div>
            </div>
        </div>
        <div class='col'>
            <p>${id}</p>
        </div>
        <div class='col'>
            <p>${date}</p>
        </div>
        <div class='col'>
            <p>${title}</p>
        </div>
        <div class='col-4'>
            <p>${description}</p>
        </div>
    </div>
    <hr>
    `
}


export { newsPost }