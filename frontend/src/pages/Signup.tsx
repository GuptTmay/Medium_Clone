import { Quotes } from "../components/Quotes";
import { SignupForm } from "../components/SignupForm";
import image from '../assets/womenWorking.svg'

export const Signup = () => {
  return (
    <div>
      <div className="flex flex-row font-roboto">
        <div className="flex-1 flex justify-center items-center h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <SignupForm />
        </div>
        <div className="flex-1 hidden lg:block lg:drop-shadow-2xl">
          <Quotes
            qoute='"Almost all good writing begins with terrible first efforts. You need
                    to start somewhere. Start by getting something—anything—down on
                    paper."'
            name='Anne Lamott'
            designation="American novelist"
            image={image}
          />
        </div>
      </div>
    </div>
  );
};
