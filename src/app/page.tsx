import { Spotlight } from "@/components/ui/spotlight";
import QuizApp from "@/components/global/QuizApp";

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col">
      <div className="relative z-0">
        <Spotlight />
      </div>
      <div className="flex flex-1 justify-center items-center relative z-10">
        <QuizApp />
      </div>
    </div>
  );
}
