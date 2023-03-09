import styles from './style.module.scss';
import { Link } from 'react-router-dom';

interface ComponentTypes {
  Component: () => JSX.Element;
  route: string;
  message: string;
}

const RegistrationComponent = ({
  Component,
  route,
  message,
}: ComponentTypes) => {
  return (
    <div className={`${styles.container} text_align_center`}>
      <div className={`${styles.card_body} card card_shadow`}>
        <span className={`font_size_extra_large font_weight_bold text_align_center ${styles.text}`}>
          GraphQL App
        </span>
        <Component />
        <Link style={{ textDecoration: 'none' }} to={route}>
          <span className={`font_size_large text_align_center ${styles.text}`}>
            {message}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationComponent;
