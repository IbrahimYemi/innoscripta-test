const AuthLayout = ({children} : { children: React.ReactNode }) => {
  return (
    <div className="h-[45rem] text-gray-900 flex justify-center m-2 md:m-8">
      <div className="max-w-screen-xl bg-white shadow-sm sm:rounded-lg flex justify-center flex-1">
        {children}
        <div className="flex-1 bg-red-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('/background.svg')`,
              }}              
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;