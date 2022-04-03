import { ReactElement, useRef, FC, useEffect } from 'react';

import * as Types from './Overlay.types';

const Overlay: FC<Readonly<Types.OverlayProps>> = ({ isShowing, children }): ReactElement => {
  const domElement = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!domElement.current) {
      return;
    }

    if (isShowing) {
      (domElement.current as any).showModal(); // https://github.com/microsoft/TypeScript/issues/48267
      return;
    }

    (domElement.current as any).close(); // https://github.com/microsoft/TypeScript/issues/48267
  }, [isShowing]);

  return (
    <dialog
      ref={domElement}
      open
    >
      {children}
    </dialog>
  );
};

export default Overlay;
