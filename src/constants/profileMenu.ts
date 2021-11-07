interface ProfileMenuItemType {
  name: string;
  href: string;
}

export const PROFILE_MENU_LIST: Array<ProfileMenuItemType> = [
  { name: 'your_profile', href: '/profile' },
  { name: 'settings', href: '/profile/settings' },
  { name: 'sign_out', href: '/sign-out' }
];
