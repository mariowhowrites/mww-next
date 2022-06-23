import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Prism from "prismjs";
import { useEffect } from "react";

import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { getColorFromCategory } from "../../utils";
import markdownToHtml from "../../lib/markdownToHtml";
import { Article as ArticleType } from "../../lib/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

type ArticleProps = {
  article: ArticleType;
  url: string;
};

export default function Article({ article, url }: ArticleProps) {
  const router = useRouter();
  if (!router.isFallback && (!article || !article.slug)) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const color = getColorFromCategory(article.category);
  const tagClassString = `text-sm font-medium text-white self-start bg-${color}-600 rounded-lg px-2 mr-3`;

  const readTime = Math.floor(article.content.split(" ").length / 200);

  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Head>
            <title>{article.title} - MarioWhoWrites</title>
            <meta property="og:title" content={article.title} />
            <meta property="og:description" content={article.description} />
            <meta property="og:image" content={`https://mariowhowrites.com${article.image}`} />
            <meta property="og:type" content="article" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:site" content="@mariowhowrites" />
            <meta property="twitter:creator" content="@mariowhowrites" />
            <meta property="twitter:image" content={`https://mariowhowrites.com${article.image}`} />
          </Head>
          <main className="w-full md:w-2/3 mx-auto">
            <h1 className="text-3xl tracking-tight font-extrabold font-heading text-white sm:text-4xl max-w-lg mx-auto">
              {article.title}
            </h1>
            <p className="italic text-gray-500 mt-0 md:mt-3 max-w-lg mx-auto">
              {article.description}
            </p>
            <aside className="my-6 flex flex-col md:flex-row max-w-lg mx-auto">
              <div className="flex mb-2 md:md-0">
                {article.tags &&
                  article.tags.map((tag) => (
                    <div key={tag} className={tagClassString}>
                      {tag}
                    </div>
                  ))}
              </div>
              <p className="text-white">{readTime} minute read time</p>
            </aside>
            <img
              className="h-124 w-full object-cover mb-8"
              src={article.image}
              alt={article.title}
            />
            <article
              className="mww"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </main>
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "tags",
    "author",
    "content",
    "image",
    "description",
  ]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      article: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
