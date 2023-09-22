export interface BillDetail {
  id: number;
  product?: string;
  total_cost?: number | string;
}
interface Product {
  name: string;
  total_cost?: number | string;
  options?: [Option];
}
interface Option {
  price?: number | string;
  size?: number | string;
  number?: number | string;
}
