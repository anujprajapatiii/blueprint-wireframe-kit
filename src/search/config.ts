/** This URL is public configuration. Credentials always stay on the API server. */
const hostedEndpoint = import.meta.env.VITE_SEARCH_API_URL?.trim();

function validHostedEndpoint(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    )
      return undefined;
    return url.href.replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

export const searchEndpoint = import.meta.env.DEV
  ? `${import.meta.env.BASE_URL}__search`
  : validHostedEndpoint(hostedEndpoint);

export const supportsIdeaSearch = Boolean(searchEndpoint);
