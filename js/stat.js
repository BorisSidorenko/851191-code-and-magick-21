'use strict';

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  X_NAME: 260,
  COLOR: '#fff'
};

const Shadow = {
  X_OFFSET: Cloud.X + 10,
  Y_OFFSET: Cloud.Y + 10,
  COLOR: 'rgba(0, 0, 0,0.7)'
};

const Bar = {
  WIDTH: 40,
  HEIGHT: 150,
  COLOR: 'rgba(255, 0, 0, 1)',
  X: 90,
  Y: 240
};

const Title = {
  X_FIRST_LINE: Cloud.X + 25,
  Y_FIRST_LINE: Cloud.Y + 30,
  Y_SECOND_LINE: Cloud.Y + 45,
  Y_GAP: 30,
  SECOND_LINE_GAP: 15,
  COLOR: '#000',
  FONT: '16px PT Mono',
  FIRST_LINE: 'Ура вы победили!',
  SECOND_LINE: 'Список результатов: '
};

const GAP = 50;
const FONT_WIDTH = 40;
const FONT_GAP = GAP + FONT_WIDTH;
const PLAYER_NAME = 'Вы';
const MAX_SATURATE_PERCENTAGE = 100;
const STATISTICS_GAP = Cloud.X + GAP;
const Y_SCORE = GAP + Title.Y_GAP;

const drawCloud = (ctx) => {
  renderCloud(
      ctx,
      Shadow.X_OFFSET,
      Shadow.Y_OFFSET,
      Shadow.COLOR
  );

  renderCloud(
      ctx,
      Cloud.X,
      Cloud.Y,
      Cloud.COLOR
  );

  const options = {
    color: Title.COLOR,
    font: Title.FONT,
    firstLine: Title.FIRST_LINE,
    secondLine: Title.SECOND_LINE
  };

  writeTitle(
      ctx,
      options
  );
};

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

const writeTitle = (ctx, {color, font, firstLine, secondLine}) => {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(firstLine, Title.X_FIRST_LINE, Title.Y_FIRST_LINE);
  ctx.fillText(secondLine, Title.X_FIRST_LINE, Title.Y_SECOND_LINE);
};

const writeScore = (ctx, times, color) => {
  times.forEach((time, index) => {
    ctx.fillStyle = color;
    ctx.fillText(Math.round(time), STATISTICS_GAP + FONT_GAP * index, Y_SCORE);
  });
};

const writeNameAndBar = (ctx, players, times) => {
  const maxTime = getMaxElement(times);

  players.forEach((player, index) => {
    ctx.fillStyle = Title.COLOR;
    ctx.fillText(
        player,
        STATISTICS_GAP + FONT_GAP * index,
        Cloud.X_NAME
    );

    ctx.fillStyle = getBarColor(player);
    ctx.fillRect(
        STATISTICS_GAP + Bar.X * index,
        Bar.Y,
        Bar.WIDTH,
        (Bar.HEIGHT * times[index]) * -1 / maxTime
    );
  });
};

const drawStatistics = (ctx, players, times) => {
  writeScore(
      ctx,
      times,
      Title.COLOR
  );

  writeNameAndBar(
      ctx,
      players,
      times
  );
};

const getMaxElement = (arr) => {
  const [first, second, third, fourth] = arr.length > 0 ? arr : [1, 2, 3, 4];
  return Math.max(first, second, third, fourth);
};

const getBarColor = (player) => {
  return player === PLAYER_NAME ? Bar.COLOR : getRandomBarColor();
};

const getRandomBarColor = () => {
  return 'hsl(240, ' + Math.floor(Math.random() * MAX_SATURATE_PERCENTAGE) + '%' + ', 50%)';
};

window.renderStatistics = (ctx, players, times) => {
  drawCloud(ctx);
  drawStatistics(
      ctx,
      players,
      times
  );
};
