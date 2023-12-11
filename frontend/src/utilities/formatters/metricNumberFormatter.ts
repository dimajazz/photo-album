export const FormatteNumber = (num: string | number) => {
  const newNum = Number(num);
  const kilo = 1e3;
  const mega = 1e6;
  const giga = 1e9;

  if (newNum > 0 && newNum < kilo) {
    return newNum;
  }

  if (newNum > 0 && newNum >= kilo && newNum < mega) {
    const convertedToKilo = (newNum / kilo).toFixed(1);
    return `${convertedToKilo}k`;
  }

  if (newNum > 0 && newNum >= mega && newNum < giga) {
    const convertedToMega = (newNum / mega).toFixed(1);
    return `${convertedToMega}M`;
  }

  if (newNum > 0 && newNum >= giga) {
    const convertedToGiga = (newNum / giga).toFixed(1);
    return `${convertedToGiga}G`;
  }

  return '';
};
