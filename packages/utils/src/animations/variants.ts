export const blurUpFade = {
  initial: {
    opacity: 0,
    filter: 'blur(8px)',
    y: 20,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    y: 20,
  },
};

export const blurFade = {
  initial: {
    opacity: 0,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
  },
};
