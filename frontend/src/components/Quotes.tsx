export const Quotes = ({ qoute, name, designation, image }: QuotesProps) => {
  return (
    <div className="bg-[#f3f4f6] h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 max-w-[30rem]">
        <QouteImage image={image} />
        <div className="text-lg font-bold text-center italic">{qoute}</div>

        <div className="flex flex-col justify-start">
          <div className="font-semibold text-base">{name}</div>
          <div className="text-sm text-slate-500">{designation}</div>
        </div>
      </div>
    </div>
  );
};

const QouteImage = ({ image }: QouteImage) => {
  if (image == null) {
    return <></>;
  } else {
    return (
      <>
        <div className="w-full h-full overflow-hidden flex justify-center">
          <img
            src={image}
            alt="qoute img"
            className="object-cover w-80 h-80 my-[-2rem]"
          />
        </div>
      </>
    );
  }
};

type QouteImage = {
  image: string | null;
};

interface QuotesProps {
  qoute: string;
  name: string;
  designation: string;
  image: string | null;
}
