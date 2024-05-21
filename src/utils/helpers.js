export function formatDate(date) {
  const numericDate = new Date(date.split('-'));
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = numericDate.toLocaleDateString('en-US', options);
  return formattedDate;
}
