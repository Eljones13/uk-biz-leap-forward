
export interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

export const NAV: NavItem[] = [
  {
    label: 'Services',
    children: [
      { label: 'Company Formation', path: '/wizard' },
      { label: 'Banking', path: '/banking' },
      { label: 'Credit & Funding', path: '/credit-funding' },
      { label: 'Documents', path: '/documents' },
      { label: 'Compliance', path: '/compliance' },
    ]
  },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Learn', path: '/learn' },
  { label: 'Contact', path: '/contact' },
];

// Helper to get all service paths for active state detection
export const getServicePaths = () => [
  '/wizard',
  '/banking', 
  '/credit-funding',
  '/documents',
  '/compliance'
];
