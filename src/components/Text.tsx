import { cn } from "@/lib/utils";
import { formatTextWithScriptDetection } from "@/utils/scriptUtils";

const Text = ({
     children,
     className,
}: {
     children: React.ReactNode,
     className?: string,
}) => {
     // If children is a string, format it with script detection
     const formattedChildren = typeof children === 'string'
          ? formatTextWithScriptDetection(children)
          : children;

     return (
          <div className={cn(
               "tracking-[-1px] antialiased",
               className,
          )}>
               {formattedChildren}
          </div>
     );
}

export default Text;