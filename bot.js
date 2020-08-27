const Discord = require('discord.js')
const client = new Discord.Client()
const Booru = require('booru')

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

  switch (primaryCommand) {
    case "help":
      helpCommand(arguments, receivedMessage)
      break;
    case "pic":
      picCommand(arguments, receivedMessage)
      break;
    case "picq":
      picqCommand(arguments, receivedMessage)
      break;
    case "pice":
      piceCommand(arguments, receivedMessage)
      break;
    default:
      receivedMessage.channel.send("I don't understand the command. Try `.help`")
  }
  /*
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
  }*/
}

function helpCommand(arguments, receivedMessage) {
  receivedMessage.channel.send("Hi! I'm being worked on.")
}

function picCommand(arguments, receivedMessage) {

  var amount = arguments[arguments.length - 1]
  arguments.pop()

  arguments[arguments.length] = "rating:s";

  Booru.search('yandere', arguments.join(' '), {
      limit: 10,
      random: true
    })
    .then(posts => {
      for (let post of posts) {
        console.log(post.fileUrl, post.postView)

        receivedMessage.channel.send({
          file: post.fileUrl.toString(), // Or replace with FileOptions object
        });

      }
    }).catch(err => {
        console.error(err)
    })
}

function picqCommand(arguments, receivedMessage) {

  var amount = arguments[arguments.length - 1]
  arguments.pop()

  arguments[arguments.length] = "rating:q";

  Booru.search('yandere', arguments.join(' '), {
      limit: 10,
      random: true
    })
    .then(posts => {
      for (let post of posts) {
        console.log(post)

        receivedMessage.channel.send({
          files: [{
            attachment: post.fileUrl.toString(),
            name: 'SPOILER_NAME.jpg'
          }]
        });

      }
    }).catch(err => {
        console.error(err)
    })
}

function piceCommand(arguments, receivedMessage) {

  var amount = arguments[arguments.length - 1]
  arguments.pop()

  arguments[arguments.length] = "rating:e";

  Booru.search('yandere', arguments.join(' '), {
      limit: 10,
      random: true
    })
    .then(posts => {
      for (let post of posts) {
        console.log(post.fileUrl, post.postView)

        receivedMessage.channel.send({
          files: [{
            attachment: post.fileUrl.toString(),
            name: 'SPOILER_NAME.jpg'
          }]
        });

      }
    }).catch(err => {
        console.error(err)
    })
}

function kissCommand(arguments, receivedMessage) {
  const booru = new Danbooru()

  booru.posts({
    tags: 'incoming_kiss solo',
    random: true
  }).then(posts => {
    // Select a random post from posts array
    const index = Math.floor(Math.random() * posts.length)
    const post = posts[index]
    const url = booru.url(post.file_url)
    // Download post image using node's https and fs libraries
    receivedMessage.channel.send('You were kissed ' + arguments[0] + '!');
    receivedMessage.channel.send({
      file: url.toString(), // Or replace with FileOptions object
    });
  }).catch(function(err) {
    receivedMessage.channel.send("Either there were no results, or the tags you used were incorrect.")
  });
}

function hugCommand(arguments, receivedMessage) {
  const booru = new Danbooru()

  booru.posts({
    tags: 'hug 2girls',
    random: true
  }).then(posts => {
    // Select a random post from posts array
    const index = Math.floor(Math.random() * posts.length)
    const post = posts[index]
    const url = booru.url(post.file_url)
    // Download post image using node's https and fs libraries
    receivedMessage.channel.send('You were hugged ' + arguments[0] + '!');
    receivedMessage.channel.send({
      file: url.toString(), // Or replace with FileOptions object
    });
  }).catch(function(err) {
    receivedMessage.channel.send("Either there were no results, or the tags you used were incorrect.")
  });
}

function slapCommand(arguments, receivedMessage) {
  const booru = new Danbooru()

  booru.posts({
    tags: 'slap gif',
    random: true
  }).then(posts => {
    // Select a random post from posts array
    const index = Math.floor(Math.random() * posts.length)
    const post = posts[index]
    const url = booru.url(post.file_url)
    // Download post image using node's https and fs libraries
    receivedMessage.channel.send('You were slapped ' + arguments[0] + '!');
    receivedMessage.channel.send({
      file: url.toString(), // Or replace with FileOptions object
    });
  }).catch(function(err) {
    receivedMessage.channel.send("Either there were no results, or the tags you used were incorrect.")
  });
}
//client.user.setActivity('Type .help!', {type: PLAYING});
//process.env.SECRET_TOKEN
client.login("Mjk4MTYxNTMxNTUwNTY0MzYz.XfiSMA.HCgUV9pXqBgi48PRfYtof8yIfLk");
