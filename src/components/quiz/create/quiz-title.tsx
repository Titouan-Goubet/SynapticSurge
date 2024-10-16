import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function QuizTitle() {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem className="mt-6">
          <FormLabel>Titre du quiz</FormLabel>
          <FormControl>
            <Input placeholder="Entrez le titre du quiz" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
