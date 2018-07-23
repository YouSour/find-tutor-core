import moment from 'moment'

export const datePickerOpts = []

export const dateRangePickerOpts = {
  shortcuts: [
    {
      text: 'Today',
      onClick(picker) {
        const start = moment().toDate()
        const end = moment().toDate()
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: 'This week',
      onClick(picker) {
        const start = moment()
          .startOf('isoWeek')
          .toDate()
        const end = moment()
          .endOf('isoWeek')
          .toDate()
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: 'This month',
      onClick(picker) {
        const start = moment()
          .startOf('month')
          .toDate()
        const end = moment()
          .endOf('month')
          .toDate()
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: 'Last week',
      onClick(picker) {
        const start = moment()
          .subtract(7, 'days')
          .startOf('isoWeek')
          .toDate()
        const end = moment()
          .subtract(7, 'days')
          .endOf('isoWeek')
          .toDate()
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: 'Last month',
      onClick(picker) {
        const start = moment()
          .subtract(1, 'month')
          .startOf('month')
          .toDate()
        const end = moment(start)
          .endOf('month')
          .toDate()
        picker.$emit('pick', [start, end])
      },
    },
  ],
}
