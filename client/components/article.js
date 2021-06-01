function article({title, img, description, price}) {
    
    return (`
    <div class='col-sm'>
        <h4>${title}</h4>
        <img id="img" style="width:200px;height:200px;cursor:pointer;" class='img-thumbnail' src=${img} alt='img not found...'/>
        <p>${description}</p>
        <p>${price}</p>    
    </div>
    `);
}

export {article}