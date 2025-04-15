import React from 'react';

/**
 * Detects if a character is Persian/Farsi
 * @param char - The character to check
 * @returns boolean - True if the character is Persian, false otherwise
 */
export const isPersianChar = (char: string): boolean => {
     // Persian Unicode range: U+0600 to U+06FF
     const persianRegex = /[\u0600-\u06FF]/;
     return persianRegex.test(char);
};

/**
 * Splits text by script and wraps each part with appropriate font
 * @param text - The text to format
 * @returns React elements with appropriate font classes
 */
export const formatTextWithScriptDetection = (text: string): React.ReactNode[] => {
     const result: React.ReactNode[] = [];
     let currentScript = '';
     let currentText = '';

     for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const isPersian = isPersianChar(char);
          const charScript = isPersian ? 'fa' : 'en';

          // If script changes or we're at the end of the text
          if (charScript !== currentScript || i === text.length - 1) {
               // If we have accumulated text, add it with the appropriate class
               if (currentText) {
                    result.push(
                         <span key={`${i}-${currentScript}`} className={currentScript === 'fa' ? 'font-fa' : 'font-en'}>
                              {currentText}
                         </span>
                    );
               }

               // Reset for the new script
               currentScript = charScript;
               currentText = char;
          } else {
               // Add to current text if script hasn't changed
               currentText += char;
          }
     }

     // Handle the last segment if needed
     if (currentText) {
          result.push(
               <span key={`end-${currentScript}`} className={currentScript === 'fa' ? 'font-fa' : 'font-en'}>
                    {currentText}
               </span>
          );
     }

     return result;
}; 