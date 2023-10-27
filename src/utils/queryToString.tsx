const queryToString = (query: Record<string, any>): string => {
  const result = Object.entries(query)
    .filter((row) => row[1] || row[1] === 0)
    .map((row) => `${row[0]}=${row[1]}`);
  return `${result.join('&')}`;
};

export default queryToString;
