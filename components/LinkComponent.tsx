import Link from 'next/link';

export const LinkComponent = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link href={href} legacyBehavior={false}>
      {children}
    </Link>
  );
};
