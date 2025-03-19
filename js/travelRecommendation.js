const URL_PREFIX = '/jslab';

const EMAIL_TO_SEND_TO = "someone@travelbloom.abc"

function searchTravelRecommendation() {
    let searchText = document.getElementById('searchBox').value;
    console.log('Search text is ==>' + searchText + '<==');
    if (isValidString(searchText)) {     
        searchText = searchText.toLowerCase();

        fetch('https:' + URL_PREFIX + '/travel_recommendation_api.json')
            .then(response => {
                if (!response.ok) {
                    console.error('Throwing exception');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => processSearchResults(searchText, data))
            .catch(error => console.error('There was a problem with the fetch operation:', error)
        );
    }
}

function processSearchResults(searchText, data) {
    console.log('processSearchResults called');
    console.log('searchText==>' + searchText + '<==');
    console.log('JSON Response==>' + JSON.stringify(data) + '<==');

    let container = document.getElementById("explore-myright");
 
    container.style.visibility = 'visible';
    container.style.backgroundColor = "white";
    container.style.color = "black";
    container.style.textAlign = "center";

    const result = getRecommendationForSearchCriteria(searchText, data);

    /*
    container.innerHTML = "<p><img class='stockimage' src='./img/BrazilStatue.jpg' /></p>";
    container.innerHTML += "<p class='city-name'>Sydney Australia</p>";
    container.innerHTML += "<p class='city-description'>A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge.</p>";
    container.innerHTML += "<p class='visit-btn-container'><button class='visit-btn'>Visit</button></p>";
    */

    if (result !== null 
        && result.length > 0) {
        let currTime = "";
        container.innerHTML = "";
        result.forEach(element => {
          console.log(
            `Name: ${element.name} `
                + `ImageUrl: ${element.imageUrl} `
                + `Timezone: ${element.timezone} `
                + `Description: ${element.description} `
          );

          currTime = getTime(element.timezone);
          container.innerHTML += `<p><img class='stockimage' src='${element.imageUrl}' /></p>`;
          container.innerHTML += `<p class='city-name'>${element.name}</p>`;
          container.innerHTML += `<p class='time'>Time at Destination: ${currTime}</p>`
          container.innerHTML += `<p class='city-description'>${element.description}</p>`;
          container.innerHTML += `<p class='visit-btn-container'><button class='visit-btn'>Visit</button></p>`;
          container.innerHTML += '<div class="spacer2"></div>';
        });
    } 
    else {
        console.log("Nothing found for search results");
        container.innerHTML = "Nothing found.";
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

function getTime(timezoneStr) {
    const options = {
        timeZone: timezoneStr,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    //document.getElementById("time").textContent = 
    var currTimeInCountry = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${timezoneStr} is ${currTimeInCountry}`);
    return currTimeInCountry;
}

function getRecommendationForSearchCriteria(searchCriteria, data) {
    if (data[searchCriteria]) {
      return data[searchCriteria].map(item => {
        if (searchCriteria === "countries") {
          return item.cities.map(city => ({
            name: city.name,
            timezone: city.timezone,
            imageUrl: city.imageUrl,
            description: city.description
          }));
        }
        
        return {
          name: item.name,
          timezone: item.timezone,
          imageUrl: item.imageUrl,
          description: item.description
        };
      }).flat(); 
    } 
    
    return null;
  }
  