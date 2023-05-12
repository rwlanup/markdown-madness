import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export const formatDateTime = (dateTime: Parameters<typeof dayjs>[0] | Timestamp): string => {
  if (typeof dateTime === 'object' && dateTime instanceof Timestamp) {
    dateTime = dateTime.toDate();
  }
  const dayjsDate = dayjs(dateTime);
  if (dayjsDate.isValid()) {
    return dayjsDate.format('hh:mm A . DD MMM YYYY');
  }
  return 'unknown time';
};
