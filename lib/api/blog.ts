import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Article } from "../types";

const postsDirectory = join(process.cwd(), "content");

export function getPostDirs() {
  return fs.readdirSync(postsDirectory, { withFileTypes: true });
}

export function getPostBySlug(slug: string | fs.Dirent, fields = []): Article {
  const dirPath = join(postsDirectory, typeof slug === "string" ? slug : slug.name);

  // each "slug" is the name of a directory with an index.md and potentially a decklist.txt
  // we fetch the contents of each directory defined by "slug"
  const contents = fs.readdirSync(dirPath);

  // we then filter the contents to only include the markdown file
  // get the full path to the markdown file
  const fullPath = join(dirPath, "index.md");

  // read the markdown file as a string
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const hasDecklist = contents.find((file) => file === "decklist.txt");
  let decklist = null;
  if (hasDecklist) {
    decklist = fs.readFileSync(join(dirPath, "decklist.txt"), "utf8");
  }


  // use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  const article = {};

  fields.forEach((field) => {
    if (field === "slug") {
      article[field] = typeof slug === "string" ? slug : slug.name;
    }
    if (field === "content") {
      article[field] = content;
    }

    if (data[field]) {
      article[field] = data[field];
    }
  });

  if (decklist) {
    article.decklist = decklist;
  }

  return article as Article;
}

export function getAllPosts(fields = []): Article[] {
  const dirs = getPostDirs();
  const posts = dirs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
