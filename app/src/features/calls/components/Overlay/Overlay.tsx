import { ReactElement, useRef, FC, useEffect } from 'react';

import * as Types from './Overlay.types'

const Overlay: FC<Readonly<Types.OverlayProps>> = ({isShowing, children}): ReactElement => {
  const domElement = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!domElement.current) {
      return
    }

    if (isShowing) {
      (domElement.current as any).show()

      return
    }

    (domElement.current as any).hide()
  }, [isShowing])

  return (
    <dialog ref={domElement}>
      {children}
    </dialog>
  );
}

export default Overlay
