function getDiff(a, b) {
  let finalA = a;
  let finalB = b;
  let withMinus = false;

  if (b > a) {
    finalA = b;
    finalB = a;
    withMinus = true;
  }

  const res = 100 * Math.abs((finalA - finalB) / ((finalA + finalB) / 2));
  return `${withMinus ? '-' : '+'}${res.toFixed(2)}%`;
}

module.exports = getDiff;
