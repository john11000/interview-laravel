import { Dispatch, SetStateAction } from 'react';

export interface ICustomerss {
  id: number;
  name: string;
  payType: string;
  payRate: number;
}

export enum PayTypeEnum {
  HOURLY = 'hourly',
  SALARY = 'salary',
}

export interface IGroupsContext {
  groupToEdit: ICustomerss | undefined;
  setGroupToEdit: (newGroup: ICustomerss | undefined) => void;
  openEditGroupDialogState: boolean;
  openEditGroupDialog: () => void;
  closeEditGroupDialog: () => void;
  setTitleGroupDialog: Dispatch<SetStateAction<string>>;
  titleGroupDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  groups: ICustomerss[];
  setGroups: Dispatch<SetStateAction<ICustomerss[]>>;
}
