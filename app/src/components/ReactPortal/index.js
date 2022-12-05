import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default function ReactPortal({ containerId = 'portal-root', children }) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }

  return createPortal(children, container);
}

ReactPortal.propTypes = {
  containerId: PropTypes.string,
  children: PropTypes.node.isRequired,
};
