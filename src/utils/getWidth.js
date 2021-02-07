/* MUI's withWidth HOC is great, but doesn't support server-side rendering. So,
   I had to ditch it & write my own mediocre width handler so that React-Snapshot
   will do its thing. */

/**
 * Window widths
 * @type {widths}
 * @prop {number} 	small 	small width
 * @prop {number} 	medium 	medium width
 * @prop {number} 	large 	large width
 */
export const widths = { small: 0, medium: 768, large: 992 };

/**
 * Gets the window's width.
 * @return {width} a width from {@link widths}
 */
const getWidth = () => {
  let width;
  const largeWidth = 992,
    mediumWidth = 768;

  const innerWidth = window.innerWidth;

  if (innerWidth >= largeWidth) {
    width = widths.large;
  } else if (innerWidth >= mediumWidth) {
    width = widths.medium;
  } else {
    width = widths.small;
  }

  return width;
};

export default getWidth;
