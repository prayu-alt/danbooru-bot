const Discord = require('discord.js')
const client = new Discord.Client()
const config =  require('./config.js');
const Danbooru = require('danbooru');

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return;
    }
    if (receivedMessage.content.startsWith(".")) {
        processCommand(receivedMessage)
    }
  })

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "pic") {
        picCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `.help`")
    }
}

function helpCommand(arguments, receivedMessage) {
  receivedMessage.channel.send("I'm a bot made by Evan that posts pictures :)")
}

function picCommand(arguments, receivedMessage) {
        const booru = new Danbooru()
        console.log(arguments);

        booru.posts({ tags: arguments.join(' ')}).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]
            const url = booru.url(post.file_url)
            // Download post image using node's https and fs libraries

            receivedMessage.channel.send({
              file: url.toString() // Or replace with FileOptions object
            });

        }).catch(function (err) {
        console.error(err.message);
        });
}

client.login(process.env.SECRET_TOKEN);
