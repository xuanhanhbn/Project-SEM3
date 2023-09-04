export const columns = [
  {
    field: 'index',
    maxWidth: 170,
    name: 'STT',
    align: 'center'
  },
  {
    field: 'partnerName',
    maxWidth: 170,
    name: 'Name Program'
  },
  {
    field: 'status',
    maxWidth: 170,
    name: 'Status'
  },

  {
    field: 'actions',
    maxWidth: 170,
    name: 'Actions',
    align: 'center'
  }
]

export const inputCreateProgram = [
  {
    field: 'name',
    label: 'Program Name',
    type: 'INPUT'
  },
  {
    field: 'partnerId',
    label: 'Partner Name',
    type: 'SELECT_PARTNER'
  },
  {
    field: 'donationInfo',
    label: 'Donation Info',
    type: 'INPUT'
  },
  {
    field: 'target',
    label: 'Target',
    type: 'INPUT',
    type_input: 'number'
  },
  {
    field: 'endDate',
    label: 'End Date',
    type: 'SELECT_DATE'
  },
  {
    field: 'donationReason',
    label: 'Donation Reason',
    type: 'SELECT_REASON'
  },
  {
    field: 'description',
    label: 'Description',
    type: 'TEXT_AREA'
  },
  {
    field: 'programThumbnailId',
    label: 'Program Thumbnail',
    type: 'SELECT'
  }
]
