import { Article } from "../lib/types";
import { getColorFromCategory } from "../utils";

type BlogIndexArticleProps = {
  article: Article
}

export function BlogIndexArticle({ article }: BlogIndexArticleProps) {
  const color = getColorFromCategory(article.category);
  let tagClassString =
    "text-sm font-medium text-white self-start rounded-lg px-2";

  const colorClasses = {
    red: "bg-red-600",
    indigo: "bg-indigo-600",
    green: "bg-green-600",
  };

  tagClassString = [tagClassString, colorClasses[color]].join(" ");

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
