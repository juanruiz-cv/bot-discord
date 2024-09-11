const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const generateImage = require("../utils/canvas/welcomeImage");

module.exports = async (member) => {
  const { client } = member;
  const welcomeChannelId = "1095712288331272328";
  const channel = await client.channels.fetch(welcomeChannelId);

  const buffer = await generateImage(member);
  const attachment = new AttachmentBuilder(buffer, {
    name: "generated-image.png",
  });

  const embed = new EmbedBuilder()
    .setTitle(`${member.user.displayName} bienvenido a la comunidad! ✨`)
    .setColor("Blurple")
    .setDescription(`Nos alegramos de recibirte en la comunidad, recuerda ...`)
    .setImage("attachment://generated-image.png");

  channel.send({
    content: `<${member.user}>`,
    embeds: [embed],
    files: [attachment],
  });
};
