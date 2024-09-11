const { Client } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mySecret = process.env["TOKEN"];

const client = new Client({ intents: 53608447 });

console.log("Ready Bot!");
fs.readdirSync("./events")
  .filter((filename) => filename.endsWith(".js"))
  .forEach((filename) => {
    try {
      const listener = require(`./events/${filename}`);
      const eventName = path.basename(filename, ".js");
      client.on(eventName, listener);
    } catch (err) {
      console.log("[err] Ha ocurrido un error al cargar un evento", err);
    }
  });

client.login(mySecret);
