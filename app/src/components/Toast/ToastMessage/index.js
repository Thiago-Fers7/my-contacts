import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ text, type }) {
  return (
    <Container type={type}>
      {type === 'error' && <img src={xCircleIcon} alt="X" />}
      {type === 'success' && <img src={checkCircleIcon} alt="X" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'default']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
