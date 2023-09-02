import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AppContext } from "../../App";
import { Modal } from "../../utils/types/modal.types";

export const Modal_1 = () => {
  const { isShowMoadal1, setIsShowMoadal1 } = useContext(AppContext);

  const handleOpen = () => {
    setIsShowMoadal1((isShowMoadal1: Modal) => ({
      ...isShowMoadal1,
      isHidden: false,
    }));
  };

  return (
    <>
      <Dialog
        open={isShowMoadal1.isHidden}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex justify-center text-center ">
          Thông báo
        </DialogHeader>
        <DialogBody divider className="text-center">
          {isShowMoadal1.taile}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-5"
          >
            <span>Đóng</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Ok</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
