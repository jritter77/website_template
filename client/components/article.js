function Article({id, title, img, description, price}) {
    
    return (`
    <div style="margin:2rem;" class='col'>
        <h4>${title}</h4>
        <a href="#details-${id}"><img id="img" style="width:150px;height:150px;" class='img-thumbnail' src=${img} alt='img not found...'/><a>
        <p>${description}</p>
        <p>${price}</p>    
    </div>
    `);
}

function Article_large({id, title, img, description, price}) {
    
    return (`
    <div style="margin:2rem;" class='col'>
        <h1>${title}</h1>
        <a href="#details-${id}"><img id="img" style="width:300px;height:300px;" class='img-thumbnail' src=${img} alt='img not found...'/><a>
        <p>${description}</p>
        <p>${price}</p>    
    </div>
    `);
}

export {Article}