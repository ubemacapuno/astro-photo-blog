import MdxImage from "./MdxImage.astro";

/** To use a custom image component (MdxImage), this mapping is needed for MDX to recognize the component. */
export const components = {
  img: MdxImage,
};

export default components;
