import { Link, NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';

function PageNav() {
  return (
    <nav className={styles.PageNav}>
      <Link className={styles.link} to="/">
        Home
      </Link>

      <ul>
        <li>
          <NavLink className={styles.link} to="/apod">
            Space
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/curiosity">
            Mars
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/about">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
