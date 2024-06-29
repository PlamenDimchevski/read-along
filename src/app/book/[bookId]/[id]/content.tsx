'use client';

import { BookOpenIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { Character } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

function hideTools(element: HTMLDivElement | null, button?: HTMLButtonElement | null) {
   if (!element) {
      return;
   }

   element.style.opacity = '0';
   element.style.visibility = 'hidden';
   element.style.zIndex = '-1';

   if (!button) {
      return;
   }
   button.classList.add('hidden');
}

export function ChapterContent({
   content,
   characters,
}: {
   content: string | undefined;
   characters: Character[] | undefined;
}) {
   // Utilize refs instead of adding states, to avoid losing selection on state update / rerender
   const contentRef = useRef<HTMLDivElement>(null);
   const controlsRef = useRef<HTMLDivElement>(null);
   const positionDelay = useRef<NodeJS.Timeout>();
   const contentText = useRef<HTMLTextAreaElement>(null);
   const chapterSelection = useRef<HTMLSelectElement>(null);
   const removeButton = useRef<HTMLButtonElement>(null);

   const [chapterContent, setChapterContent] = useState(content);
   const [edit, setEdit] = useState(false);

   const onSelectionChange = () => {
      clearTimeout(positionDelay.current);
      const selection = window?.getSelection();
      const selectedText = selection?.toString();
      const clickedInCharacter = selection?.focusNode?.parentElement?.classList.contains('character');

      if (!contentRef.current?.contains(selection?.focusNode || null)) {
         hideTools(controlsRef.current, removeButton.current);
         return;
      }

      if (!selectedText) {
         hideTools(controlsRef.current, removeButton.current);
      }

      if (clickedInCharacter && selection?.focusNode?.parentNode) {
         const range = selection?.getRangeAt(0);
         range?.selectNodeContents(selection?.focusNode?.parentNode);
         removeButton.current?.classList.remove('hidden');
      }

      if (selection?.isCollapsed) {
         return;
      }

      positionDelay.current = setTimeout(() => {
         const range = selection?.getRangeAt(0);
         const { left, top } = range?.getBoundingClientRect() || { left: 0, top: 0 };

         if (!controlsRef?.current) {
            return;
         }
         if (!contentRef.current) {
            return;
         }

         const { left: parentLeft, top: parentTop } = contentRef.current.getBoundingClientRect();

         controlsRef.current.style.opacity = '1';
         controlsRef.current.style.visibility = 'visible';
         controlsRef.current.style.zIndex = '1';
         controlsRef.current.style.top = `${top + window.scrollY - (parentTop + window.scrollY) - 35}px`;
         controlsRef.current.style.left = `${left + window.scrollX - (parentLeft + window.scrollX)}px`;
      }, 500);
   };

   const markContent = () => {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const selectedContent = document.createRange();

      if (!range) {
         return;
      }

      const selectedCharacter = characters?.find(item => item.id === Number(chapterSelection.current?.value));

      selectedContent.setStart(range.startContainer, range.startOffset);
      selectedContent.setEnd(range.endContainer, range.endOffset);

      const startContainer = selectedContent?.startContainer as HTMLElement;

      let wrapper = document.createElement('span');

      if (startContainer?.classList?.contains('character')) {
         let wrapper = startContainer;
         wrapper.style.backgroundColor = selectedCharacter?.color || 'rgba(128,128,128,.6)';
         wrapper.dataset.tip = selectedCharacter?.name || 'unknown';
         wrapper.dataset.id = String(selectedCharacter?.id) || '';
         range?.selectNode(wrapper);
         contentChange();
         return;
      }

      wrapper.style.backgroundColor = selectedCharacter?.color || 'rgba(128,128,128,.6)';
      wrapper.classList.add('character');
      wrapper.classList.add('tooltip');
      wrapper.classList.add('inline');
      wrapper.dataset.tip = selectedCharacter?.name || 'unknown';
      wrapper.dataset.id = String(selectedCharacter?.id) || '';
      wrapper.appendChild(selectedContent.extractContents());
      selectedContent.insertNode(wrapper);
      range?.selectNode(wrapper);
      contentChange();
   };

   const removeContentMark = () => {
      const selection = window?.getSelection();
      const range = selection?.getRangeAt(0);
      const selectedElement = range?.startContainer as HTMLSpanElement;

      if (!selectedElement.classList.contains('character') || !selectedElement?.textContent) {
         return;
      }

      const textNode = document.createTextNode(selectedElement?.textContent);
      selectedElement.parentNode?.replaceChild(textNode, selectedElement);
      hideTools(controlsRef.current, removeButton.current);
      contentChange();
   };

   const contentChange = () => {
      if (!contentText.current?.value) {
         return;
      }
      if (!contentRef.current?.innerHTML) {
         return;
      }
      setChapterContent(contentRef.current?.innerHTML);
   };

   useEffect(() => {
      hideTools(controlsRef.current, removeButton.current);
      document.addEventListener('selectionchange', onSelectionChange);
      return () => {
         clearTimeout(positionDelay.current);
         document.removeEventListener('selectionchange', onSelectionChange);
      };
   }, []);

   return (
      <article className="indicator prose w-auto">
         <span className="badge indicator-item -left-7">
            <label className="swap tooltip tooltip-right inline-grid" data-tip="Edit chapter text">
               <input type="checkbox" onChange={e => setEdit(e.target.checked)} />
               <PencilSquareIcon className="swap-off h-5 w-5 fill-current" />
               <BookOpenIcon className="swap-on h-5 w-5 fill-current" />
            </label>
         </span>

         <div ref={controlsRef} className="join absolute w-min" style={{ opacity: 0, visibility: 'hidden' }}>
            <button type="button" className="btn join-item btn-neutral btn-xs" onClick={markContent}>
               Mark
            </button>
            <select
               defaultValue={''}
               ref={chapterSelection}
               className="join-item select select-xs max-w-xs bg-neutral text-neutral-content"
            >
               <option value="" disabled>
                  Pick character
               </option>
               {characters?.map(item => (
                  <option value={item.id} key={item.id}>
                     {item.name}
                  </option>
               ))}
            </select>
            <button
               ref={removeButton}
               type="button"
               className="btn join-item btn-neutral btn-xs hidden"
               onClick={removeContentMark}
            >
               Remove
            </button>
         </div>

         <div
            ref={contentRef}
            className="read-along-content-editor textarea textarea-bordered whitespace-pre-line"
            contentEditable={edit}
            dangerouslySetInnerHTML={{ __html: chapterContent || '' }}
            onInput={contentChange}
         ></div>
         <textarea ref={contentText} name="content" className="hidden" defaultValue={chapterContent}></textarea>
      </article>
   );
}
