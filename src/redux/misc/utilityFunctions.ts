export const insertOrReplace = <T extends any>(array: T[], item: T, comparison: string = 'id') => {
  const index = array.findIndex((arrayItem) => arrayItem[comparison] === item[comparison]);
  if (index !== -1) return (array[index] = item);
  return array.push(item);
};
