export interface LandingTemplate {
  id: string;
  title: string;
  short_description?: string;
  preview_image_url?: string | null;
  urls?: { template_url?: string };
}

export interface TemplatesResult {
  templates: LandingTemplate[];
  meta: { lastPage: number; from: number; to: number; total: number };
}

const API_BASE = 'https://app.sellsfie.com/api';

/**
 * Template titles and descriptions come from the Sellsfie admin, where some
 * still contain em dashes. Copy on this site does not use them, so incoming
 * text is normalised: a colon reads best between a name and its descriptor,
 * a comma inside running prose. The durable fix is renaming the template.
 */
function stripEmDash(value: string | undefined | null, separator: string): string | undefined {
  if (!value) return value ?? undefined;
  return value
    .replace(/\s*\u2014\s*/g, separator)
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalise(template: LandingTemplate): LandingTemplate {
  return {
    ...template,
    title: stripEmDash(template.title, ': ') ?? template.title,
    short_description: stripEmDash(template.short_description, ', '),
  };
}

const EMPTY: TemplatesResult = {
  templates: [],
  meta: { lastPage: 1, from: 0, to: 0, total: 0 },
};

/**
 * Fetched at build time rather than in the browser (the original does this
 * client-side). If the API is unreachable the build still succeeds with an
 * empty list, and the page degrades to its placeholder state.
 */
export async function fetchTemplates(page = 1, perPage = 12): Promise<TemplatesResult> {
  const url = new URL(`${API_BASE}/landing-pages/templates`);
  url.searchParams.set('page', String(page));
  url.searchParams.set('per_page', String(perPage));

  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.json();
    const data = body?.data;
    return {
      templates: (data?.data ?? []).map(normalise),
      meta: {
        lastPage: data?.last_page ?? 1,
        from: data?.from ?? 0,
        to: data?.to ?? 0,
        total: data?.total ?? 0,
      },
    };
  } catch (error) {
    console.warn(`[templates] fetch failed, falling back to empty list: ${error}`);
    return EMPTY;
  }
}

/** Walks every page so a static build can ship the full catalogue at once. */
export async function fetchAllTemplates(perPage = 100): Promise<LandingTemplate[]> {
  const first = await fetchTemplates(1, perPage);
  const all = [...first.templates];
  for (let page = 2; page <= first.meta.lastPage; page++) {
    const next = await fetchTemplates(page, perPage);
    all.push(...next.templates);
  }
  return all;
}
