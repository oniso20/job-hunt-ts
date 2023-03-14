import React from "react";

// React router imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

// Components
import Table from "../components/Table";

// import Helper functions
import { deleteData, fetchData } from "../helpers";

// Data loader function
export const applicationsLoader = async () => {
  const applications = await fetchData("applications");
  return {
    applications,
  };
};

// action
export const applicationsAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // delete application
  if (_action === "deleteApplication") {
    try {
      deleteData({
        key: "applications",
        id: values.applicationId,
      });
      return toast.success("Application deleted");
    } catch (err) {
      throw new Error("There was an error deleting the application.");
    }
  }
};

const ApplicationsPage = () => {
  const { applications } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Job Applications</h1>
      {applications && applications.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Applications <small>({applications.length} total)</small>
          </h2>
          <Table applications={applications} />
        </div>
      ) : (
        <p>No applications to show</p>
      )}
    </div>
  );
};

export default ApplicationsPage;
