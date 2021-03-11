import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  const isHome = router.asPath === "/";

  const topPadding = isHome ? "24" : "8";

  return (
    <div
      className={`relative bg-gray-800 min-h-screen pt-4 md:pt-16 pb-20 px-4 sm:px-6 lg:pt-${topPadding} lg:pb-28 lg:px-8`}
    >
      {!isHome && (
        <nav class="mb-12">
          <a
            className="tracking-tight font-extrabold font-heading text-white sm:text-2xl"
            href="/"
          >
            MarioWhoWrites
          </a>
        </nav>
      )}
      <div className="relative max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
