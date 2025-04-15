export default function paraSvg(value: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(value, 'image/svg+xml');
  const svgElement = doc.documentElement;

  return svgElement;
}