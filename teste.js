function descendingOrder(n) {
  const nStr = Array.from(String(n), Number);
  if (nStr.length === 0) {
    return n;
  } else {
    for (let i = 0; i < nStr.length; i++) {
      for (let j = 0; j < nStr.length - 1; j++) {
        if (nStr[j] < nStr[j + 1]) {
          let x = nStr[j];
          nStr[j] = nStr[j + 1];
          nStr[j + 1] = x;
        }
      }
    }
    return Number(nStr.join(''));
  }
}
console.log(descendingOrder(23156479));
