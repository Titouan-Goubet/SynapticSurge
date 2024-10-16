import QuizForm from "@/components/quiz/create/quiz-form";

export default function CreateQuizPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center text-black mb-8">
        Créer un nouveau quiz
      </h1>
      <QuizForm />
    </div>
  );
}
