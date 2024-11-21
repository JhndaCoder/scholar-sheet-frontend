const formatDate = (date) => {
  if (!date) return 'Never';
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  const time = date.toLocaleTimeString('en-US', options);

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return `${time} at ${day}${suffix} ${month} ${year}`;
};

export default formatDate;
