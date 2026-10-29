import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  params: {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>(() => {
    // Read from window.location.pathname or fallback to '/'
    const p = window.location.pathname || '/';
    return p;
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derive parameters (e.g. /work/:slug)
  const params: Record<string, string> = {};
  if (path.startsWith('/work/')) {
    params.slug = path.replace('/work/', '').split('/')[0];
  } else if (path.startsWith('/updates/')) {
    params.updateSlug = path.replace('/updates/', '').split('/')[0];
  }

  // Synchronize document.title with context per UI/UX guidelines
  useEffect(() => {
    let title = 'Alejandro Rivera: Portafolio de Diseño Publicitario';
    if (path === '/about') {
      title = 'Sobre mí · Alejandro Rivera';
    } else if (path === '/work') {
      title = 'Proyectos · Alejandro Rivera';
    } else if (params.slug) {
      const formattedSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      title = `${formattedSlug} · Alejandro Rivera`;
    } else if (path === '/scaler' || path === '/working-on') {
      title = 'Working on: Scaler · Alejandro Rivera';
    } else if (path === '/updates') {
      title = 'Bitácora & Actualizaciones · Alejandro Rivera';
    } else if (path === '/contact') {
      title = 'Contacto · Alejandro Rivera';
    }
    document.title = title;
  }, [path, params.slug]);

  return (
    <RouterContext.Provider value={{ path, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({
  href,
  to,
  children,
  className = '',
  onClick,
  target,
  rel,
  ...props
}: {
  href?: string;
  to?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  [key: string]: any;
}) {
  const { navigate } = useRouter();
  const targetUrl = to || href || '/';

  const isExternal = targetUrl.startsWith('http') || targetUrl.startsWith('mailto:') || targetUrl.startsWith('tel:');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!isExternal && !e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      navigate(targetUrl);
    }
  };

  return (
    <a
      href={targetUrl}
      onClick={handleClick}
      className={className}
      target={isExternal ? (target || '_blank') : target}
      rel={isExternal ? (rel || 'noopener noreferrer') : rel}
      {...props}
    >
      {children}
    </a>
  );
}
