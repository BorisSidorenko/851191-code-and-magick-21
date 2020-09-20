'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_COLOR = '#fff';
const SHADOW_OFFSET = 10;
const SHADOW_RGBA = 'rgba(0, 0, 0,0.7)';
const GAP = 50;
const FONT_WIDTH = 40;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const MAIN_BAR_COLOR = 'rgba(255, 0, 0, 1)';
const TITLE_X_GAP = 25;
const TITLE_Y_GAP = 30;
const TITLE_COLOR = '#000';
const TITLE_FONT = '16px PT Mono';

const drawCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const writeTitle = (ctx, color, font, firstLine, secondLine) => {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(firstLine, CLOUD_X + TITLE_X_GAP, CLOUD_Y + TITLE_Y_GAP);
  ctx.fillText(secondLine, CLOUD_X + TITLE_X_GAP, CLOUD_Y + TITLE_Y_GAP + TITLE_Y_GAP / 2);
};

const writeScore = (ctx, times, color) => {
  for (let i = 0; i < times.length; i++) {
    ctx.fillStyle = color;
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (GAP + FONT_WIDTH) * i, GAP + TITLE_Y_GAP);
  }
};

const getMaxElement = (arr) => arr.length > 0 ? arr.sort()[arr.length - 1] : [4, 3, 2, 1];

window.renderStatistics = (ctx, players, times) => {
  drawCloud(
      ctx,
      CLOUD_X + SHADOW_OFFSET,
      CLOUD_Y + SHADOW_OFFSET,
      SHADOW_RGBA
  );
  drawCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_COLOR
  );

  writeTitle(
      ctx,
      TITLE_COLOR,
      TITLE_FONT,
      'Ура вы победили!',
      'Список результатов: '
  );

  let maxTime = getMaxElement(times);

  writeScore(
      ctx,
      times,
      TITLE_COLOR
  );

  let getBarColor = (player) => player === 'Вы' ? MAIN_BAR_COLOR : 'hsl(240, ' + getRandomSaturate() + ', 50%)';
  let getRandomSaturate = () => Math.floor(Math.random() * 101) + '%';

  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = TITLE_COLOR;
    ctx.fillText(
        players[i],
        CLOUD_X + GAP + (GAP + FONT_WIDTH) * i,
        CLOUD_HEIGHT - CLOUD_Y
    );
    ctx.fillStyle = getBarColor(players[i]);
    ctx.fillRect(
        CLOUD_X + GAP + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + TITLE_Y_GAP + GAP + BAR_HEIGHT,
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) * -1 / maxTime
    );
  }
};
