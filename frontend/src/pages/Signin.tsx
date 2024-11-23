import { SigninForm } from "../components/SigninForm";
import { Quotes } from "../components/Quotes";
import image from "../assets/productivity-concept-background.png";

export const Signin = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-1 hidden lg:block lg:drop-shadow-2xl">
        <Quotes
          qoute='"I am convinced that about half of what separates the successful entrepreneurs from the nonsuccessful ones is pure perseverance."'
          name="Steve Jobs"
          designation="Former CEO of Apple"
          image={image}
        />
      </div>
      <div className="flex-1 flex justify-center h-screen items-center bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <SigninForm />
      </div>
    </div>
  );
};
