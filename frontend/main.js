// visit count frontend implementation


window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

// API endpoint
const visitCountApi = 'https://0ry2i107ch.execute-api.us-east-1.amazonaws.com/prod/count?user=app'; // retrieve 'app' specific visit count

const getVisitCount = () => {
    fetch(visitCountApi, {
        method: 'GET'
      })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
            console.log("Webpage called function API.");
            const count = response.body.count;
            document.getElementById("counter").innerText = count;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}