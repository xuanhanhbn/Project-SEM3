export const columns = [
  {
    field: 'index',
    maxWidth: 170,
    name: 'STT',
    align: 'center'

    // isSort: true,
  },
  { field: 'topic', name: 'Topic Title', minWidth: 170 },
  { field: 'content', name: 'Question', minWidth: 100 },
  {
    field: 'createdByName',
    name: 'Created By Name',
    minWidth: 170
  },
  {
    field: 'createdAt',
    name: 'Created At',
    minWidth: 170
  },
  {
    field: 'actions',
    name: 'Actions',
    minWidth: 170,
    align: 'center'
  }
]

export const listTopic = [
  {
    id: 1,
    topicTitle: 'Creative ideas to help tell your company story',
    started: {
      avatar: '/images/avatars/1686130680-bpfull.jpg',
      name: 'Joseph'
    },
    voices: 4,
    post: 43,
    lastPost: '1 month, 1 week ago'
  },
  {
    id: 2,
    topicTitle: 'Taxes and Incomes',
    started: {
      avatar: '/images/avatars/1686130680-bpfull.jpg',
      name: 'Roxy'
    },
    voices: 2,
    post: 7,
    lastPost: '1 year, 8 months ago'
  },
  {
    id: 3,
    topicTitle: 'Building a Great Team',
    started: {
      avatar: '/images/avatars/1686130680-bpfull.jpg',
      name: 'Kevin'
    },
    voices: 10,
    post: 22,
    lastPost: '1 year, 5 months ago'
  }
]

export const createTopic = [
  {
    field: 'topic',
    name: 'Topic'
  },
  {
    field: 'content',
    name: 'Content'
  }
]
