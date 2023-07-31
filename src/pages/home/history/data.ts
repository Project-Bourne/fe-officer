export interface HistoryItem {
  id: number;
  imgSrc: string;
  imgSrcSave: string
  title: string;
  description: string;
keywordTitle: string;
  keywords: {
    id: number;
    keyword: string;
  }[];
}

const data:HistoryItem[] = [
    {
      id: 1,
      imgSrc: require('src/assets/icons/saved.svg'),
      imgSrcSave: require('src/assets/icons/on.saved.svg'),
      title: 'Title',
      description:
        'Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri',
    keywordTitle: 'Keyword',
      keywords: [
        {
          id: 1,
          keyword: 'UI Design',
        },
        {
          id: 2,
          keyword: 'UX Design',
        },
        {
          id: 3,
          keyword: 'Web Design',
        },
      ],
    },
    {
        id: 2,
        imgSrc: require('src/assets/icons/saved.svg'),
        imgSrcSave: require('src/assets/icons/on.saved.svg'),
        title: 'Title',
        description:
            'Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri',
      keywordTitle: 'Keyword',
        keywords: [
            {
                id: 1,
                keyword: 'UI Design',
            },
            {
                id: 2,
                keyword: 'UX Design',
            },
            {
                id: 3,
                keyword: 'Web Design',
            },
        ],
    },
    {
        id: 3,
        imgSrc: require('src/assets/icons/saved.svg'),
        imgSrcSave: require('src/assets/icons/on.saved.svg'),
        title: 'Title',
        description:

            'Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri',
      keywordTitle: 'Keyword',
        keywords: [
            {
                id: 1,
                keyword: 'UI Design',
            },
            {
                id: 2,
                keyword: 'UX Design',
            },
            {
                id: 3,
                keyword: 'Web Design',
            },
        ],
    },
  ];

  export default data;
  