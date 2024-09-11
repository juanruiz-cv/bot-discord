const { GuildMember } = require("discord.js");
const { createCanvas, registerFont, loadImage } = require("canvas");

const defaultIcon = "./assets/images/defaultIcon.jpg";
const backgroundPath = "./assets/images/background.jpg";
const fontPath = "./assets/fonts/NerkoOne_Regular.ttf";
const subTitle = "Bienvenid@ al servidor!";
const radius = 150;

registerFont(fontPath, { family: "NerkoOne" });
/**
 * Retorna un buffer de una imagen de bienvenida
 * @param {GuildMember} member
 */
module.exports = async (member) => {
  const userName = member.user.username;
  const avatar =
    member.user.avatarURL({ size: 256, extension: "png" }) || defaultIcon;

  const canvas = createCanvas(1200, 600);
  const ctx = canvas.getContext("2d");

  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;

  const margin = 20;
  const background = await loadImage(backgroundPath);

  ctx.drawImage(
    background,
    margin,
    margin,
    canvas.width - margin * 2,
    canvas.height - margin * 2
  );

  // dibular nombre de usuario
  ctx.font = "80px NerkoOne";
  ctx.fillStyle = "white";

  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 5;

  const userNameMetrics = ctx.measureText(userName);

  ctx.fillText(
    userName,
    canvas.width / 2 - userNameMetrics.width / 2,
    (canvas.height * 3) / 4
  );

  // dibujar subtitulo
  ctx.font = "50px NerkoOne";
  ctx.fillStyle = "white";

  const subTitleMetrics = ctx.measureText(subTitle);

  ctx.fillText(
    subTitle,
    canvas.width / 2 - subTitleMetrics.width / 2,
    (canvas.height * 3) / 4 + 75
  );

  const avatarImage = await loadImage(avatar);

  // dibujar avatar del usuario
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 15;

  // border
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 3, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // avatar de usuario
  ctx.shadowColor = "transparent";

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 3, radius - 5, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(
    avatarImage,
    canvas.width / 2 - radius - 5,
    canvas.height / 3 - radius - 5,
    radius * 2,
    radius * 2
  );

  return canvas.toBuffer();
};
