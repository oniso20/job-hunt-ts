import { BriefcaseIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Form, Link } from "react-router-dom";
import { totalApplied } from "../helpers";
import { RoleData } from "../../types";

type Props = {
  role: RoleData;
  showDelete?: boolean;
};

const RoleItem: React.FC<Props> = ({ role, showDelete = false }) => {
  const { id, name, amount, color } = role;
  const applied = totalApplied(String(id));
  const remaining = amount - applied;

  return (
    <div
      className="application"
      style={{
        "--accent": color,
      } as React.CSSProperties }
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{amount} Planned</p>
      </div>
      <progress max={amount} value={applied}>
        {`${Math.round((applied / amount) * 100)}%`}
      </progress>
      <div className="progress-text">
        <small>Applied for {applied}</small>
        <div className="progress-text">
          <div>
            {remaining < 0 && <small>You've exceeded your goal!</small>}
            {remaining === 0 && <small>You've reached your goal!</small>}
            {remaining > 0 && (
              <small>{remaining} remaining to reach your goal</small>
            )}
          </div>
        </div>
      </div>
      {
        // If showDelete is true, show the delete button
        showDelete ? (
          <div className="flex-sm">
            <Form
              method="post"
              action="delete"
              onSubmit={(event) => {
                if (
                  !confirm(
                    `Are you sure you want to delete the Role "${name}"? This will delete all applications under "${name}" and this action cannot be undone.`
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit" className="btn">
                <span>Delete Role</span>
                <TrashIcon width={20} />
              </button>
            </Form>
          </div>
        ) : (
          <div className="flex-sm">
            <Link to={`/role/${id}`} className="btn">
              <span>View Applications</span>
              <BriefcaseIcon width={20} />
            </Link>
          </div>
        )
      }
    </div>
  );
};

export default RoleItem;
