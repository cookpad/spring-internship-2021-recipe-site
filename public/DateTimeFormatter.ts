export const DateTimeFormatter = (stringDatetime: string): string => {
  const datetime = new Date(stringDatetime);
  const year = String(datetime.getFullYear());
  const month = String(datetime.getMonth() + 1).padStart(2, '0');
  const date = String(datetime.getDate()).padStart(2, '0')
  const formattedDatetime = `${year}/${month}/${date}`
  return formattedDatetime;
}