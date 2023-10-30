export const MAX_CONTENT_WIDTH = 1000;

export const SCREEN_SIZE = {
  SM: 320,
  MD: 768,
  LG: 1041,
};

export const MEDIAQUERIES = {
  LG: `(min-width: ${SCREEN_SIZE.LG}px)`,
  MD_LG: `(min-width: ${SCREEN_SIZE.MD}px)`,
  MD: `(min-width: ${SCREEN_SIZE.MD}px)
    and (max-width: ${SCREEN_SIZE.LG - 1}px)`,
  SM_MD: `(max-width: ${SCREEN_SIZE.LG - 1}px)`,
  SM: `(max-width: ${SCREEN_SIZE.MD - 1}px)`,
};
