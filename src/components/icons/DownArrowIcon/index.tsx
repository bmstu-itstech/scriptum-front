import type { FC } from 'react';
import { Props } from '@/components/icons/DownArrowIcon/DownArrowIcon.props';
export const DownArrowIcon: FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      {...props}
      height='30px'
      width='30px'
      version='1.1'
      id='Layer_1'
      viewBox='0 0 512 512'
      xmlSpace='preserve'>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <g>
          {' '}
          <g>
            {' '}
            <g>
              {' '}
              <path d='M256,5.333C114.88,5.333,0,117.76,0,256s114.88,250.667,256,250.667S512,394.24,512,256S397.12,5.333,256,5.333z M256,485.333C126.613,485.333,21.333,382.4,21.333,256S126.613,26.667,256,26.667S490.667,129.493,490.667,256 S385.387,485.333,256,485.333z'></path>{' '}
              <path d='M401.6,178.453c-4.8-3.733-11.52-3.093-15.253,1.493L256,340.373L125.653,179.947c-3.733-4.587-10.453-5.227-15.04-1.493 s-5.227,10.453-1.493,15.04L247.787,364.16c3.733,4.587,10.453,5.227,15.04,1.6c0.533-0.427,1.067-0.96,1.6-1.6l138.667-170.667 C406.827,188.907,406.08,182.187,401.6,178.453z'></path>{' '}
            </g>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  );
};
