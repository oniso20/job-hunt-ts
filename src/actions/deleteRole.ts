import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteData, getAllMatchingItems } from "../helpers";

interface DeleteRoleParams {
  id: string;
}

export const deleteRole = ({ params }: { params: DeleteRoleParams }): void => {
  try {
    deleteData({
      key: "roles",
      id: params.id,
    });

    const associatedApplications = getAllMatchingItems({
      category: "applications",
      key: "roleId",
      value: params.id,
    });

    associatedApplications.forEach((application) => {
      deleteData({
        key: "applications",
        id: application.id as string
      });
    });

    toast.success("Deleted role successfully");
  } catch (e) {
    throw new Error("Error deleting role");
  }

  redirect("/");
};
