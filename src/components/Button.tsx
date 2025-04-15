import React from 'react';
import Text from './Text';
import { cn } from '@/lib/utils';

const Button = ({
     children,
     variant = 'primary',
     size = 'default',
     disabled = false,
     onClick,
     className = '',
     textClassName = '',
     ...props
}: {
     children: React.ReactNode,
     variant?: 'primary' | 'secondary' | 'outline',
     size?: 'default' | 'lg',
     disabled?: boolean,
     onClick?: () => void,
     className?: string,
     textClassName?: string,
}) => {
     // Base classes that are common across all variants
     const baseClasses = "flex w-fit justify-center items-center cursor-pointer transition-all duration-500 select-none";

     // Size-specific classes
     const sizeClasses = {
          default: {
               container: "px-[15px] py-[10px] md:px-[20px] md:py-[15px]",
               text: "text-[14px] md:text-[18px] leading-[22px]"
          },
          lg: {
               container: "px-[25px] py-[15px] md:px-[30px] md:py-[20px]",
               text: "text-[22px] md:text-[25px] leading-[35px]"
          }
     };

     // Variant-specific classes
     const variantClasses = {
          primary: {
               container: "bg-[#EA580C]/10 hover:bg-[#EA580C]/15",
               text: "text-[#EA580C]"
          },
          secondary: {
               container: "border-zinc-600/10 border-[2px] hover:bg-[#D9D9D9]/5 hover:border-zinc-600/15",
               text: "text-zinc-600"
          },
          outline: {
               container: "border-[#EA580C]/10 border-[2px] hover:bg-[#EA580C]/5",
               text: "text-[#EA580C]"
          }
     };

     // Combine all classes
     const containerClasses = `
    ${baseClasses}
    ${variantClasses[variant].container}
    ${sizeClasses[size].container}
    ${className}
  `.trim();

     const textClasses = `
    ${variantClasses[variant].text}
    ${sizeClasses[size].text}
    font-semibold
    ${textClassName}
  `.trim();

     return (
          <div
               onClick={onClick}
               className={cn(
                    containerClasses
               )} {...props}>
               <Text className={textClasses}>
                    {children}
               </Text>
          </div>
     );
};

export default Button;