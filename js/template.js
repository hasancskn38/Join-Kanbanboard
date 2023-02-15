function toDoTemplate(i, test) {
    return `
    <div id="stage-container-${i}" class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p class="grey">${test.title}</p>
    <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
    <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
    </div>
    <div class="contact-initials">
    </div>
    </div>
    `
}

function progressTemplate(i, test) {
    return `<div id="stage-container-${i}" class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p class="grey">${test.title}</p>
    <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
    <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
    </div>
    <div class="contact-initials">
    </div></div>`
}

function feedBackTemplate(i, test) {
    return `<div id="stage-container-${i}" class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p class="grey">${test.title}</p>
    <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
    <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
    </div>
    <div class="contact-initials">
    </div></div>`
}

function doneTemplate(i, test) {
    return`<div id="stage-container-${i}" class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.title}</h4>
    <p class="grey">${test.description}</p>
    <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
    <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
    </div>
    <div class="contact-initials">
    </div></div>`
}