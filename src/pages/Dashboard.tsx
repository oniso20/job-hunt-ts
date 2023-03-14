import React from "react";

// React router imports
import { Link, useLoaderData } from "react-router-dom";

// import Helper functions
import {
  createApplication,
  createNewRole,
  deleteData,
  fetchData,
  waait,
} from "../helpers";

// Library imports
import { toast } from "react-toastify";

// Components
import Intro from "../components/Intro";
import AddJobTitle from "../components/AddJobTitle";
import AddApplicationForm from "../components/AddApplicationForm";
import RoleItem from "../components/RoleItem";
import Table from "../components/Table";

// Data loader function
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const roles = fetchData("roles");
  const applications = fetchData("applications");
  return {
    userName,
    roles,
    applications,
  };
};

// Action function
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));

      return toast.success(`Welcome ${values.userName}`);
    } catch (err) {
      throw new Error("There was an error creating your account.");
    }
  }

  // New role creation
  if (_action === "createNewRole") {
    try {
      createNewRole({
        name: values.newJobTitle,
        amount: values.targetAmount,
      });
      return toast.success("Role created!");
    } catch (e) {
      throw new Error("There was a problem creating your new job title.");
    }
  }

  // New application submission
  if (_action === "createApplication") {
    try {
      // Create an application
      createApplication({
        name: values.newApplication,
        source: values.sourceLink,
        status: values.status,
        notes: values.notes,
        deadlineDate: values.deadlineDate,
        roleId: values.matchingRole,
      });
      // Check if deadlineDate has already passed
      const deadlineDate = new Date(values.deadlineDate);
      const today = new Date();
      if (
        deadlineDate < today &&
        values.status.toLowerCase() === "interested"
      ) {
        return toast.error(
          `Application for ${values.newApplication} deadline has already passed!`
        );
      }
      return toast.success(
        `Application for ${values.newApplication}  created!`
      ); //newApplication refers to the company name object
    } catch (e) {
      throw new Error("There was a problem creating your new job application.");
    }
  }

  // Delete Application
  if (_action === "deleteApplication") {
    try {
      // Create an application
      deleteData({
        key: "applications",
        id: values.applicationId,
      });

      return toast.success("Application deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your job application.");
    }
  }
}

const Dashboard = () => {
  const { userName, roles, applications } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {roles && roles.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddJobTitle />
                  <AddApplicationForm roles={roles} />
                </div>
                <h2>Existing Applications</h2>
                <div className="applications">
                  {roles.map((role) => {
                    return <RoleItem key={role.id} role={role} />;
                  })}
                </div>
                {applications && applications.length > 0 && (
                  <div className="grid-md">
                    <h2>Approaching Deadline</h2>
                    <Table
                      roles={roles}
                      // sort applications by deadline date where status is interested and provide a note if there is none
                      applications={applications
                        .filter(
                          (application) =>
                            application.status.toLowerCase() === "interested"
                        )
                        .sort((a, b) => {
                          const aDate = new Date(a.deadlineDate);
                          const bDate = new Date(b.deadlineDate);
                          return aDate - bDate;
                        })
                        .slice(0, 5)}
                    />
                    {applications.length > 5 && (
                      <Link to="applications" className="btn btn--dark">
                        View all applications
                      </Link>
                    )}
                  </div>
                )}
                {applications && applications.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Applications</h2>
                    <Table
                      roles={roles}
                      // show all applications where status is not interested
                      applications={applications
                        .filter(
                          (application) => application.status !== "interested"
                        )
                        .sort((a, b) => {
                          const aDate = new Date(a.createdAt);
                          const bDate = new Date(b.createdAt);
                          return bDate - aDate;
                        })
                        .slice(0, 5)}
                    />
                    {applications.length > 5 && (
                      <Link to="applications" className="btn btn--dark">
                        View all applications
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>
                  Stay positive and keep applying! - the right job is out there
                  for you.
                </p>
                <p>
                  Add a job tittle and set a total applications goal to get
                  started!
                </p>
                <AddJobTitle />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
