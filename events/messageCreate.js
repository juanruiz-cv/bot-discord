module.exports = async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("-")) return;

  const args = message.content.slice(1).split(" ")[0];

  try {
    const command = require(`../commands/${args}`);
    command.run(message);
  } catch (error) {
    console.log(
      `Ha ocurrido un error al utilizar el comando -${args}`,
      error.message
    );
  }
};
