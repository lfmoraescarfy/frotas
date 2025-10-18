import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'las la-tachometer-alt',
    link: '/',
    isCollapsed: false,
  },
  {
    id: 8,
    label: 'MENUITEMS.CADASTROS.TEXT',
    icon: 'lar la-newspaper',
    isCollapsed: true,
    subItems: [
      {
        id: 65,
        label: 'MENUITEMS.CADASTROS.LIST.USUARIOS',
        link: '/cadastros/usuarios',
        parentId: 8
      },
      {
        id: 66,
        label: 'MENUITEMS.CADASTROS.LIST.MOTORISTAS',
        link: '/cadastros/motoristas',
        parentId: 8
      },
      {
        id: 67,
        label: 'MENUITEMS.CADASTROS.LIST.VEICULOS',
        link: '/cadastros/veiculos',
        parentId: 8
      }
    ]
  },
  {
    id: 3,
    label: 'MENUITEMS.FROTA.TEXT',
    icon: 'las la-car-side',
    link: '/cadastros/frota',
    isCollapsed: false,
  },
  {
    id: 4,
    label: 'MENUITEMS.MANUTENCAO.TEXT',
    icon: 'las la-wrench',
    link: '/oficinas/listagem',
    isCollapsed: false,
  },
]
