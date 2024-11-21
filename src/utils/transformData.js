const transformData = (data) => {
  return Object.entries(data)
    .filter(([year]) => year)
    .map(([year, value]) => ({ year, value }));
};

export default transformData;
