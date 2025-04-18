export default (timestam?: number): number =>
  Math.floor((timestam || Date.now()) / 1000);
