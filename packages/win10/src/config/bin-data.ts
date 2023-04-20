import { Desc, Folder } from '@/share/file';
import quickVisitIcon from '@/assets/images/appPage/system-app/folder-app/quick-visit.png';
import cDescIcon from '@/assets/images/appPage/system-app/folder-app/C-Desc.png';
import dDescIcon from '@/assets/images/appPage/system-app/folder-app/D-Desc.png';

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
                name: 'QQ Video',
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
                  {
                    name: '数字唱片',
                    children: [
                      { name: 'bin', children: [] },
                      {
                        name: 'pacakges',
                        children: [
                          { name: 'pg-1', children: [] },
                          { name: 'pg-2', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Cloud Video',
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
              {
                extension: 'mp4',
                name: '青花瓷',
                size: '50KB',
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

type MenuItem = (Desc | Folder) & {
  icon?: string;
};

export const ORIGIN_MENU_DATA: MenuItem[] = reactive([
  // {
  //   name: '快速访问',
  //   children: [
  //     { name: '桌面', children: [] },
  //     { name: '下载', children: [] },
  //     { name: '文档', children: [] },
  //     { name: '图片', children: [] },
  //     { name: '此电脑', children: [] },
  //   ],
  //   icon: quickVisitIcon,
  // },
  // {
  //   name: 'OneDrive-Personal',
  //   children: [
  //     { name: '图片', children: [] },
  //     { name: '文档', children: [] },
  //   ],
  // },
  // {
  //   name: '此电脑',
  //   children: [
  //     { name: '3D对象', children: [] },
  //     { name: '视频', children: [] },
  //     { name: '图片', children: [] },
  //     { name: '文档', children: [] },
  //     { name: '下载', children: [] },
  //     { name: '音乐', children: [] },
  //     { name: '桌面', children: [] },
  //     { name: 'Windows (C:)', children: [] },
  //     { name: 'Data (D:)', children: [] },
  //   ],
  // },
  // { name: '网络', children: [{ name: 'LAPTOP-04GMNTLU', children: [] }] },
]);

setTimeout(() => {
  const deskTopPointer = Folder.search('desktop')[0] as MenuItem;
  deskTopPointer.icon = quickVisitIcon;
  ORIGIN_MENU_DATA.push(deskTopPointer);

  const cDesc = Folder.findByPath('C:\\') as MenuItem;
  cDesc.icon = cDescIcon;
  ORIGIN_MENU_DATA.push(cDesc);

  const dDesc = Folder.findByPath('D:\\') as MenuItem;
  dDesc.icon = dDescIcon;
  ORIGIN_MENU_DATA.push(dDesc);
});

export const binData = reactive(ORIGIN_DATA.map((item) => new Desc(item as any)));

export const deskTopData = Desc.search('DeskTop')[0] as Folder;
deskTopData.addFolder();

export const menuData = [{ name: '快速访问', children: [Desc.search('DeskTop')] }];

export const getDesktopPointer = (): Desc | Folder => {
  return Folder.search('desktop')[0] as Desc | Folder;
};
