import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = (url) => {
  const location = useLocation();
  return (
    <nav>
      <Link
        to='/'
        className={location.pathname === '/' ? 'breadcrumb-active' : 'breadcrumb-not-active'}
      >
        Home
      </Link>
      <span className='breadcrumb-arrow'>&gt;</span>
      <Link
        to={url.link}
        className={
          location.pathname.startsWith(url.link) ? 'breadcrumb-active' : 'breadcrumb-not-active'
        }
      >
        {url.slug}
      </Link>
    </nav>
  );
};

export default Breadcrumbs;
