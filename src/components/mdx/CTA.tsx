
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CTAProps {
  href: string;
  label: string;
}

export const CTA = ({ href, label }: CTAProps) => {
  return (
    <div className="my-6 p-6 bg-primary/10 border border-primary/20 rounded-lg text-center">
      <Link to={href}>
        <Button size="lg" className="gap-2">
          {label}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};
