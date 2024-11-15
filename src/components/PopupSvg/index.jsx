import { useRef } from 'react';
import ZoomInSvg from './zoom_in.svg';
import CloseSvg from './close.svg';
import styles from './styles.module.css';

export default function PopupSvg({ children }) {
  const svgDialog = useRef(null);

  // 打开弹框
  const popupDialog = () => {
    svgDialog.current.showModal();
  }

  return (
    <div className={styles.container}>
      <dialog className={styles.popupDialog} ref={svgDialog}>
        <form method="dialog" className={styles.dlgForm}>
          { children }
          <button className={styles.btnSvgBroder}>
            <CloseSvg className={styles.btnSvg}/>
          </button>
        </form>
      </dialog>
      <div className={styles.btnSvgBroder} onClick={popupDialog}>
        <ZoomInSvg className={styles.btnSvg}/>
      </div>
      { children }
    </div>
  );
}
