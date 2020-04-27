import moment from 'moment';

export const getDatePlusMonth = (month) => (moment().add(month, 'months'));
export const getDatePlusMonthFormatted = (month) => (moment().add(month, 'months').format('YYYY-MM-DD'));
export const getDatePlusDayFormatted = (days) => (moment().add(days, 'days').format('YYYY-MM-DD'));
export const getDateFormatted = (date) => (moment(date).format('YYYY-MM-DD'));
export const isDate = (date) => (date instanceof Date);