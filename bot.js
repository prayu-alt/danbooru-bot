const Discord = require('discord.js')
const client = new Discord.Client()
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
  receivedMessage.channel.send("Hi! Use: .pic [tags]\nExample tags: 1girl, solo, long_hair, highres, absurdres, smile, short_hair.\nFull-tag list is here: https://danbooru.donmai.us/tags")
}

function picCommand(arguments, receivedMessage) {
        const booru = new Danbooru()
        console.log(arguments);

        if(arguments.includes("rating:e")) {
          receivedMessage.channel.send("You're dirty... >:(")
        } else if (arguments.includes("rating:e") || arguments.includes("rating:e") || arguments.includes("rating:s")) {

        }
        booru.posts({ tags: arguments.join(' ')}).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]
            const url = booru.url(post.file_url)
            // Download post image using node's https and fs libraries


            if (arguments.includes("rating:e")) {
            receivedMessage.channel.send({
              file: url.toString() // Or replace with FileOptions object
              name: 'SPOILER_badimage.jpg'
            });
          } else {
            receivedMessage.channel.send({
              file: url.toString() // Or replace with FileOptions object
            });
          }

        }).catch(function (err) {
        console.error(err.message);
        });
      }
}

client.login(process.env.SECRET_TOKEN);
client.user.setPresence({ game: { name: '.help', type: 0 } });
