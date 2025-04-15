import React, { useTransition } from "react";
import { useModal } from "@/hooks/useModalStore";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import Text from "./Text";
import { Language, getLanguage, setLanguage, getTextDirection } from "@/utils/languageUtils";
import { getTranslation } from "@/utils/translationUtils";
import { cn } from "@/lib/utils";
import Button from "./Button";

const LocaleSwitcherModal = () => {
     const { isModalOpen, onModalClose, type } = useModal();
     const isOpen = isModalOpen && type === "locale_switcher";

     const [isPending, startTransition] = useTransition();
     const currentLanguage = getLanguage();
     const direction = getTextDirection(currentLanguage);

     const locales = [
          {
               value: 'en' as Language,
               label: currentLanguage === 'en' ? 'English' : 'انگلیسی',
          },
          {
               value: 'fa' as Language,
               label: currentLanguage === 'en' ? 'Persian' : 'فارسی',
          }
     ];

     function onChange(value: Language) {
          startTransition(() => {
               setLanguage(value);
               window.location.reload(); // Reload to apply language change
          });
     }

     return (
          <Dialog.Root open={isOpen} onOpenChange={onModalClose}>
               <Dialog.Portal>
                    <div className="relative">
                         <Dialog.Overlay className="fixed inset-0 bg-black/15 backdrop-blur-sm" />
                         <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[400px] bg-white/80 focus-visible:border-none focus-visible:ring-0 focus:outline-0 backdrop-blur-sm p-6 border-[2px] border-primary/5" dir={direction}>
                              <div className="mb-[15px]">
                                   <VisuallyHidden.Root>
                                        <Dialog.Title />
                                        <Dialog.Description />
                                   </VisuallyHidden.Root>

                                   <div className="flex flex-col gap-y-[25px]">
                                        <Text className="text-[25px] font-semibold text-[#4F4F4F] text-start">
                                             {getTranslation('localeSwitcher.title', currentLanguage)}
                                        </Text>

                                        <div className="flex gap-x-[15px]">
                                             {locales.map((locale, index) => (
                                                  <div
                                                       key={index}
                                                       onClick={() => locale.value !== currentLanguage ? onChange(locale.value) : null}
                                                       className={cn(
                                                            "group flex flex-grow items-center gap-x-[10px] cursor-pointer border-[1px] border-border/5 hover:border-primary/10 hover:bg-primary/5 transition-all duration-500 px-[10px] py-[10px]",
                                                            locale.value === currentLanguage && "border-primary/10 bg-primary/5"
                                                       )}>
                                                       <div className={cn(
                                                            "p-[10px] rounded-full border-[1px] border-border/5 group-hover:border-primary/10 transition-all duration-500",
                                                            locale.value === currentLanguage && "border-primary/10"
                                                       )}>
                                                            <svg
                                                                 className={cn(
                                                                      "text-border group-hover:text-primary transition-all duration-500 size-5",
                                                                      locale.value === currentLanguage && "text-primary"
                                                                 )}
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 width="24"
                                                                 height="24"
                                                                 viewBox="0 0 24 24"
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 strokeWidth="2"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round">
                                                                 <circle cx="12" cy="12" r="10" />
                                                                 <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                                                 <path d="M2 12h20" />
                                                            </svg>
                                                       </div>

                                                       <Text className={cn(
                                                            "font-medium group-hover:text-primary transition-all duration-500 text-[18px] leading-[2rem] tracking-[-0.5px]",
                                                            locale.value === currentLanguage && "text-primary"
                                                       )}>
                                                            {locale.label}
                                                       </Text>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>

                              <div className="flex flex-row w-full gap-x-[15px] justify-end items-center gap-2 mt-[15px]">
                                   <Text className="font-normal max-w-[150px] text-end text-[13px] text-border tracking-[-0.3px]">
                                        {getTranslation('localeSwitcher.moreLanguagesComingSoon', currentLanguage)}
                                   </Text>

                                   <Dialog.Close asChild>
                                        <Button
                                             className="md:py-[12px] md:px-[18px] h-full border-[1px] border-border/10 hover:border-primary/10 hover:bg-primary/5 transition-all duration-500"
                                             onClick={() => onModalClose()}>
                                             {getTranslation('localeSwitcher.close', currentLanguage)}
                                        </Button>
                                   </Dialog.Close>
                              </div>
                         </Dialog.Content>
                    </div>
               </Dialog.Portal>
          </Dialog.Root>
     );
}

export default LocaleSwitcherModal; 