export const RoutesPaths = {
  HOME: '/',
  FAVORITES: '/favorites',
  CONTACT: '/contact',
};

export type RoutesPaths = (typeof RoutesPaths)[keyof typeof RoutesPaths];
