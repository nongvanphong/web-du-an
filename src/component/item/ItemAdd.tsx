import iconPush from "../../../src/assets/icon/svg/plus.svg";

type ItemData = {
  handleClick: () => void;
};
type ItemShow = {
  file: string;
};
export const ItemAdd = (props: ItemData) => {
  const hanleClick = () => {
    props.handleClick();
  };
  return (
    <div
      className="w-full h-full rounded-3xl p-5 cursor-pointer border-8 border-orage-100-ct  border-dashed flex justify-center items-center"
      onClick={hanleClick}
    >
      <img src={iconPush} alt="add" className=""></img>
    </div>
  );
};

export const ItemShow = (props: ItemShow) => {
  return (
    <div
      className={`w-full h-full rounded-3xl p-5 cursor-pointer border-8 border-orage-100-ct  ${
        props.file ? null : `border-dashed`
      } flex justify-center items-center`}
    >
      <img
        src={props.file ? props.file : iconPush}
        alt="add"
        className=""
      ></img>
    </div>
  );
};
