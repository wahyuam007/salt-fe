function separateNumber(number: number) {
  const numberString = number.toString(); // Convert the number to a string
  const parts = [];
  
  for (let i = numberString.length - 1; i >= 0; i -= 3) {
    const start = Math.max(0, i - 2); // Start of the current group of three digits
    const part = numberString.slice(start, i + 1); // Extract the group of three digits
    parts.unshift(part); // Add the group to the beginning of the array
  }

  return parts.join('.');
}

export default separateNumber;
