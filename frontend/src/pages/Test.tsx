import { Suspense, useEffect, useState } from "react";

const Test = () => {
  return (
    <div className="h-screen w-screen border border-red-500 flex justify-center items-end">
      <div className="flex justify-center items-end border border-red-800 mb-20">
        <Suspense fallback={<h1>Loading...</h1>}>
            <MyInfo />
        </Suspense>
      </div>
    </div>
  );
};

const MyInfo = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await delay(5000);
      setMessage(result)
    }
    fetchData();
  }, [])

  if (!message) {
    return <h1>Loading... inside MyInfo</h1>
  }

  return <>
    <h1>Something written here</h1>
    <h1>{message}</h1>
  </>
}

const delay = (ms: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Promise was fullfilled in ${ms}`)
    }, ms);
  });
}

export default Test;
