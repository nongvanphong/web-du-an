import { Sizes } from "./size.typer";
export interface Product {
  id: number;
  store_id: number;
  cg_id: number;
  name_product?: string;
  image_product?: string;
  detail?: string;
  status: number;
  file?: File;
  pr_size?: string;
  pr_price?: string;
  Sizes: Sizes[];
}
