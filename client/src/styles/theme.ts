const colors = {
  bgWhite: "#FFF",

  ftBlack: "#000",
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
