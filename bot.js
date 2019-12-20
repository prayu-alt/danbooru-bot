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
    } else if (primaryCommand == "kiss") {
        kissCommand(arguments, receivedMessage)
    } else if (primaryCommand == "hug") {
        hugCommand(arguments, receivedMessage)
    } else if (primaryCommand == "slap") {
        slapCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `.help`")
    }
}

function helpCommand(arguments, receivedMessage) {
  receivedMessage.channel.send("Hi! .pic [tags]\n.hug [discord user]\n.sla\nCurrently the command defaults to using rating:safe and is random without specifiying any arguments.\nThere are three ratings: rating:e, rating:q, and rating:s.\nExample tags: 1girl, solo, long_hair, highres, absurdres, smile, short_hair.\nYou can use the order tag to get different results (order:rank).\nFull-tag list is here: https://danbooru.donmai.us/tags")
}

function picCommand(arguments, receivedMessage) {
        const booru = new Danbooru()


        if(arguments.includes("rating:e") || arguments.includes("rating:explicit")) {
          receivedMessage.channel.send("You're dirty... >:(")
        } else if(!(arguments.includes("rating:e") || arguments.includes("rating:q") || arguments.includes("rating:s"))){
          arguments[arguments.length] = "rating:s";
        }

        console.log(arguments);
        booru.posts({ tags: arguments.join(' '), random: true}).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]
            const url = booru.url(post.file_url)
            // Download post image using node's https and fs libraries

            console.log(url)
            if (url.pathname === "/") {
              throw "is Empty";
            }
            if (arguments.includes("rating:e") || arguments.includes("rating:explicit") || arguments.includes("rating:q") || arguments.includes("rating:questionable")) {
              receivedMessage.channel.send({
                files: [{
                attachment: url.toString(),
                name: 'SPOILER_NAME.jpg'
                }]
              });
            } else {
              receivedMessage.channel.send({
                file: url.toString(), // Or replace with FileOptions object
              });
            }

        }).catch(function (err) {
          receivedMessage.channel.send("Either there were no results, or the tags you used were incorrect.")
        });
}

function kissCommand(arguments, receivedMessage) {
        const booru = new Danbooru()

        booru.posts({ tags: 'incoming_kiss solo', random: true}).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]
            const url = booru.url(post.file_url)
            // Download post image using node's https and fs libraries
            receivedMessage.channel.send('You were kissed ' + arguments[0] + '!');
              receivedMessage.channel.send({
                file: url.toString(), // Or replace with FileOptions object
              });
        }).catch(function (err) {
          receivedMessage.channel.send("Either there were no results, or the tags you used were incorrect.")
        });
}

function hugCommand(arguments, receivedMessage) {
        const booru = new Danbooru()

        booru.posts({ tags: 'hug 2girls', random: true}).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]
            const url = booru.url(post.file_url)
            // Download post image using node's https and fs libraries
            receivedMessage.channel.send('You were hugged ' + arguments[0] + '!');
              receivedMessage.channel.send({
                file: url.toString(), // Or replace with FileOptions object
              });
        }).catch(function (err) {
          receivedMessage.channel.send("Either there were no results, or the tags you used were incorrect.")
        });
}

function slapCommand(arguments, receivedMessage) {
        const booru = new Danbooru()

        booru.posts({ tags: 'slap gif', random: true}).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]
            const url = booru.url(post.file_url)
            // Download post image using node's https and fs libraries
            receivedMessage.channel.send('You were slapped ' + arguments[0] + '!');
              receivedMessage.channel.send({
                file: url.toString(), // Or replace with FileOptions object
              });
        }).catch(function (err) {
          receivedMessage.channel.send("Either there were no results, or the tags you used were incorrect.")
        });
}
//client.user.setActivity('Type .help!', {type: PLAYING});
client.login(process.env.SECRET_TOKEN);
