'use client'
import { useEffect } from 'react'
import css from './Modal.module.css'
import { createPortal } from 'react-dom'


export default function Modal({ onClose, children }: { onClose: () => void, children: React.ReactNode }) {
  useEffect(() => {
  document.body.style.overflow = 'hidden';
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  window.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={onClose} role="dialog" aria-modal="true">
        <div className={css.modal} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
    </div>,
    document.body
  )
}