export interface Store {
  id: number;
  user_id: number;
  phone_store?: string;
  name_store?: string;
  lat_store?: number;
  long_store?: number;
  image_store?: string;
  address_store?: string;
  status?: number;
  time_open?: string;
  time_close?: string;
}
