function getPercentage(value, total) {
  return `${((value / total) * 100).toFixed(0)}%`;
}

export default getPercentage;
