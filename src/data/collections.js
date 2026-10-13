/*
  Collections are running series: a set of posts written to one brief, read in
  the order they were written rather than newest-first.

  A post joins one by naming it in frontmatter — `collection: egr190` — and the
  slug here is both the key posts refer to and the URL the collection lives at
  (/blog/egr190). Nothing else needs registering; adding a post to a series is a
  one-line change in that post's header.

  Keep the slugs distinct from any post slug. They share the /blog/<name> space,
  and src/data/posts.js will warn in development if the two ever collide.
*/
export const collections = [
  {
    slug: "egr190",
    // Shown in the small mono label on cards and breadcrumbs.
    label: "EGR 190",
    // The heading on the collection's own page and its row on the blog index.
    title: "EGR 190 takeaways",
    // One line, sits under the title on the index. Keep it short; the longer
    // introduction belongs in `intro` below.
    standfirst: "one post per class",
    intro:
      "Notes from EGR 190 at Duke (Business Leadership for Engineers). " +
      "This class was taught by a Fortune 500 CEO and was pretty life-changing for me because it completely changed my way of thinking and lifestyle." +
      "We have listened to so many guest speakers that I would have NEVER been able to contact if not for the class. So, I figured I would share the knowledge I gained once the class is over :) Enjoy!",
    // Counting words for the index ("3 classes" reads better than "3 entries").
    // Both spellings are given because English plurals are not a rule.
    unit: "class",
    units: "classes",
  },
];

export function findCollectionMeta(slug) {
  return collections.find((collection) => collection.slug === slug);
}
