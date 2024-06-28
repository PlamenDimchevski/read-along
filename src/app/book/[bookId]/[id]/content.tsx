'use client';

import { BookOpenIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

function hideTools(element: HTMLDivElement | null) {
   if (!element) {
      return;
   }

   element.style.opacity = '0';
   element.style.visibility = 'hidden';
   element.style.zIndex = '-1';
}

export function ChapterContent({ content }: { content: string | undefined }) {
   const contentRef = useRef<HTMLDivElement>(null);
   const controlsRef = useRef<HTMLDivElement>(null);
   const positionDelay = useRef<NodeJS.Timeout>();
   const contentText = useRef<HTMLTextAreaElement>(null);
   const [edit, setEdit] = useState(false);

   const onSelectionChange = () => {
      clearTimeout(positionDelay.current);
      const selection = window?.getSelection();
      const selectedText = selection?.toString();

      if (!contentRef.current?.contains(selection?.focusNode || null)) {
         hideTools(controlsRef.current);
         return;
      }

      if (!selectedText) {
         hideTools(controlsRef.current);
      }

      if (selection?.isCollapsed) {
         return;
      }

      positionDelay.current = setTimeout(() => {
         const range = selection?.getRangeAt(0);
         const rect = range?.getBoundingClientRect();
         if (controlsRef?.current) {
            controlsRef.current.style.opacity = '1';
            controlsRef.current.style.visibility = 'visible';
            controlsRef.current.style.zIndex = '1';
            controlsRef.current.style.top = `${(rect?.top || 0) - 35}px`;
            controlsRef.current.style.left = `${rect?.left}px`;
         }
      }, 100);
   };

   const markContent = () => {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const selectedContent = document.createRange();

      if (!range) {
         return;
      }

      selectedContent.setStart(range.startContainer, range.startOffset);
      selectedContent.setEnd(range.endContainer, range.endOffset);
      const wrapper = document.createElement('span');
      wrapper.style.backgroundColor = 'rgba(0,0,255,.6)';
      wrapper.appendChild(selectedContent.extractContents());
      selectedContent.insertNode(wrapper);
      contentChange();
   };

   const contentChange = () => {
      if (!contentText.current?.value) {
         return;
      }
      if (!contentRef.current?.innerHTML) {
         return;
      }
      contentText.current.value = contentRef.current?.innerHTML;
   };

   const updateOnEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Enter') {
         return;
      }

      if (event.ctrlKey === true) {
         return;
      }

      if (event.shiftKey === true) {
         return;
      }

      if (event.altKey === true) {
         return;
      }

      if (event.metaKey === true) {
         return;
      }

      event.preventDefault();

      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      if (!range) {
         return;
      }

      const paragraph = document.createElement('p');
      paragraph.innerHTML = '<br/>';
      range.deleteContents();
      range.insertNode(paragraph);

      const updatePosition = document.createRange();
      updatePosition.setStart(paragraph, 0);
      updatePosition.setEnd(paragraph, 0);

      selection?.removeAllRanges();
      selection?.addRange(updatePosition);

      console.log(event);
   };

   useEffect(() => {
      hideTools(controlsRef.current);
      document.addEventListener('selectionchange', onSelectionChange);
      return () => {
         clearTimeout(positionDelay.current);
         document.removeEventListener('selectionchange', onSelectionChange);
      };
   }, []);

   return (
      <>
         <article className="indicator prose w-auto">
            <span className="badge indicator-item">
               <label className="swap tooltip inline-grid" data-tip="Edit content">
                  <input type="checkbox" onChange={e => setEdit(e.target.checked)} />
                  <PencilSquareIcon className="swap-off h-5 w-5 fill-current" />
                  <BookOpenIcon className="swap-on h-5 w-5 fill-current" />
               </label>
            </span>

            <div
               ref={contentRef}
               className="read-along-content-editor textarea textarea-bordered whitespace-pre-line"
               contentEditable={edit}
               dangerouslySetInnerHTML={{ __html: content || '' }}
               onInput={contentChange}
               onKeyUp={updateOnEnter}
            ></div>
            <textarea ref={contentText} name="content" className="hidden" defaultValue={content}></textarea>
         </article>
         <div ref={controlsRef} className="join absolute w-min" style={{ opacity: 0, visibility: 'hidden' }}>
            <button type="button" className="btn join-item btn-neutral btn-xs" onClick={markContent}>
               Add
            </button>
            <select defaultValue={''} className="join-item select select-xs max-w-xs bg-neutral text-neutral-content">
               <option value="" disabled>
                  Pick character
               </option>
               <option>Homer</option>
               <option>Marge</option>
               <option>Bart</option>
               <option>Lisa</option>
               <option>Maggie</option>
            </select>
            <button type="button" className="btn join-item btn-neutral btn-xs">
               Remove
            </button>
         </div>
      </>
   );
}
