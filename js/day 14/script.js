function fetchPlaceholderData() {
    const url = 'https://data.covid19india.org/state_district_wise.json';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const prettyResponse = JSON.stringify(data, null, 2);
            document.getElementById('result').textContent = prettyResponse;
            console.log(prettyResponse);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
fetchPlaceholderData();