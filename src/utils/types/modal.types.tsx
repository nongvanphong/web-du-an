export interface Modal {
  isHidden?: boolean;
  taile?: string;
  tailebnt1?: string;
  bnt1?: boolean;
  tailebnt2?: string;
  bnt2: boolean;
}
export interface ModalOtp {
  isHidden: boolean;
  mail: string;
  bntSend: () => void;
  bntrefresh: () => void;
}
