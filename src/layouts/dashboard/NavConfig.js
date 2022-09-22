// component
import Iconify from '../../components/Iconify';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Clients',
    path: '/dashboard/clients',
    icon: getIcon('eva:people-fill'),
  },
];

export default navConfig;
