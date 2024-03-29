import PropTypes from 'prop-types';

import { Container, Overlay, Footer } from './styles';

import Button from '../Button';
import ReactPortal from '../ReactPortal';

export default function Modal({
  danger = false,
  title,
  children,
  cancelLabel = 'Cancelar',
  isLoading = false,
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  visible,
}) {
  if (!visible) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>
          <Footer>
            <button type="button" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </button>
            <Button type="button" danger={danger} onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
