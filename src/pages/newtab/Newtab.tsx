import Text from "@/components/Text";
import LocaleSwitcherModal from '@/components/LocaleSwitcherModal';
import { useModal } from '@/hooks/useModalStore';
import { getLanguage, getTextDirection } from '@/utils/languageUtils';
import { LanguagesIcon } from "lucide-react";
import { getTranslation } from '@/utils/translationUtils';
import NotesContainer from '@/components/NotesContainer';
import { useState } from 'react';

export default function Newtab() {
  const { onModalOpen } = useModal();
  const currentLanguage = getLanguage();
  const direction = getTextDirection(currentLanguage);
  const [hasNotes, setHasNotes] = useState(false);

  return (
    <div
      onClick={(e) => e.preventDefault()}
      className="w-full h-screen overflow-hidden relative" dir={direction}>
      {!hasNotes && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <Text className="antialiased text-text text-[25px] md:text-[28px] font-medium">
            {getTranslation('app.name', currentLanguage)}
          </Text>
        </div>
      )}

      <NotesContainer onNotesChange={setHasNotes} />
      <LocaleSwitcherModal />

      <button
        onClick={() => onModalOpen("locale_switcher")}
        className="fixed top-8 right-8 bg-border/5 outline-0 border-[2px] border-border/[8%] backdrop-blur-md rounded-full cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-110 p-[10px]"
      >
        <LanguagesIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
