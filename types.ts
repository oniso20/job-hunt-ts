export type RoleData = {
    id: number;
    name: string;
    amount: number;
    color: string;
    createdAt: string;
  };
  
  export type ApplicationData = {
    id: string;
    name: string;
    roleId: string;
    source: string;
    status: string;
    notes: string;
    deadlineDate: string;
    createdAt: string;

  };

  export type Role = {
    id: number;
    name: string;
    amount: number;
    color: string;
    createdAt: string;
  };
  
  export type Application = {
    id: string;
    name: string;
    roleId: string;
    source: string;
    status: string;
    deadlineDate: string;
  };
  