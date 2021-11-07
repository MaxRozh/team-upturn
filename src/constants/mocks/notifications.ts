export interface NotificationItemType {
  id: number;
  href: string;
  img: string;
  message: Array<{
    type?: string;
    text: string;
  }>;
}

export const notificationsList: Array<NotificationItemType> = [
  {
    id: 111,
    href: '/notifications/1',
    // eslint-disable-next-line max-len
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    message: [
      { type: 'bold', text: 'Sara Salah' },
      { text: ' replied on the ' },
      { type: 'important', text: 'Upload Image' },
      { text: ' artical . 2m' }
    ]
  },
  {
    id: 222,
    href: '/notifications/2',
    // eslint-disable-next-line max-len
    img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    message: [{ type: 'bold', text: 'Slick Net' }, { text: ' start following you . 45m' }]
  },
  {
    id: 333,
    href: '/notifications/3',
    // eslint-disable-next-line max-len
    img: 'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    message: [
      { type: 'bold', text: 'Jane Doe' },
      { text: ' Like Your reply on ' },
      { type: 'important', text: 'Test with TDD' },
      { text: ' artical . 1h' }
    ]
  },
  {
    id: 444,
    href: '/notifications/4',
    // eslint-disable-next-line max-len
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80',
    message: [{ type: 'bold', text: 'Abigail Bennett' }, { text: ' start following you . 3h' }]
  }
];
