export const InputLabel = (props: React.HTMLProps<HTMLLabelElement>) => {
    const { children, ...rest } = props;
    return (
      <>
        <label
          {...rest}
          className="appearance-none pl-0.5 block text-sm font-semibold leading-6 text-gray-900 mb-1"
        >
          {children}
        </label>
      </>
    );
  };
  
export const InputBar = (props: React.HTMLProps<HTMLInputElement>) => {
    return (
      <>
        <input
          {...props}
          className="block py-1 px-3 placeholder:text-sm border rounded border-slate-300 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </>
    );
  };
  