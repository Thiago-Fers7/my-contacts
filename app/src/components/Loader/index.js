import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return createPortal(
    <Overlay>
      <Spinner size="9rem" />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
