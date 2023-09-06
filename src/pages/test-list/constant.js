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
    name: 'Name Partner'
  },
  {
    field: 'contentType',
    maxWidth: 170,
    name: 'Content Type'
  },
  {
    field: 'createdAt',
    maxWidth: 170,
    name: 'CreatedAt'
  },
  {
    field: 'actions',
    maxWidth: 170,
    name: 'Actions',
    align: 'center'
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
    field: 'partnerThumbnailId',
    label: 'Description',
    type: 'IMAGE'
  }
]
