
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from './MDXComponents';

interface SecureMDXProviderProps {
  children: React.ReactNode;
}

export const SecureMDXProvider = ({ children }: SecureMDXProviderProps) => {
  return (
    <MDXProvider components={mdxComponents}>
      {children}
    </MDXProvider>
  );
};
