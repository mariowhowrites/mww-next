import { useState } from "react";
import { getAllPosts } from "../lib/api";
import { getColorFromCategory } from "../utils";
import Layout from "../components/layout";

export default function Blog({ articles }) {
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
          Words about various subjects.
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

export async function getStaticProps() {
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

function BlogIndexCategoryButton({
  category,
  selectedCategory,
  onSelectCategory,
}) {
  const color = getColorFromCategory(category);

  const nonselectedClasses = `bg-${color}-900 text-${color}-400 hover:bg-${color}-700 hover:text-white border-${color}-400`;
  let selectedClasses = `bg-${color}-400 text-white border-${color}-400`;
  if (color === "red") {
    selectedClasses = `bg-${color}-600 text-white border-${color}-400`;
  }

  const baseClasses = "border mr-6 shadow-xl text-3xl px-4 rounded-sm";

  let buttonClasses;

  if (category === selectedCategory) {
    buttonClasses = [baseClasses, selectedClasses].join(" ");
  } else {
    buttonClasses = [baseClasses, nonselectedClasses].join(" ");
  }

  return (
    <button
      className={buttonClasses}
      onClick={() => onSelectCategory(category)}
    >
      {category}
    </button>
  );
}

function BlogIndexArticle({ article }) {
  const color = getColorFromCategory(article.category);
  const tagClassString = `text-sm font-medium text-white self-start bg-${color}-600 rounded-lg px-2`;
  const link = `/blog/${article.slug}`;

  return (
    <article className="flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        {article.image && (
          <img
            className="h-48 w-full object-cover"
            src={article.image}
            alt={article.title}
          />
        )}
      </div>
      <div className="flex-1 py-6 flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          <a href={link} className="block my-2">
            <h2 className="text-xl font-semibold font-heading text-white">
              {article.title}
            </h2>
          </a>
          <p className={tagClassString}>
            <a href="#" className="hover:underline font-heading">
              {article.category}
            </a>
          </p>
          <p className="mt-3 text-base font-body text-gray-500">
            {article.description}
          </p>
        </div>
      </div>
    </article>
  );
}
