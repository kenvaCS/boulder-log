import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { createPortal } from 'react-dom'
import { PatternsProvider } from '../../../context/PatternsContext'
import { useClimbsContext } from '../../../context/ClimbsContext'
import DetailPage from '../../../pages/DetailPage' 

type DialogProps = {
children: React.ReactNode
onDismiss: () => void
"aria-label"?: string
"aria-labelledby"?: string
initialFocusRef?: React.RefObject<HTMLElement | null>
};


function Dialog ({
children,
onDismiss,
"aria-label": ariaLabel,
"aria-labelledby": ariaLabelledby,
initialFocusRef,
}: DialogProps) {

let overlayRef = React.useRef<HTMLDivElement>(null);
let contentRef = React.useRef<HTMLDivElement>(null);
let previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

React.useEffect(() => {
  previouslyFocusedRef.current = document.activeElement as HTMLElement | null
  
  let focusTarget = initialFocusRef?.current ?? contentRef.current;

  if (focusTarget) {
      focusTarget.focus();
  }

  function onKeyDown(e: KeyboardEvent) {
      if (e.key == "Escape") {
          e.stopPropagation()
          onDismiss()
          return;
      }

      if (e.key == "Tab") {
          let container = contentRef.current
          if (!container) return;

      // if there are focusable elements, let us tab through them to see
          let focusable = getFocusableElements(container);
          if (focusable.length === 0) {
              e.preventDefault()
              container.focus()
              return;
          }

          let activeElement = document.activeElement as HTML | null
          let currentIndex = focusable.indexOf(activeElement ?? focusable[0]);
      
      let nextIndex = currentIndex; 

      if (e.shiftKey) {
          nextIndex = currentIndex <= 0 ? focusable.length - 1: currentIndex - 1;
      } else {
          nextIndex = currentIndex === focusable.length - 1 ? 0 : currentIndex + 1;
      }

      e.preventDefault()
      focusable[nextIndex].focus()
      }
}   

document.addEventListener("keydown", onKeyDown);

return () => {
  document.removeEventListener("keydown", onKeyDown);
  previouslyFocusedRef.current?.focus()
};
}, [initialFocusRef, onDismiss]);

return createPortal(
<div className="fixed inset-0 bg-black/20 flex items-center justify-end p-6 z-[1000] backdrop-blur-[2px] " 
      ref={overlayRef}
      onClick={(e) => {
          if (e.target === e.currentTarget) {
              onDismiss();
          }
      }}
  >
  
      <div className="bg-white rounded-xl h-full max-w-[min(480px, 100%)] w-1/2 p-6" 
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            tabIndex={-1}
        >

            {children}
        </div>
    </div>,
    document.body,
  );
}
        
        
function getFocusableElements(container: HTMLElement) {
return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]',
      ),  
  ).filter((element) => !element.hasAttribute("disabled"));         
}

export default function Modal() {
  
  let navigate = useNavigate() // i assume this is so we can click out
  //let { id } = useParams<"id">();
  //let image = getImageById(Number(id))
  let buttonRef = React.useRef<HTMLButtonElement>(null);
  const { id } = useParams<"id">();
  const { climbs, deleteClimb } = useClimbsContext();
  const climb = climbs.find(c => c.id === id)

  if (!climb) return null // simply closes modal

  function onDismiss(){
      navigate(-1)
  } 
  
  return (
      <PatternsProvider>
          <Dialog
              aria-labelledby="label"
              onDismiss={onDismiss}
              initialFocusRef={buttonRef}
          >
            <DetailPage />
            <button
                className="block mt-4"
                ref={buttonRef}
                onClick={onDismiss}
            >
              Close
            </button>
         </Dialog>
      </PatternsProvider>
  )
}
