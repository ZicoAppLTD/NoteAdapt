import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatTextWithScriptDetection } from '@/utils/scriptUtils';
import Text from './Text';
import { getLanguage } from '@/utils/languageUtils';

interface MultiScriptTextAreaProps {
     value: string;
     onChange: (value: string) => void;
     className?: string;
     placeholder?: string;
     style?: React.CSSProperties;
     onMouseDown?: (e: React.MouseEvent) => void;
     autoSize?: {
          minRows?: number;
          maxRows?: number;
     };
     maxLength?: number;
}

const MultiScriptTextArea: React.FC<MultiScriptTextAreaProps> = ({
     value,
     onChange,
     className,
     placeholder,
     style,
     onMouseDown,
     autoSize = { minRows: 1, maxRows: 5 },
     maxLength = 150
}) => {
     const editorRef = useRef<HTMLDivElement>(null);
     const [isFocused, setIsFocused] = useState(false);
     const currentLanguage = getLanguage();

     // Update the contentEditable div's content when value prop changes
     useEffect(() => {
          if (editorRef.current && !isFocused) {
               editorRef.current.innerText = value;
          }
     }, [value, isFocused]);

     const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
          const newText = e.currentTarget.innerText;
          if (newText.length <= maxLength) {
               onChange(newText);
          } else {
               // If text is too long, truncate it to maxLength
               const truncatedText = newText.slice(0, maxLength);
               onChange(truncatedText);
               // Update the contentEditable div's content
               if (editorRef.current) {
                    editorRef.current.innerText = truncatedText;
                    // Move cursor to the end
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(editorRef.current);
                    range.collapse(false);
                    sel?.removeAllRanges();
                    sel?.addRange(range);
               }
          }
     };

     const handlePaste = (e: React.ClipboardEvent) => {
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');
          document.execCommand('insertText', false, text);
     };

     const handleFocus = () => {
          setIsFocused(true);
     };

     const handleBlur = () => {
          setIsFocused(false);
     };

     useEffect(() => {
          if (editorRef.current) {
               const element = editorRef.current;
               const lineHeight = parseInt(getComputedStyle(element).lineHeight) || 24; // Default line height if not set
               const paddingTop = parseInt(getComputedStyle(element).paddingTop) || 0;
               const paddingBottom = parseInt(getComputedStyle(element).paddingBottom) || 0;

               // Calculate the height based on content
               const contentHeight = element.scrollHeight;
               const minHeight = autoSize.minRows ? autoSize.minRows * lineHeight + paddingTop + paddingBottom : lineHeight;
               const maxHeight = autoSize.maxRows ? autoSize.maxRows * lineHeight + paddingTop + paddingBottom : Infinity;

               // Set the height
               element.style.height = 'auto';
               const newHeight = Math.min(Math.max(contentHeight, minHeight), maxHeight);
               element.style.height = `${newHeight}px`;

               // Update the parent container height
               if (element.parentElement) {
                    element.parentElement.style.height = `${newHeight}px`;
               }
          }
     }, [value, autoSize.minRows, autoSize.maxRows]);

     return (
          <div
               className={cn(
                    "relative w-full",
                    className
               )}
               style={{
                    ...style,
                    minHeight: autoSize.minRows ? `${autoSize.minRows * 24}px` : '24px'
               }}
          >
               <div
                    ref={editorRef}
                    contentEditable
                    spellCheck={false}
                    onInput={handleInput}
                    onPaste={handlePaste}
                    onMouseDown={onMouseDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={cn(
                         "outline-none whitespace-pre-wrap break-words w-full",
                         "absolute inset-0 z-10 text-transparent"
                    )}
                    style={{
                         ...style,
                         WebkitUserModify: 'read-write-plaintext-only',
                         caretColor: 'currentColor',
                         overflow: 'hidden',
                         direction: currentLanguage === 'fa' ? 'rtl' : 'ltr',
                         minHeight: '100%'
                    }}
                    onKeyDown={(e) => {
                         if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              document.execCommand('insertText', false, '\n');
                         }
                    }}
                    suppressContentEditableWarning
               />
               {(!value || value.trim() === '') && (
                    <div
                         className={cn(
                              "absolute inset-0 pointer-events-none z-20 text-text/50 tracking-[-1.5px] antialiased",
                              currentLanguage === 'fa' ? 'font-fa rtl' : 'font-en ltr'
                         )}
                    >
                         {placeholder}
                    </div>
               )}
               <div
                    className={cn(
                         "absolute inset-0 pointer-events-none select-text",
                         value ? "" : "opacity-0"
                    )}
                    style={{
                         ...style,
                         userSelect: 'text',
                         direction: currentLanguage === 'fa' ? 'rtl' : 'ltr'
                    }}
                    aria-hidden="true"
               >
                    <Text className={cn(
                         "whitespace-pre-wrap break-words",
                         currentLanguage === 'fa' ? 'font-fa' : 'font-en'
                    )}>
                         {value || placeholder}
                    </Text>
               </div>
          </div>
     );
};

export default MultiScriptTextArea; 