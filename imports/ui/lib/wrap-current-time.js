import moment from 'moment'
import _ from 'lodash'

export default function wrapCurrentTime(dates) {
  // Check type of dates
  let arrDates = _.isArray(dates) ? dates : [dates];
  let newDates = [];

  arrDates.forEach(date => {
    const currentDate = moment();
    let newDate = moment(date);

    newDate.hour(currentDate.hour());
    newDate.minute(currentDate.minute());
    newDate.second(currentDate.second());
    newDate.millisecond(currentDate.millisecond());

    newDates.push(newDate.toDate())
  });

  return _.isArray(dates) ? newDates : newDates[0]
}
