'use client';

import Link from 'next/link';
import { useNavigationLoading } from '@/context/NavigationLoadingContext';

const NavigationLink = ({ href, children, className, ...props }) => {
  const { setLoading } = useNavigationLoading();

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default NavigationLink;

