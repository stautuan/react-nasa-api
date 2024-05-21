import { Link, NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';

function PageNav() {
  return (
    <nav className={styles.PageNav}>
      <Link to="/">Home</Link>

      <ul>
        <li>
          <NavLink to="/apod" className="link">
            Space
          </NavLink>
        </li>
        <li>
          <NavLink to="/curiosity" className="link">
            Mars
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="link">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
