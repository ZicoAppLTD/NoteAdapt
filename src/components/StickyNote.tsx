import React, { useState, useRef, useEffect } from 'react';

interface StickyNoteProps {
     initialX?: number;
     initialY?: number;
     children?: React.ReactNode;
     color?: string;
     onColorChange?: (color: string) => void;
     onDragStart?: () => void;
     onDragEnd?: () => void;
}

const COLORS = ['#14B8A6', '#FF9B73', '#FFE135', '#FFFFFF'];

const StickyNote: React.FC<StickyNoteProps> = ({
     initialX = window.innerWidth / 2 - 100,
     initialY = window.innerHeight / 2 - 100,
     children,
     color = '#FFFFFF',
     onColorChange,
     onDragStart,
     onDragEnd
}) => {
     const [position, setPosition] = useState({ x: initialX, y: initialY });
     const noteRef = useRef<HTMLDivElement>(null);
     const [isDragging, setIsDragging] = useState(false);
     const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

     const handleMouseDown = (e: React.MouseEvent) => {
          if (noteRef.current) {
               setIsDragging(true);
               onDragStart?.();
               const rect = noteRef.current.getBoundingClientRect();
               setDragOffset({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
               });
               e.preventDefault();
          }
     };

     const handleMouseMove = (e: MouseEvent) => {
          if (isDragging && noteRef.current) {
               const noteWidth = noteRef.current.offsetWidth;
               const noteHeight = noteRef.current.offsetHeight;

               let newX = e.clientX - dragOffset.x;
               let newY = e.clientY - dragOffset.y;

               newX = Math.max(0, Math.min(window.innerWidth - noteWidth, newX));
               newY = Math.max(0, Math.min(window.innerHeight - noteHeight, newY));

               setPosition({ x: newX, y: newY });
               e.preventDefault();
          }
     };

     const handleMouseUp = () => {
          setIsDragging(false);
          onDragEnd?.();
     };

     useEffect(() => {
          if (isDragging) {
               window.addEventListener('mousemove', handleMouseMove);
               window.addEventListener('mouseup', handleMouseUp);
          }

          return () => {
               window.removeEventListener('mousemove', handleMouseMove);
               window.removeEventListener('mouseup', handleMouseUp);
          };
     }, [isDragging, dragOffset]);

     return (
          <div
               ref={noteRef}
               className={`absolute w-[350px] h-[350px] bg-white border-[2px] px-[30px] py-[30px] flex flex-col justify-center items-center select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
               style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    backgroundColor: color,
                    borderColor: color
               }}
               onMouseDown={handleMouseDown}
          >
               {children}
               <div className="absolute bottom-4 left-4 flex items-center gap-x-[8px]">
                    {COLORS.map((colorOption) => (
                         <button
                              key={colorOption}
                              onClick={(e) => {
                                   e.stopPropagation();
                                   onColorChange?.(colorOption);
                              }}
                              className="w-[24px] h-[24px] rounded-full hover:scale-110 transition-all duration-300 border-[2px]"
                              style={{
                                   backgroundColor: colorOption === '#FFFFFF'
                                        ? 'rgba(39, 39, 42, 0.05)'
                                        : `${colorOption}80`,
                                   borderColor: colorOption === '#FFFFFF'
                                        ? 'rgba(0, 0, 0, 0.2)'
                                        : colorOption
                              }}
                         />
                    ))}
               </div>
          </div>
     );
};

export default StickyNote; 