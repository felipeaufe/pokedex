export function HTMLParser(template) {
  const doc = new DOMParser().parseFromString(template, 'text/html');
  return doc.body.firstElementChild;
}