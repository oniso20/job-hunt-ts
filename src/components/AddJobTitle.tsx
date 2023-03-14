import React, { useEffect, useRef } from "react";

// Library imports
// Heroicons
import { BriefcaseIcon } from "@heroicons/react/24/solid";

// React router imports
import { useFetcher } from "react-router-dom";

const AddJobTitle: React.FC = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef<HTMLFormElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSubmitting) {
      formRef.current!.reset();
      focusRef.current!.focus();
    }
  }, [isSubmitting, formRef]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add a Job Tittle</h2>
      <fetcher.Form method="post" ref={formRef} className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newJobTitle">Job Title</label>
          <input
            id="newJobTitle"
            ref={focusRef}
            type="text"
            name="newJobTitle"
            required
            placeholder="e.g., Data Analyst, Frontend Developer etc."
            aria-label="Job Title"
            autoComplete="off"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="targetAmount">Set Target </label>
          <input
            id="targetAmount"
            type="number"
            step="1"
            min="1"
            name="targetAmount"
            required
            placeholder="e.g., 20"
            aria-label="Target Amount"
            autoComplete="off"
          />
        </div>
        <input type="hidden" name="_action" value="createNewRole" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Adding...</span>
          ) : (
            <>
              <span>Add New Role</span>
              <BriefcaseIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddJobTitle;
