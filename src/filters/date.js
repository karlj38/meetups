export default value => {
  const date = new Date(value);
  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const locales = ["en-GB"];
  return date.toLocaleString(locales, options);
}