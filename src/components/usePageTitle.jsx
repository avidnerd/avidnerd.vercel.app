import { useEffect } from "react";

/*
  Sets document.title for a route and restores the previous one on the way out,
  so a client-side navigation leaves the tab label correct rather than stuck on
  whichever page happened to set it last.
*/
export function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
