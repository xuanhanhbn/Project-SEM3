import moment from 'moment'

const DisplayRealTime = props => {
  const { time } = props
  let momentDate = moment(time)
  const secondAgo = moment().diff(momentDate, 'seconds')
  const minuteAgo = moment().diff(momentDate, 'minutes')
  const oneHourAgo = moment().diff(momentDate, 'hours')
  const oneDayAgo = moment().diff(momentDate, 'days')
  const oneMonthAgo = moment().diff(momentDate, 'months')
  const isValidDate = moment(time, 'YYYY-MM-DD').isValid()
  let displayTime = ''

  if (secondAgo < 60) {
    displayTime = 'Just finished.'
  } else if (minuteAgo < 60) {
    displayTime = `${minuteAgo} minutes ago`
  } else if (oneHourAgo < 24) {
    displayTime = `${oneHourAgo} hourse ago`
  } else if (oneDayAgo < 31) {
    displayTime = `${oneDayAgo} day ago`
  } else if (oneMonthAgo < 2) {
    displayTime = `${oneMonthAgo} month ago`
  } else if (isValidDate === false) {
    displayTime = momentDate.format('DD/MM/YYYY')
  } else {
    displayTime = momentDate.format('DD/MM/YYYY')
  }

  return displayTime
}

export default DisplayRealTime
