import { Dispatch, SetStateAction } from 'react';

export interface IEmployees {
  id: number;
  name: string;
  payment_type: string;
  payment_amount: number;
}

export enum PayTypeEnum {
  HOURLY = 'hourly',
  SALARY = 'salary',
}

export interface IGroupsContext {
  groupToEdit: IEmployees | undefined;
  setGroupToEdit: (newGroup: IEmployees | undefined) => void;
  openEditGroupDialogState: boolean;
  openEditGroupDialog: () => void;
  closeEditGroupDialog: () => void;
  setTitleGroupDialog: Dispatch<SetStateAction<string>>;
  titleGroupDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  groups: IEmployees[];
  setGroups: Dispatch<SetStateAction<IEmployees[]>>;
}
