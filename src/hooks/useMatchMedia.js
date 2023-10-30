import { useState, useEffect } from 'react';
import { MEDIAQUERIES } from '../utils/settings';

const mqlSm = window.matchMedia(MEDIAQUERIES.SM);
const mqlMd = window.matchMedia(MEDIAQUERIES.MD);
const mqlLg = window.matchMedia(MEDIAQUERIES.LG);

function getMatchMedia() {
  return {
    isLg: window.matchMedia(MEDIAQUERIES.LG).matches,
    isMdLg: window.matchMedia(MEDIAQUERIES.MD_LG).matches,
    isMd: window.matchMedia(MEDIAQUERIES.MD).matches,
    isSmMd: window.matchMedia(MEDIAQUERIES.SM_MD).matches,
    isSm: window.matchMedia(MEDIAQUERIES.SM).matches,
  };
}

export default function useMatchMedia() {
  const [matchMedia, setMatchMedia] = useState(getMatchMedia());

  useEffect(() => {
    function handler() {
      setMatchMedia(getMatchMedia());
    }

    mqlSm.addEventListener('change', handler);
    mqlMd.addEventListener('change', handler);
    mqlLg.addEventListener('change', handler);

    return () => {
      mqlSm.removeEventListener('change', handler);
      mqlMd.removeEventListener('change', handler);
      mqlLg.removeEventListener('change', handler);
    };
  }, []);
  return [matchMedia];
}