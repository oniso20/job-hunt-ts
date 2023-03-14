// react router imports
import { redirect } from "react-router-dom";

// helpers
import { deleteData } from "../helpers";

// Library
import { toast } from "react-toastify";

export async function logoutAction(): Promise<void> {
  // delete the user
  deleteData({ key: "userName" });

  // delete roles
  deleteData({ key: "roles" });

  // delete applications
  deleteData({ key: "applications" });

  // show a toast
  toast.success("Deleted account successfully");

  // redirect to login page
  redirect("/");
}
