interface Props {
  children?: React.ReactNode;
}
export const LayoutAuth = ({ children }: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex">
        <div className="w-[500px] h-screen bg-amber-300"></div>
        <div className="pl-14">{children}</div>
      </div>
    </div>
  );
};
