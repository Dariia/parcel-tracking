export const jsonDateToString = (date: string): string => {
  const [ year, month, day ] = date.substr(0, 10).split('-');
  const timeString = date.substr(14, 5);
  return `${day}.${month}.${year}, ${timeString}`
};