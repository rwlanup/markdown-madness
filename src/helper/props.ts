import type { SxProps, Theme } from '@mui/material';
export const mergeSxProps = (...props: (SxProps<Theme> | undefined)[]): SxProps<Theme> => {
  const mergedProps = props.reduce((prevSxProp: SxProps<Theme>, sxProp) => {
    if (prevSxProp && typeof sxProp !== 'undefined') {
      if (Array.isArray(sxProp)) {
        Object.assign(prevSxProp, ...sxProp);
      } else {
        Object.assign(prevSxProp, sxProp);
      }
    }
    return prevSxProp;
  }, {} as SxProps<Theme>);
  return mergedProps;
};
