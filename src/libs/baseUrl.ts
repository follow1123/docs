import path from "path";

function baseUrl(url: string): string {
  return path.join(import.meta.env.BASE_URL, url);
}

export default baseUrl;
