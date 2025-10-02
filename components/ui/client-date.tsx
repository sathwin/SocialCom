'use client';

import { useEffect, useState } from 'react';

interface ClientDateProps {
  children: () => string;
}

export function ClientDate({ children }: ClientDateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span suppressHydrationWarning>{children()}</span>;
  }

  return <span>{children()}</span>;
}
