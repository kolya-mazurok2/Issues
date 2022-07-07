import moment from 'moment';

export const getTimeSince = (date: string): string => {
  const dateNow = moment();
  const dateObj = moment(date);

  const seconds = dateNow.diff(dateObj) / 1000;

  if (seconds < 1) {
    return 'just now';
  } else if (seconds < 60) {
    return `${dateNow.diff(dateObj, 'seconds')} seconds`;
  } else if (seconds < 3600) {
    return `${dateNow.diff(dateObj, 'minutes')} minutes`;
  } else if (seconds < 86400) {
    return `${dateNow.diff(dateObj, 'hours')} hours`;
  } else {
    return `${dateNow.diff(dateObj, 'days')} days`;
  }
};
