import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuizFormValues } from "@/lib/validationSchema";
import { useFormContext } from "react-hook-form";

interface QuizOptionsProps {
  index: number;
}

export default function QuizOptions({ index }: QuizOptionsProps) {
  const { control } = useFormContext<QuizFormValues>();

  return (
    <div className="space-y-4">
      {[0, 1, 2, 3].map((optionIndex) => (
        <FormField
          key={optionIndex}
          control={control}
          name={`questions.${index}.options.${optionIndex}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-muted-foreground">
                Option {optionIndex + 1}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={`Option ${optionIndex + 1}`}
                  className="bg-secondary/10 border-secondary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
