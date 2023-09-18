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

type Types = {
  isOpen: boolean;
  hanldeClode: () => void;
};
const array = [1, 2, 3, 2, 3, 3, 3, 3, 4, 4, 2, 3, 2, 3, 3];
export function Bill_detail(props: Types) {
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
      <div
        className={`w-full ${
          index % 2 == 0 ? `bg-blue-gray-100` : `bg-blue-gray-200`
        } `}
      >
        <div className="w-full flex gap-5 shadow-md px-5">
          <div className="w-full ">trà sữa</div>

          <div className="w-full ">
            <div>s - x2 - 40000</div>
            <div>x - x1 - 10000</div>
          </div>
          <div className="w-full ">50000</div>
          <div className="w-full "></div>
          <div className="w-full"></div>
        </div>
      </div>
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
                Nguyễn văn a
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                0394782222
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 mr-2"
                  src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                  alt="Logo"
                />
                <div className="text-gray-700 font-semibold text-lg">
                  Your Company Name
                </div>
              </div>
              <div className="text-gray-700">
                <div className="font-bold text-xl mb-2">INVOICE</div>
                <div className="text-sm">Date: 01/05/2023</div>
                <div className="text-sm">Invoice #: INV12345</div>
              </div>
            </div>
            <div className="border-b-2 border-gray-300 pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
              <div className="text-gray-700 mb-2">John Doe</div>
              <div className="text-gray-700 mb-2">123 Main St.</div>
              <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
              <div className="text-gray-700">johndoe@example.com</div>
            </div>
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
                <tr>
                  <td className="py-4 text-gray-700">Product 1</td>
                  <td className="py-4 text-gray-700">1</td>
                  <td className="py-4 text-gray-700">$100.00</td>
                  <td className="py-4 text-gray-700">$100.00</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">Product 2</td>
                  <td className="py-4 text-gray-700">2</td>
                  <td className="py-4 text-gray-700">$50.00</td>
                  <td className="py-4 text-gray-700">$100.00</td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-700">Product 3</td>
                  <td className="py-4 text-gray-700">3</td>
                  <td className="py-4 text-gray-700">$75.00</td>
                  <td className="py-4 text-gray-700">$225.00</td>
                </tr>
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
            <div className="border-t-2 border-gray-300 pt-8 mb-8">
              <div className="text-gray-700 mb-2">
                Payment is due within 30 days. Late payments are subject to
                fees.
              </div>
              <div className="text-gray-700 mb-2">
                Please make checks payable to Your Company Name and mail to:
              </div>
              <div className="text-gray-700">
                123 Main St., Anytown, USA 12345
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
