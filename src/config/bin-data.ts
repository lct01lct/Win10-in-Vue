import { Desc } from '@/share/file';

const ORIGIN_DATA = [
  {
    name: 'Windows (C:)',
    memory: '16GB',
    children: [
      {
        name: 'Adobe',
        children: [],
      },
      {
        name: 'Office',
        children: [],
      },
      {
        name: 'Users',
        children: [],
      },
      {
        name: 'DeskTop',
        children: [
          {
            name: 'Video',
            posIdx: 11,
            children: [
              {
                name: 'QQ Music',
                children: [
                  {
                    name: '周杰伦的专辑',
                    children: [
                      {
                        extension: 'mp4',
                        name: '青花瓷',
                        size: '50KB',
                      },
                      {
                        extension: 'mp4',
                        name: '一路向北',
                        size: '56KB',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Cloud Music',
                children: [
                  {
                    name: '周杰伦的专辑',
                    children: [
                      {
                        extension: 'mp4',
                        name: '青花瓷',
                        size: '56KB',
                      },
                      {
                        extension: 'mp4',
                        name: '一路向北',
                        size: '56KB',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Music',
            posIdx: 10,
            children: [
              {
                name: 'QQ Music',
                children: [
                  {
                    name: '周杰伦的专辑',
                    children: [
                      {
                        extension: 'mp4',
                        name: '青花瓷',
                        size: '50KB',
                      },
                      {
                        extension: 'mp4',
                        name: '一路向北',
                        size: '56KB',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Cloud Music',
                children: [
                  {
                    name: '周杰伦的专辑',
                    children: [
                      {
                        extension: 'mp4',
                        name: '青花瓷',
                        size: '56KB',
                      },
                      {
                        extension: 'mp4',
                        name: '一路向北',
                        size: '56KB',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        extension: 'html',
        name: 'index',
        size: '11KB',
      },
    ],
  },
  {
    name: 'Data (D:)',
    memory: '160GB',
    children: [
      {
        name: 'Music',
        children: [
          {
            name: 'QQ Music',
            children: [
              {
                name: '周杰伦的专辑',
                children: [
                  {
                    extension: 'mp4',
                    name: '青花瓷',
                    size: '100GB',
                  },
                  {
                    extension: 'mp4',
                    name: '一路向北',
                    size: '56KB',
                  },
                ],
              },
            ],
          },
          {
            name: 'Cloud Music',
            children: [
              {
                name: '周杰伦的专辑',
                children: [
                  {
                    extension: 'mp4',
                    name: '青花瓷',
                    size: '56KB',
                  },
                  {
                    extension: 'mp4',
                    name: '一路向北',
                    size: '56KB',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        extension: 'html',
        name: 'index',
        size: '20KB',
      },
    ],
  },
];

export default ORIGIN_DATA.map((item) => new Desc(item as any));
