export function processFormData(data: any) {
  const updatedLinks = data.links.map((link: any) => {
    if (link.type?.trim()) return link; // skip if already filled

    try {
      const url = new URL(link.url);
      const hostnameParts = url.hostname.split('.');

      // Remove 'www' if it's the first part
      if (hostnameParts[0] === 'www' && hostnameParts.length > 1) {
        hostnameParts.shift();
      }

      // Now take the first part of the remaining hostname as the type
      const type = hostnameParts[0] || '';

      return { ...link, type };
    } catch (e) {
      // Invalid URL, just return original link
      return link;
    }
  });

  return {
    ...data,
    links: updatedLinks,
  };
}
