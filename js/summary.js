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