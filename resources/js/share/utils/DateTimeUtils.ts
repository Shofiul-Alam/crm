import moment from "moment";


export const NowToString = (format): String => {
  return moment().format(format);
}
export const NowAsDateObject = (): Date => {
    return moment().toDate();
}

export const ParseDateToMoment = (dateString:String|Object, format:String|null = null): Object => {
    if(!format) return moment(dateString);
    return moment(dateString, format);
}
export const ParseDateToString = (dateString:String|Object, format:String|null = null): String => {
    if(!format) return moment(dateString).format();
    return moment(dateString).format(format);
}

export const FormatMomentToDateString = (date:moment.Moment, format:String): String => {
    return date.format(format);
}

// /**
//  *
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  * @returns {Date} new Date object
//  */
// export function parseDateString(datestring) {
//   if (!datestring) return null;
//   const [ date, time ] = datestring.split(' ');
//   if (!date) return null;
//   const dateSplit = date.split('-');
//   let day, month, year;
//   if (dateSplit[0].length === 4) {
//     [ year, month, day ] = dateSplit.map(i => Number(i));
//   } else {
//     [ day, month, year ] = dateSplit.map(i => Number(i));
//   }
//   if (time) {
//     const[ hours, mins, secs ] = time.split(':').map(i => Number(i));
//     return new Date(year, month - 1, day, hours, mins, secs);
//   }
//   return new Date(year, month - 1, day);
// }
//
// export function parseDateStringWithFormat(datestring, format){
//   return moment(datestring, format).format("ddd D/M/YY");
// }
//
// export function parseTimeString(timestring) {
//   if (!timestring) return null;
//   const time = moment(timestring, 'hh:mm:ss').toDate();
//   return time;
// }
//
// /**
//  * Returns string formatted ddd D/M/YY
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function formatDate(datestring) {
//   if (!datestring) return undefined;
//   if (datestring instanceof Date) return formatDateObject(datestring);
//   const date = datestring.split(' ')[0];
//   if (!date) return undefined;
//   const fields = date.split('-');
//   const format = fields[0]?.length === 4 ? "YYYY-MM-DD hh:mm:ss" : "DD-MM-YYYY hh:mm:ss"
//   return moment(datestring, format).format("ddd D/M/YY");
// }
// /**
//  * Returns string formatted ddd D/M/YY
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function formatDateTime(datestring) {
//   if (!datestring) return undefined;
//   if (datestring instanceof Date) return formatDateObject(datestring);
//   const date = datestring.split(' ')[0];
//   if (!date) return undefined;
//   const fields = date.split('-');
//   const format = fields[0]?.length === 4 ? "YYYY-MM-DD hh:mm:ss" : "DD-MM-YYYY hh:mm:ss"
//   return moment(datestring, format).format("HH:mm ddd D/M/YY");
// }
//
// /**
//  * Returns string formatted ddd D/M/YY
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function formatDateForSort(datestring) {
//     return moment(datestring, 'DD-MM-YYYY hh:mm:ss').format("YYYY-MM-DD");
// }
//
// /**
//  * Returns data formatted ddd D/M/YY
//  * @param {Date} dateObject A date object
//  */
// export function formatDateObject(dateObject) {
//   if (!dateObject) return undefined;
//   return moment(dateObject).format("ddd D/M/YY");
// }
// /**
//  * Returns data formatted DD-MM-YYYY
//  * @param {String} datestring A date object
//  */
// export function formatDateStringToDDMMYYYY(datestring) {
//   if (!datestring) return undefined;
//   return moment(parseDateString(datestring)).format("DD-MM-YYYY");
// }
// /**
//  * Returns data formatted DD/MM/YY
//  * @param {String} datestring A date object
//  */
// export function formatDateStringToDDMMYY(datestring) {
//   if (!datestring) return undefined;
//   return moment(parseDateString(datestring)).format("DD/MM/YY");
// }
// /**
//  * Returns data formatted DD-MM-YYYY
//  * @param {Date} dateObject A date object
//  */
// export function formatDateObjectToDDMMYYYY(dateObject) {
//   if (!dateObject) return undefined;
//   return moment(dateObject).format("DD-MM-YYYY");
// }
// /**
//  * Returns data formatted ddd hh:mm
//  * @param {Date} dateObject A date object
//  */
// export function formatDateObjectToDayAndTime(dateObject) {
//   if (!dateObject) return undefined;
//   return moment(dateObject).format("ddd HH:mm");
// }
// /**
//  * Returns data formatted Dayname, DD-MM-YYYY
//  * @param {Date} dateObject A date object
//  */
// export function formatDateObjectLong(dateObject) {
//   if (!dateObject) return undefined;
//   return moment(dateObject).format("dddd, DD-MM-YYYY");
// }
//
// /**
//  * Returns data formatted DD/MMM
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function formatDateShort(datestring) {
//   if (!datestring) return undefined;
//   const date = datestring.split(' ')[0];
//   if (!date) return undefined;
//   const fields = date.split('-');
//   const format = fields[0]?.length === 4 ? "YYYY-MM-DD hh:mm:ss" : "DD-MM-YYYY hh:mm:ss"
//   return moment(datestring, format).format("DD/MMM");
// }
//
// /**
//  * Returns data formatted h:mma
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function formatTime(datestring) {
//   if (!datestring) return undefined;
//   const dateAndTime = datestring.split(' ').length > 1;
//   const format = dateAndTime ? "DD-MM-YYYY hh:mm:ss" : "hh:mm:ss";
//   const time = moment(datestring, format).format("hh:mma");
//   return time;
// }
// /**
//  * Returns data formatted h:mma
//  * @param {Date} dateObject A date object
//  */
// export function formatTimeForDatabase(dateObject) {
//   if (!dateObject) return undefined;
//   const time = moment(dateObject).format("HH:mm:ss");
//   return time;
// }
// /**
//  * Returns data formatted ddd D/M/YY h:mma
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function formatTimeAndDate(datestring) {
//   if (!datestring) return undefined;
//   return moment(datestring, "DD-MM-YYYY hh:mm:ss").format("ddd D/M/YY h:mma");
// }
// /**
//  * Returns data formatted D/M/YY hh:mm
//  * @param {string} datestring A datetime string in format "d-m-yy hh-mm-ss"
//  */
// export function formatDateAndTimeShort(datestring) {
//   if (!datestring) return undefined;
//   return moment(datestring, "DD-MM-YYYY hh:mm:ss").format("D/M/YY h:mm");
// }
// /**
//  * Returns data formatted D/M/YY hh:mm
//  * @param {Date} date A date object"
//  */
// export function formatDateTimeObjectShort(date) {
//   if (!date) return undefined;
//   return moment(date).format("ddd D/M/YY h:mma");
// }
// /**
//  * Returns data formatted D/M/YY
//  * @param {Date} date A date object"
//  */
// export function formatDateObjectShort(date) {
//   if (!date) return undefined;
//   return moment(date).format("ddd D/M/YY");
// }
// /**
//  * Returns date formatted e.g. hh:mm YESTERDAY
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function formatTimeAndDateRelative(datestring) {
//   if (!datestring) return undefined;
//   const datetime = moment(datestring, "DD-MM-YYYY hh:mm:ss");
//   const now = new moment();
//   const diffMinutes = datetime.diff(now, 'minutes');
//   if (Math.abs(diffMinutes) < 60) {
//     return moment.duration(diffMinutes, 'minutes').humanize(true);
//   }
//   const time = datetime.format("hh:mm");
//   if (datetime.isSame(now, 'date')) return time + ' TODAY';
//   const yesterday = now.subtract(1, 'days');
//   if (datetime.isSame(yesterday, 'date')) return time + ' YESTERDAY';
//   return datetime.format("hh:mm DD/MM/YYYY");
// }
// /**
//  * Returns data formatted e.g. 10 minutes ago || YESTERDAY || 08/06/21
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function formatTimeAndDateRelativeShort(datestring) {
//   if (!datestring) return undefined;
//   const datetime = moment(datestring, "DD-MM-YYYY hh:mm:ss");
//   const now = new moment();
//   const diffMinutes = datetime.diff(now, 'minutes');
//   if (Math.abs(diffMinutes) < 60) {
//     return moment.duration(diffMinutes, 'minutes').humanize(true);
//   }
//   const time = datetime.format("hh:mm");
//   if (datetime.isSame(now, 'date')) return 'TODAY';
//   const yesterday = now.subtract(1, 'days');
//   if (datetime.isSame(yesterday, 'date')) return 'YESTERDAY';
//   return datetime.format("ddd DD/MM/YY");
// }
//
// export function formatRelativeDate(datestring) {
//   if (!datestring) return undefined;
//   const datetime = moment(datestring, "DD-MM-YYYY hh:mm:ss");
//   const now = new moment();
//   if (datetime.isSame(now, 'date')) return 'TODAY';
//   return datetime.fromNow();
// }
// export function formatRelativeDateObject(date) {
//   if (!date) return undefined;
//   const datetime = moment(date);
//   const now = new moment();
//   //if (datetime.isSame(now, 'date')) return 'TODAY';
//   return datetime.fromNow();
// }
//
// /**
//  * Formts a date object into correct string format for database
//  * @param {Date} dateObject
//  */
// export function formatDateForDatabase(dateObject) {
//   if (!dateObject) return undefined;
//   return moment(dateObject).format('YYYY-MM-DD');
// }
// /**
//  * Formts a date object into correct string format for database
//  * @param {Date} dateObject
//  */
// export function formatDateTimeForDatabase(dateObject) {
//   if (!dateObject) return undefined;
//   return moment(dateObject).format('YYYY-MM-DD HH:mm:ss');
// }
//
// /**
//  * Formts a date object into correct string format for database
//  * @param {string} date
//  */
// export function formatDateTimeFromStringForSort(date, format) {
//   return moment(date, format).format('YYYY-MM-DD HH:mm:ss');
// }
//
// /**
//  * Formts a date object into the same string format as returned by database
//  * @param {Date} dateObject
//  */
// export function formatDateForClient(dateObject) {
//   if (!dateObject) return undefined;
//   const m = moment(dateObject);
//   const f = m.format('DD-MM-YYYY HH:mm:ss');
//   return f;
// }
//
// /**
//  * Returns string with time since data, e.g. '2 weeks ago'
//  * @param {string} datestring A datetime string in format "dd-mm-yyyy hh-mm-ss"
//  */
// export function timeSince(datestring) {
//   if (!datestring) return undefined;
//   const date = moment(datestring, "DD-MM-YYYY hh:mm:ss");
//   const now = moment();
//   const duration = moment.duration(date.diff(now));
//   return duration.humanize(true);
// }
//
// export function decimalToTimeString(decimal) {
//   if (isNaN(decimal)) return undefined;
//   if (typeof decimal === 'string') {
//     decimal = parseFloat(decimal);
//   }
//   const hours = Math.floor(decimal / 60)
//   const mins = Math.floor(decimal % 60);
//   const secs = Math.floor(60 * (decimal % 1));
//   let time = hours > 0 ? hours + 'h' : '';
//   if (mins > 0) time += ' ' + mins + 'm';
//   if (secs > 0) time += ' ' + secs + 's';
//   return time;
// }
//
// export function normaliseDateString(string) {
//   if (typeof string !== 'string') return string;
//   return string.replace(',', '');
// }
//
// export const AcceptedDateFormats = [
//   'ddd D/M/YY',
//   'dddd D/M/YY',
//   'D/M/YY',
//   'D/M/YYYY',
//   'ddd DD/MM/YYYY',
//   'dddd DD/MM/YYYY',
//   'DD/MM/YYYY',
//   'ddd D-M-YY',
//   'dddd D-M-YY',
//   'D-M-YY',
//   'D-M-YYYY',
//   'ddd DD-MM-YYYY',
//   'dddd DD-MM-YYYY',
//   'DD-MM-YYYY',
//   moment.ISO_8601
// ]
//
// /**
//  *
//  * @param {*} date
//  */
// export function validateDate(input) {
//   try {
//     if (typeof input === 'string') input = normaliseDateString(input);
//     let date = moment(input, AcceptedDateFormats);
//     if (!date.isValid()) {
//       return null;
//     }
//     return date.toDate();
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
//
// /**
//  *
//  * @param {Date|String} date
//  * @param {Number} daysForward
//  * @param {Holiday[]} holidays
//  * @returns {Date}
//  */
// export function nextWorkingDay(date, daysForward = 1, holidays = []) {
//   let paramDate = date;
//   if (typeof paramDate === 'string') {
//     paramDate = parseDateString(paramDate);
//   }
//   if (!paramDate) return null;
//   let nextDay = moment(paramDate).add(daysForward, 'days');
//   let dayOfWeek = nextDay.day();
//   while (dayOfWeek === 0 || dayOfWeek === 6 || dateIsHoliday(nextDay, holidays)) {
//     nextDay.add(1, 'day');
//     dayOfWeek = nextDay.day();
//   }
//   return nextDay.toDate();
// }
// export function maxDate(date, days){
//     return moment(date).add(days, 'day').toDate();
// }
//
// /**
//  *
//  * @param {Date|String} date
//  * @param {Number} daysBack
//  * @param {Holiday[]} holidays
//  * @returns
//  */
// export function previousWorkingDay(date, daysBack = 1, holidays = []) {
//   let paramDate = date;
//   if (typeof paramDate === 'string') {
//     paramDate = parseDateString(paramDate);
//   }
//   if (!paramDate) return null;
//   let prevDay = moment(paramDate).subtract(daysBack, 'days');
//   let dayOfWeek = prevDay.day();
//   while (dayOfWeek === 0 || dayOfWeek === 6 || dateIsHoliday(prevDay, holidays)) {
//     prevDay.subtract(1, 'day');
//     dayOfWeek = prevDay.day();
//   }
//   return prevDay.toDate();
// }
//
// export function getTransferDate(){
//     let dayOfWeek = moment().day();
//     if([1,2,5,6,7].includes(dayOfWeek)){
//         return 'tuesday_run';
//     }else{
//         return 'thursday_run';
//     }
// }
//
// /**
//  *
//  * @param {Date|String} date
//  * @param {Holiday[]} holidays
//  */
// export function dateIsHoliday(date, holidays) {
//   const d = moment(date);
//   return _.find(holidays, h => d.isSame(h.date, 'date'));
// }
//
// export function getDateRangeFromVariable(variable) {
//   let start, end = new Date();
//   switch (variable) {
//     case 'week':
//       start = moment().startOf('week').toDate();
//       break;
//     case 'month':
//       start = moment().startOf('month').toDate();
//       break;
//     case 'quarter':
//       start = moment().startOf('quarter').toDate();
//       break;
//     case 'year':
//       start = moment().startOf('year').toDate();
//       break;
//     default:
//       break;
//   }
//   return [ start, end ];
// }
// export function getDefaultCompareRange(variable) {
//   let start, end;
//   switch (variable) {
//     case 'week':
//       end = moment().startOf('week').subtract(1, 'day').toDate();
//       start = moment().startOf('week').subtract(1, 'week').toDate()
//       break;
//     case 'month':
//       end = moment().startOf('month').subtract(1, 'day').toDate();
//       start = moment().startOf('month').subtract(1, 'month').toDate()
//       break;
//     case 'quarter':
//       end = moment().startOf('quarter').subtract(1, 'day').toDate();
//       start = moment().startOf('quarter').subtract(1, 'quarter').toDate()
//       break;
//     case 'year':
//       end = moment().startOf('year').subtract(1, 'day').toDate();
//       start = moment().startOf('year').subtract(1, 'year').toDate()
//       break;
//     default:
//       break;
//   }
//   return [ start, end ];
// }
//
// export const MonthOptions = [
//   { label: 'January', value: 0 },
//   { label: 'February', value: 1 },
//   { label: 'March', value: 2 },
//   { label: 'April', value: 3 },
//   { label: 'May', value: 4 },
//   { label: 'June', value: 5 },
//   { label: 'July', value: 6 },
//   { label: 'August', value: 7 },
//   { label: 'September', value: 8 },
//   { label: 'October', value: 9 },
//   { label: 'November', value: 10 },
//   { label: 'December', value: 11 },
// ];
