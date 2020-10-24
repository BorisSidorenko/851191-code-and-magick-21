'use strict';

const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
const FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

window.colorize = {
  getCoatColor: () => COAT_COLORS[window.util.getRandomNumberMaxToMin(COAT_COLORS.length - 1)],
  getEyesColor: () => EYES_COLORS[window.util.getRandomNumberMaxToMin(EYES_COLORS.length - 1)],
  getFireballColor: () => FIREBALL_COLORS[window.util.getRandomNumberMaxToMin(FIREBALL_COLORS.length - 1)]
};
