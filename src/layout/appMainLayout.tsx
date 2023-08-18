interface Props {
  children?: React.ReactNode;
}
export const AppMainLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen bg-ct-orange p-ct-50">
      <div className="w-full h-full bg-ct-white flex rounded-3xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};
