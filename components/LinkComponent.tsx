import React from 'react';
import Link from 'next/link';

export const LinkComponent = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return <Link href={href}>{children}</Link>;
};
