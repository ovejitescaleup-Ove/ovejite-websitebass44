import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export function useCMSPage(slug, fallback = {}) {
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await base44.entities.Page.filter({ slug, published: true }, "-updated_date", 1);
        if (mounted && rows?.[0]) {
          setContent({ ...fallback, ...(rows[0].content || {}) });
        }
      } catch (_) {
        // Keep the existing page fallback.
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  return { content, loading };
}
