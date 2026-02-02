import type { SVGProps } from 'react';

export type Props = SVGProps<SVGSVGElement> & {
  isChecked?: boolean;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
};
