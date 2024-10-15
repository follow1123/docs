import { useRef } from 'react';
import styles from './styles.module.css';

export default function PopupMermaid() {
  const mermaidDialog = useRef(null);
  const mermaidContainer = useRef(null);

  // 打开弹框
  const popupDialog = (e) => {
    if(mermaidContainer.current){
      // 获取上个兄弟元素
      const docuMermaidContainer = e.target.previousElementSibling
      if (docuMermaidContainer) {
        // 判断这个元素是否是mermaid元素的容器
        var dmcClassName = docuMermaidContainer.className;
        if(dmcClassName.startsWith("docusaurus-mermaid-container")){
          // 克隆svg并显示
          var mermaidSvg = docuMermaidContainer.firstChild.cloneNode(true)
          mermaidContainer.current.innerHTML = "";
          mermaidContainer.current.appendChild(mermaidSvg);
          if(mermaidDialog.current){
            mermaidDialog.current.showModal();
          }
        }
      }
    }
  }

  // 关闭弹框
  const closeDialog = () => {
    if(mermaidDialog.current){
      mermaidDialog.current.close();
    }
  }

  return (
    <>
      <button className={styles.popupBtn} onClick={popupDialog}>Popup</button>
      <dialog className={styles.popupDialog} ref={mermaidDialog}>
          <form method="dialog">
              <div ref={mermaidContainer}></div>
              <button onClick={closeDialog}>Close</button>
          </form>
      </dialog>
    </>
  );
}
