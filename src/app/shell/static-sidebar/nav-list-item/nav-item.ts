export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  parent?: boolean;
  children?: NavItem[];
}
