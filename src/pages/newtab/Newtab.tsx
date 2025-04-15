import Text from "@/components/Text";
import LocaleSwitcherModal from '@/components/LocaleSwitcherModal';
import { useModal } from '@/hooks/useModalStore';
import { getLanguage, getTextDirection } from '@/utils/languageUtils';
import { LanguagesIcon } from "lucide-react";
import { getTranslation } from '@/utils/translationUtils';

export default function Newtab() {
  const { onModalOpen } = useModal();
  const currentLanguage = getLanguage();
  const direction = getTextDirection(currentLanguage);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center" dir={direction}>
      <header className="h-full max-w-6xl w-full">
        <div className="h-full w-full flex flex-col justify-start text-start gap-y-[30px]">
          <Text className="antialiased text-text text-[25px] md:text-[28px] font-medium">
            {getTranslation('app.name', currentLanguage)}
          </Text>

          <LanguagesIcon
            onClick={() => onModalOpen("locale_switcher")}
            className="cursor-pointer text-zinc-600/80 hover:text-black transition-all duration-500 size-5 mx-[5px]" />
        </div>
      </header>

      <LocaleSwitcherModal />
    </div>
  );
}
