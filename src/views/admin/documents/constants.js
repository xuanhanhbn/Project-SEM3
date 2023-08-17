export const columns = [
  {
    field: 'index',
    maxWidth: 70,
    name: 'STT',
    align: 'center'

    // isSort: true,
  },
  { field: 'title', name: 'Title', minWidth: 270 },
  { field: 'createdByName', name: 'Author', minWidth: 100 },
  {
    field: 'createdAt',
    name: 'Created',
    minWidth: 170
  },

  {
    field: 'category',
    name: 'Category',
    minWidth: 170
  },
  {
    field: 'content',
    name: 'Attachment',
    minWidth: 170
  },
  {
    field: 'actions',
    name: 'Actions',
    minWidth: 170,
    align: 'center'
  }
]
