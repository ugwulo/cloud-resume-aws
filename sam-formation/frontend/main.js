// visit count frontend implementation

window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
    // callVisitCount(10);
});


// function to test email and Slack notifications through cloudwatch
function callVisitCount(times) {
    for (let i = 0; i < times; i++) {
        getVisitCount();
    }
}

`
API endpoint & key
I know I probably need a reverse proxy to foward my API credentials, but this is simply for learning purposes,
Reverse proxy servers are beyond the scope of my implementation, since I'm just using an S3 bucket.
`
const apiKey = "U9heHmndGc8rulRfKFeQm5oS2kwQILPb3PMARYb3"; // don't worry, this is just for tests :)
const visitCountApi = "https://0ry2i107ch.execute-api.us-east-1.amazonaws.com/prod/count?user=app";
// const apiKey = process.env.API_KEY;

const getVisitCount = () => {
    fetch(visitCountApi, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey
        }    
      })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Webpage called function API.");
            const count = data.count;
            document.getElementById("counter").innerText = count;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}