// visit count frontend implementation

window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
    // callVisitCount(10);
});


// function to test email and Slack notifications through cloudwatch alarm
function callVisitCount(times) {
    for (let i = 0; i < times; i++) {
        getVisitCount();
    }
}

const getVisits = "https://r41raloetk.execute-api.us-east-1.amazonaws.com/Prod/get"
const putVisitCount = "https://r41raloetk.execute-api.us-east-1.amazonaws.com/Prod/put"

// update dynamodb and get the item count
const getVisitCount = () => {
    fetch(putVisitCount)
        .then(() => fetch(getVisits, {
        method: 'GET'
      }))
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