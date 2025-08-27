
interface StepProps {
  n: number;
  title: string;
  children: React.ReactNode;
}

export const Step = ({ n, title, children }: StepProps) => {
  return (
    <div className="flex gap-4 my-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
        {n}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="prose prose-sm max-w-none">{children}</div>
      </div>
    </div>
  );
};
