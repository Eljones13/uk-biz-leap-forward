
import { Check, X } from "lucide-react";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export const ProsCons = ({ pros, cons }: ProsConsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      <div className="border border-green-200 rounded-lg p-4 bg-green-50">
        <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
          <Check className="h-5 w-5" />
          Pros
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2 text-green-800">
              <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
        <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
          <X className="h-5 w-5" />
          Cons
        </h3>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2 text-red-800">
              <X className="h-4 w-4 mt-0.5 text-red-600 flex-shrink-0" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
