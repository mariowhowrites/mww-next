import { useState } from "react";
import { getAllPosts } from "../lib/api";
import Layout from "../components/layout";
import { GetStaticProps, NextPage } from "next";
import { Article } from "../lib/types";
import { BlogIndexCategoryButton } from "../components/BlogIndexCategoryButton";
import { BlogIndexArticle } from "../components/BlogIndexArticle";

type BlogProps = {
  articles: Article[]
}

const Blog: NextPage<BlogProps> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onSelectCategory = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
      return;
    }

    setSelectedCategory(category);
  };

  const categories = Array.from(
    new Set(articles.map(({ category }) => category))
  );

  let filteredArticles;

  if (selectedCategory === null) {
    filteredArticles = articles;
  } else {
    filteredArticles = articles.filter(
      ({ category }) => category === selectedCategory
    );
  }

  return (
    <Layout>
      <div className="text-center mt-12 md:mt-0">
        <h2 className="text-3xl tracking-tight font-extrabold font-heading text-white sm:text-4xl">
          MarioWhoWrites
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-body">
          Words about various subjects
        </p>
      </div>
      <aside id="CategorySelect" className="max-w-lg mx-auto mt-8 mb-12 flex">
        {categories &&
          categories.map((category) => (
            <BlogIndexCategoryButton
              key={category}
              category={category}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
          ))}
      </aside>
      <div className="mt-12 max-w-lg mx-auto flex flex-col">
        {filteredArticles.map((article) => (
          <BlogIndexArticle key={article.title} article={article} />
        ))}
      </div>
    </Layout>
  );
}

export default Blog;

export const getStaticProps: GetStaticProps = async (context) => {
  const articles = getAllPosts([
    "title",
    "description",
    "category",
    "tags",
    "image",
    "date",
    "slug",
  ]);

  return {
    props: { articles },
  };
}