
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, X, Confetti } from "lucide-react";

interface SuccessCelebrationProps {
  onClose: () => void;
  achievement: string;
  message: string;
}

export const SuccessCelebration = ({ onClose, achievement, message }: SuccessCelebrationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}>
      <Card className={`max-w-md mx-4 transform transition-all duration-300 ${
        isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
      }`}>
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-xl">Congratulations! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-primary">{achievement}</h3>
            <p className="text-muted-foreground">{message}</p>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg">
            <p className="text-sm">
              <strong>Fun fact:</strong> 80% of entrepreneurs who reach this milestone 
              successfully complete their business formation. You're on the right track! 🚀
            </p>
          </div>
          <Button onClick={onClose} className="w-full">
            Keep Going!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
