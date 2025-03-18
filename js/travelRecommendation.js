const URL_PREFIX = '/jslab';

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
                container.style.backgroundColor = "white";
                container.style.color = "black";
    
                // Add some text inside the container
                container.innerHTML = "<p><img src='./img/BrazilStatue.jpg' width='100%' height='100%' /></p>";
                container.innerHTML += "<p><img src='./img/SydneyBridge.jpg' width='30%' height='25%' /></p>";
                container.innerHTML += "<p><img src='./img/SydneyBridge.jpg' style='max-width: 100%; height: auto;' /></p>";

                container.style.padding = "2px"; // Adds some spacing
                container.style.border = "1px solid #ccc"; // Light border for visibility
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error)
        );
    }


}

function isValidString(str) {
    return str !== null && str.trim() !== "";
}
