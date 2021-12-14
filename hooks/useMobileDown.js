import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useMobileDown(params=1025) {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down(params));
  return mdDown;
}