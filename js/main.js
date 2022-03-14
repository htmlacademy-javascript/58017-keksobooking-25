const randomInteger = function(min, max) {
  if (min === max) {
    return min;
  }

  if (min > max) {
    return new RangeError("min should be less max");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFractionalNumber = function(min, max, decimal) {
  if (min === max) {
    return min;
  }

  if (min > max) {
    return new RangeError("min should be less max");
  }

  return (Math.random() * (max - min) + min).toFixed(decimal);
};

randomInteger(3, 2);
randomFractionalNumber(1.1, 1.5, 4);

