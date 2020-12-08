var client = null;
var color;
function showMessage(value, user, userColor){
    var newResponse = document.createElement('p');
    newResponse.style.color = userColor;
    newResponse.appendChild(document.createTextNode(generateDate()))
    newResponse.appendChild(document.createTextNode(user));
    newResponse.appendChild(document.createTextNode(": "));
    newResponse.appendChild(document.createTextNode(value));
    var response = document.getElementById("response");
    response.appendChild(newResponse);


}

function connect(){
    client = Stomp.client("ws://localhost:8081/chat");
    color = getRandomColor();
    client.connect({}, function (frame){
        client.subscribe("/topic/messages", function (message){
            showMessage(JSON.parse(message.body).value, JSON.parse(message.body).user, JSON.parse(message.body).userColor)
        });
    })

}

function sendMessage(){
var messageToSend = document.getElementById('messageToSend').value;
    var user = document.getElementById('user').value;
client.send("/app/chat", {}, JSON.stringify({'value': messageToSend, 'user': user, 'userColor': color}));
    var messageToSend = document.getElementById('messageToSend').value = "";
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = ' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+ ' ';
    var datetime = date+time;
    return datetime.toString();
}

document.getElementById('messageToSend').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});