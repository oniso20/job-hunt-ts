// react imports
import { useEffect, useRef } from "react";

// React Router imports
import { useFetcher } from "react-router-dom";

// library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface RoleData {
  id: string;
  name: string;
  createdAt: number;
}

interface Props {
  roles: RoleData[];
}

const AddApplicationForm = ({ roles }: Props): JSX.Element => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef<HTMLFormElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      if (formRef.current) {
        formRef.current.reset();
      }
      // reset focus
      if (focusRef.current) {
        focusRef.current.focus();
      }
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {roles.length === 1 && `${roles.map((roleData) => roleData.name)}`}
        </span>{" "}
        Application
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="application-inputs">
          <div className="grid-xs">
            <label htmlFor="newApplication">Company Name</label>
            <input
              type="text"
              name="newApplication"
              id="newApplication"
              placeholder="e.g., Google"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="sourceLink">Job Link</label>
            <input
              type="text"
              name="sourceLink"
              id="sourceLink"
              placeholder="e.g., https://www.google.com/jobs"
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="status">Application Status</label>
            <select name="status" id="status" required>
              <option value="Interested">Interested</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Job offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="grid-xs">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            id="notes"
            placeholder="e.g., I applied for this job because I really like the company culture and the work they do. I'm excited to hear back from them!"
            rows={5}
          ></textarea>
        </div>
        <div className="grid-xs">
          <label htmlFor="deadlineDate">Application Deadline</label>
          <input type="date" name="deadlineDate" id="deadlineDate" />
        </div>
        <div className="grid-xs" hidden={roles.length === 1}>
          <label htmlFor="matchingRole"> Closest Job Title</label>
          <select name="matchingRole" id="matchingRole" required>
            {roles
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((role) => {
                return (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createApplication"  />
    </fetcher.Form>
  </div>
    );
};

export default AddApplicationForm;
