import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Container ({
  children,
  className,
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
  allSides = 0,
  ContainerType = 'div',
}) {
  const predefinedClasses = `
  ${top && top > 0 ? `mt-${top}` : ''}
  ${bottom && bottom > 0 ? `mb-${bottom}` : ''}
  ${left && left > 0 ? `ml-${left}` : ''}
  ${right && right > 0 ? `mr-${right}` : ''}
  ${allSides && allSides > 0 ? `m-${allSides}` : ''}
  `;
  return (
    <ContainerType className={twMerge(predefinedClasses, className)}>
      {children}
    </ContainerType>
  );
};