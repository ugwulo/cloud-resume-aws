// visit count implementation

window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

// API endpoint
const liveFunctionApi = 'https://3b7gt1gdi3.execute-api.us-east-1.amazonaws.com/prod';

const getVisitCount = () => {
    fetch(liveFunctionApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
            console.log("Webpage called function API.");
            const count = response.count;
            document.getElementById("counter").innerText = count;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}