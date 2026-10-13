import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Work from "./sections/Work";
import Research from "./sections/Research";
import Blog from "./sections/Blog";
import Collection from "./sections/Collection";
import Post from "./sections/Post";
import { collections } from "./data/posts";
import Contact from "./sections/Contact";

/*
  A client-side navigation keeps the old scroll position, so following a link
  from halfway down the blog index would open the post halfway down. Anchors are
  left alone: those carry their own target, and the browser handles them.
*/
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Research />
    </main>
  );
}

/*
  Nav and Contact sit outside the routes: the bar and the footer belong to every
  page, and remounting them per route would replay their entrance animations on
  each navigation.
*/
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />

        {/*
          Collections live alongside posts at /blog/<name>. React Router ranks a
          static segment above a dynamic one, so these win over the post route
          regardless of the order they are written in; src/data/posts.js warns in
          development if a post slug ever collides with one.
        */}
        {collections.map((collection) => (
          <Route
            key={collection.slug}
            path={`/blog/${collection.slug}`}
            element={<Collection slug={collection.slug} />}
          />
        ))}

        <Route path="/blog/:slug" element={<Post />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Contact />
    </>
  );
}
