export type Post = {
  frontmatter: {
    title: string;
    author: string;
    description: string;
    pubDate: Date;
    image: {
      url: string;
      alt: string;
    };
    tags?: string[];
  };
  url: string;
};