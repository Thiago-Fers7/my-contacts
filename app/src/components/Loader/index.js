import { createPortal } from 'react-dom';

import { Overlay } from './styles';

export default function Loader() {
  return createPortal(
    <Overlay>
      <div />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}
