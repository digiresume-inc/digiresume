export function processFormData(data: any) {
  const updatedLinks = data.links.map((link: any) => {
    if (link.type?.trim()) return link; // skip if already filled

    try {
      const url = new URL(link.url);
      const domain = url.hostname; // e.g., linkedin.com
      const type = domain.split('.')[0]; // get 'linkedin' from 'linkedin.com'
      return { ...link, type };
    } catch (e) {
      return link; // skip or log invalid URLs
    }
  });

  return {
    ...data,
    links: updatedLinks,
  };
}
