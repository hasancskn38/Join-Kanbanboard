// Generate Greeting Based on real world time
setInterval(function() {
    let date = new Date();
    let hours = date.getHours();
    // then we declare a var named timeOfDay
    let timeOfDay;
    if (hours < 12) {
        timeOfDay = 'Good Morning !';
    } else if(hours >= 12 && hours < 17) {
        timeOfDay = 'Good afternoon !';
    } else {
        timeOfDay = 'Good evening !';
    }
    document.getElementById('greeting').innerHTML = timeOfDay ;
    //TODO date.toLocaleDateString(), to eventually display the date, discuss with team !
}, 1000);

// Implement Sidebar
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

