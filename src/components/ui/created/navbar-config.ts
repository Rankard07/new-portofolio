// ============================================
// PAGE CONFIGURATION
// Add new pages here to automatically show in desktop + mobile nav
// ============================================

export interface PageConfig {
  id: string;
  label: string;
}

export const PAGES: PageConfig[] = [
  { id: "home", label: "Home" },
  { id: "project", label: "Project" },
  { id: "other", label: "Other" },
  // Add more pages here, e.g.:
  // { id: "blog", label: "Blog" },
];

// ============================================
// CONTACT CONFIGURATION (plain data)
// Icons are mapped by label in the component
// ============================================

export interface ContactItem {
  label: string;
  href: string;
}

export const DEFAULT_CONTACT_ITEMS: ContactItem[] = [
  { label: "Email", href: "mailto:email@example.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];
