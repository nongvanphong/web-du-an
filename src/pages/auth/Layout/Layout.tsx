import bg from "../../../assets/backgroud/bg.jpg";
interface Props {
  children?: React.ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen bg-ct-orange p-ct-50">
      <div className="w-full h-full bg-ct-white flex rounded-3xl overflow-hidden">
        <div className="w-500-ct h-full bg-slate-500">
          <img
            src={bg}
            alt="back-groud"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full h-full bg-gray-ct p-12">{children}</div>
      </div>
    </div>
  );
};
