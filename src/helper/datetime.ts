import dayjs from 'dayjs';

export const formatDateTime = (dateTime: Parameters<typeof dayjs>[0]): string => {
  const dayjsDate = dayjs(dateTime);
  if (dayjsDate.isValid()) {
    return dayjsDate.format('hh:mm A . DD MMM YYYY');
  }
  return 'unknown time';
};
