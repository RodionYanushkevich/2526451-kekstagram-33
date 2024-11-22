const ChromeEffect = {
  effect: (value) => `grayscale(${value})`,
  range: {
    min: 0,
    max: 1,
  }
};
const SepiaEffect = {
  effect:(value) => `sepia(${value})`,
  range: {
    min: 0,
    max: 1,
  }
};

const MarvinEffect = {
  effect:(value) => `invert(${value}%)`,
  range: {
    min: 0,
    max: 100,
  },
  step: 1
};


const PhobosEffect = {
  effect:(value) => `blur(${value}px)`,
  range: {
    min: 0,
    max: 3,
  }
};

const HeatEffect = {
  effect:(value) => `brightness(${value})`,
  range: {
    min: 1,
    max: 3,
  }
};

const EFFECTS = {
  chrome: ChromeEffect,
  sepia: SepiaEffect,
  marvin: MarvinEffect,
  phobos: PhobosEffect,
  heat: HeatEffect,
};

export {EFFECTS};
