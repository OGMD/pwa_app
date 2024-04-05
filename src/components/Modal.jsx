import React from 'react'
import { IoCloseSharp } from "react-icons/io5";

function Modal({titulo, handleClose, show, children}) {
    const showHideClassName = show ? "overlay " : "overlay display-none";
  return (
    <>
        <div className={showHideClassName}>
            <div className="contenedorModal">
                <div className="headerModal">
                    <h3 className="h3title">{titulo}</h3>
                </div>
                {children}
                <button className="btnClose" onClick={handleClose}><IoCloseSharp className='iconClose'/></button>
            </div>
        </div>
    </>
  )
}

export default Modal