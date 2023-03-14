import React from "react";

// helpers
import { getRole } from "../helpers";
import { ApplicationData } from "../../types";

// React router imports
import { Link, useFetcher } from "react-router-dom";

// Heroicons
import { TrashIcon } from "@heroicons/react/24/solid";

type Props = {
  applications: ApplicationData[];
};

const Table: React.FC<Props> = ({ applications }) => {
  const fetcher = useFetcher();
  return (
    <div className="table">
      <table>
        <thead>
          {/* Show a note if applications is empty else show the header contents */}
          {applications.length === 0 ? (
            <tr>
              <th colSpan={5}>No pending applications, create new ones</th>
            </tr>
          ) : (
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Source Link</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          )}
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr
              key={application.id}
              style={{
                "--accent": `${application && getRole(application.roleId)?.color}` 
              } as React.CSSProperties}
              
            >
              <td>{application.name}</td>
              <td>
              <Link to={`/role/${application?.roleId}`}>
                  {application && getRole(application.roleId)?.name}
              </Link>

              </td>
              <td>
                <Link
                  to={`https://${application.source}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {application.source}
                </Link>
              </td>
              <td>{application.status}</td>
              <td>{application.deadlineDate}</td>
              <td>
                <fetcher.Form method="post">
                  <input
                    type="hidden"
                    name="_action"
                    value="deleteApplication"
                  />
                  <input
                    type="hidden"
                    name="applicationId"
                    value={application.id}
                  />
                  <button
                    type="submit"
                    className="btn btn--warning"
                    aria-label={` Delete ${application.name} application`}
                  >
                    <TrashIcon width={20} />
                  </button>
                </fetcher.Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
