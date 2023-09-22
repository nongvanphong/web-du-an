import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import { BillDetail } from "../../../utils/types/billdetail.types";

type modalhome = {
  id: number;
  user_id?: number;
  img?: string;
  phone?: string;
  address?: string;
  user_name?: string;
  detail?: BillDetail;
};

type Types = {
  isOpen: boolean;
  hanldeClode: () => void;
  modalhome?: modalhome;
};
const array = [1, 2, 3, 2, 3, 3, 3];
export function ModalHome(props: Types) {
  const [open, setOpen] = React.useState(props.isOpen);
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);
  const handleOpen = () => {
    setOpen((cur) => !cur);
    props.hanldeClode();
  };
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  const Item = ({ index }: { index: number }) => {
    return (
      <tr>
        <td className="py-4 text-gray-700">Product 1</td>
        <td className="py-4 text-gray-700">1</td>
        <td className="py-4 text-gray-700">$100.00</td>
        <td className="py-4 text-gray-700">$100.00</td>
      </tr>
    );
  };

  return (
    <>
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                {props.modalhome?.user_name}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                {props.modalhome?.phone}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                {props.modalhome?.address}
              </Typography>
            </div>
          </div>
          {/* <div className="flex items-center gap-2">
            <IconButton
              variant="text"
              size="sm"
              color={isFavorite ? "red" : "blue-gray"}
              onClick={handleIsFavorite}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
            <Button color="green" size="sm">
              Free Download
            </Button>
          </div> */}
        </DialogHeader>
        <DialogBody
          divider={true}
          className="p-0 h-[calc(100vh-7rem)]  overflow-hidden overflow-y-scroll"
        >
          <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <table className="w-full text-left mb-8">
              <thead>
                <tr>
                  <th className="text-gray-700 font-bold uppercase py-2">
                    Description
                  </th>
                  <th className="text-gray-700 font-bold uppercase py-2">
                    Quantity
                  </th>
                  <th className="text-gray-700 font-bold uppercase py-2">
                    Price
                  </th>
                  <th className="text-gray-700 font-bold uppercase py-2">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {array.map((index: number) => (
                  <Item index={index} />
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mb-8">
              <div className="text-gray-700 mr-2">Subtotal:</div>
              <div className="text-gray-700">$425.00</div>
            </div>
            <div className="text-right mb-8">
              <div className="text-gray-700 mr-2">Tax:</div>
              <div className="text-gray-700">$25.50</div>
            </div>
            <div className="flex justify-end mb-8">
              <div className="text-gray-700 mr-2">Total:</div>
              <div className="text-gray-700 font-bold text-xl">$450.50</div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
