class Message{
    constructor(username, time, server, channel, message){
        this.username = username;
        this.time = time;
        this.server = server;
        this.channel = channel;
        this.message = message;
    }
}

var allMessagesList = [];
var serverList = [];

function collectAllMessages(allMessages) {

    for(var i = 0; i < allMessages.length; i++)
    {
        const tempMessage = allMessages[i];
        const username = tempMessage.querySelector(".card-title a").innerHTML;
        const time = tempMessage.querySelector("#card-time").innerHTML;
        const server = tempMessage.querySelector("#card-server").innerHTML;
        const channel = tempMessage.querySelector("#card-channel").innerHTML;
        const text = tempMessage.querySelector(".card-text").innerHTML;
        allMessagesList.push(new Message(username, time, server, channel, text));
    }
}

function serverFilter(allMessages) {
    
}

//this function gatters the stock data and formates it into objects.
collectAllMessages(document.querySelectorAll("#messages .card"));