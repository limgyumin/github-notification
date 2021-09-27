const colors = {
  bgWhite: "#FFF",
  bgGray: "#FBFBFB",
  bgGray1: "#CFCFCF",
  bgLGray: "#EBEBEB",
  bgBlack: "#1D1D1D",

  bdGray: "#E8E8E8",
  bdGray1: "#E1E1E1",

  ftWhite: "#FFF",
  ftBlack: "#000",
  ftGray: "#727272",
  ftLGray: "#9F9F9F",
};

const sizes = {
  mobile: 580,
  tablet: 768,
  smallDesktop: 1044,
  desktop: 1284,
};

type Media = { [key in keyof typeof sizes]: string };

const medias: Media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    acc[label] = `@media only screen and (max-width: ${sizes[label]}px)`;
    return acc;
  },
  {} as Media
);

export const theme = {
  colors,
  medias,
};

export type Theme = typeof theme;
