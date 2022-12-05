import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({
  children, type = 'button', disabled = false, isLoading = false, danger = false, onClick,
}) {
  return (
    <StyledButton disabled={disabled || isLoading} type={type} danger={danger} onClick={onClick}>
      {isLoading ? <Spinner size="1.6rem" /> : children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};
