import { v4 as uuidv4 } from 'uuid';
import { ApplicationData, RoleData } from "../types";

// Wait for some time
export const waait = (): Promise<void> =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
const generateRandomColor = (): string => {
  const existingRoleLength = fetchData<RoleData[]>("roles")?.length ?? 0;

  return `${existingRoleLength * 34} 65% 50%`;
};

// Local storage for now
export const fetchData = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Create job roles
export const createNewRole = ({ name, amount }: { name: string; amount: number }): void => {
  const newItem = {
    id: uuidv4(),
    name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };
  const existingRoles = fetchData<RoleData[]>("roles") ?? [];
  localStorage.setItem("roles", JSON.stringify([...existingRoles, newItem]));
};

// Create job application
export const createApplication = ({
  name,
  roleId,
  source,
  deadlineDate,
  status,
  notes,
}: ApplicationData): void => {
  const newItem = {
    id: uuidv4(),
    createdAt: Date.now(),
    name,
    source,
    status,
    notes,
    deadlineDate,
    roleId: roleId,
  };
  const existingApplications = fetchData<ApplicationData[]>("applications") ?? [];
  localStorage.setItem("applications", JSON.stringify([...existingApplications, newItem]));
};

// delete item from local storage
export const deleteData = ({ key, id }: { key: string; id?: string }): void => {
  const existingData = fetchData<{ id: string }[]>(key);
  if (existingData && id) {
    const newData = existingData.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(newData));
  } else {
    localStorage.removeItem(key);
  }
};

// total applied
export const totalApplied = (roleId: string): number => {
  const applications = fetchData<ApplicationData[]>("applications") ?? [];
  return applications.filter((app) => app.roleId === roleId).length;
};

// total remaining
export const totalRemaining = (roleId: string): number => {
  const role = fetchData<RoleData[]>("roles")?.find((role) => String(role.id) === roleId);
  const roleAmount = role?.amount ?? 0;
  return roleAmount - totalApplied(roleId);
};

// get role from roles
export const getRole = (roleId: string): RoleData | null => {
  const roleData = fetchData<RoleData[]>("roles")?.find((role) => String(role.id) === roleId);
  return roleData ? { ...roleData, color: generateRandomColor() } : null;
};

// get all items from local storage
export const getAllMatchingItems = <T extends Record<string, unknown>>({
  category,
  key,
  value,
}: {
  category: string;
  key: keyof T;
  value: T[keyof T];
}): T[] => {
  const data = fetchData<T[]>(category) ?? [];
  return data.filter((item) => item[key] === value);
};


