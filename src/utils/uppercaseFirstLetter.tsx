const upperCaseFisrtLetter = (str: string): string => {
  const arr = str.split(" ");

  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
};

export default upperCaseFisrtLetter;
