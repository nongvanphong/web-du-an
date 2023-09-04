export interface Modal {
  isHidden?: boolean;
  taile?: string;
  tailebnt1?: string;
  bnt1?: boolean;
  tailebnt2?: string;
  bnt2: boolean;
  showBotton: number;
  type?: string;
}
export interface ModalOtp {
  isHidden: boolean;
  mail: string;
  bntSend: () => void;
  bntrefresh: () => void;
}
