import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuizFormValues } from "@/lib/zod/validationSchema";
import { useFormContext } from "react-hook-form";

interface QuizQuestionProps {
  index: number;
}

export default function QuizQuestion({ index }: QuizQuestionProps) {
  const { control } = useFormContext<QuizFormValues>();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name={`questions.${index}.text`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold">
              Question {index + 1}
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Entrez votre question"
                className="bg-primary/5 border-primary/20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
      <FormField
        control={control}
        name={`questions.${index}.correctOptionIndex`}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-md font-medium">
              Réponse correcte
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value.toString()}
                className="flex flex-col space-y-1"
              >
                {[0, 1, 2, 3].map((optionIndex) => (
                  <FormItem
                    key={optionIndex}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={optionIndex.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Option {optionIndex + 1}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
