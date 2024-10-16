import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function QuizTheme() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="theme"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Thème du quiz</FormLabel>
          <FormControl>
            <Input placeholder="Entrez le thème du quiz" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
