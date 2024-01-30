// export default function slugify(str) {
//     return str
//       .toLowerCase()
//       .replace(/[^a-z0-9-]+/g, '-')
//       .trim();
//   }

export default function slugify(inputString) {
  // Use a regular expression to match special characters (excluding hyphens)
  const regex = /[^a-zA-Z0-9-]+/g;

  // Replace the matched characters with hyphens
  const result = inputString.replace(regex, "-");

  return result;
}
