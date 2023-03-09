import ReactLoading from 'react-loading';
import { primaryColor, primaryContrastText } from '../themes/main-theme';

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0.3',
        backgroundColor: primaryContrastText,
      }}
    >
      <ReactLoading
        type={'spin'}
        color={primaryColor}
        height='18%'
        width='18%'
        className='opaque'
      />
    </div>
  );
};

export default LoadingScreen;
