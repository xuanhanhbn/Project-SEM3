export const columns = [
  {
    field: 'index',
    maxWidth: 170,
    name: 'STT',
    align: 'center'
  },
  {
    field: 'name',
    maxWidth: 170,
    name: 'Name Program'
  },

  {
    field: 'createdAt',
    maxWidth: 170,
    name: 'CreatedAt'
  },
  {
    field: 'endDate',
    maxWidth: 170,
    name: 'End Date'
  },
  {
    field: 'target',
    maxWidth: 170,
    name: 'Target'
  }
]

export const inputCreatePartner = [
  {
    field: 'name',
    label: 'Partner Name',
    type: 'INPUT'
  },
  {
    field: 'email',
    label: 'Partner Email',
    type: 'INPUT'
  },
  {
    field: 'description',
    label: 'Description',
    type: 'TEXT_AREA'
  },
  {
    field: 'partnerThumbnail',
    label: 'Partner Thumbnail',
    type: 'SELECT'
  }
]
