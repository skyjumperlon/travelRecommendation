const URL_PREFIX = '/jslab';

const EMAIL_TO_SEND_TO = "someone@travelbloom.abc"

function searchTravelRecommendation() {
    let searchText = document.getElementById('searchBox').value;
    console.log('Search text is ==>' + searchText + '<==');
    if (isValidString(searchText)) {
        fetch('https:' + URL_PREFIX + '/travel_recommendation_api.json')
            .then(response => {
                if (!response.ok) {
                    console.error('Throwing exception');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('JSON Response==>' + JSON.stringify(data) + '<==');

                let container = document.getElementById("explore-myright");
                    // Set background color to white
                    container.style.visibility = 'visible';
                container.style.backgroundColor = "white";
                container.style.color = "black";
                container.style.textAlign = "center";
    
                // Add some text inside the container
                container.innerHTML = "<p><img class='stockimage' src='./img/BrazilStatue.jpg' /></p>";
                container.innerHTML += "<p class='city-name'>Sydney Australia</p>";
                container.innerHTML += "<p class='city-description'>A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge.</p>";
                container.innerHTML += "<p class='visit-btn-container'><button class='visit-btn'>Visit</button></p>";

                //container.innerHTML += "<p><img src='./img/SydneyBridge.jpg' width='800' height='600' /></p>";
                //container.innerHTML += "<p><img src='./img/SydneyBridge.jpg' width='800' heigh='600' /></p>";

                //container.style.padding = "2px"; // Adds some spacing
                //container.style.border = "1px solid #ccc"; // Light border for visibility
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error)
        );
    }
}

function resetSearch() {
    console.log("Reset invoked.");
    let container = document.getElementById("explore-myright");
    container.style.visibility = 'hidden';

    const searchText = document.getElementById('searchBox');
    searchText.value = '';
}

function isValidString(str) {
    return str !== null && str.trim() !== "";
}

function sendEmail() {
    let nameFrom = document.getElementById('name').value;
    let emailFrom = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    if (isValidString(nameFrom)
        && isValidString(emailFrom)
        && isValidString(message)) {
        console.log("Attempting to submit form and send email");
        window.location.href = `mailto:${EMAIL_TO_SEND_TO}?subject=Help&nameFrom=${nameFrom}&emailFrom=${emailFrom}&message=${message}`;
        console.log("Email sent!");
    } 
    else {
        alert('Please enter information into the form');
    }  

    return false;  // Do not actually submit the page
}

function showTime() {
    const options = {
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    //document.getElementById("time").textContent = 
    new Date().toLocaleTimeString('en-US', options);
}