interface Props {
  children?: React.ReactNode;
}
export const LayoutAuth = ({ children }: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex">
        <div className="w-[500px] h-screen bg-amber-300 hidden md:block lg:block xl:block 2xl:block "></div>
        <div
          className="px-5 w-full h-screen bg-white  items-center flex
        sm:pl-14
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
};
