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
            .then(data => console.log('JSON Response==>' + JSON.stringify(data) + '<=='))
            .catch(error => console.error('There was a problem with the fetch operation:', error)
        );
    }
}

function isValidString(str) {
    return str !== null && str.trim() !== "";
}
