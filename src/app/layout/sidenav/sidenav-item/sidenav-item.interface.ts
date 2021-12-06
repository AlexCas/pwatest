export class SidenavItem {
  name: string;
  icon?: string;
  route?: any;
  parent?: SidenavItem;
  children?: SidenavItem[];
  position?: number;
  pathMatchExact?: boolean;
  badge?: string;
  badgeColor?: string;
  type?: 'item' | 'subheading';
  customClass?: string;
}
