import { BillDetail } from "./billdetail.types";
import { Product } from "./product.types";
import { User } from "./user.types";

export interface Bill {
  id: number;
  user_id: number;
  total_amount?: number | string;
  status?: number | string;
  User?: User;
  Billdetails: BillDetail;
  createdAt: string;
  updatedAt: string;
}
