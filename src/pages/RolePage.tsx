import React from 'react';
// React router imports
import { useLoaderData } from 'react-router-dom';
// Library imports
import { toast } from 'react-toastify';
// Components
import AddApplicationForm from '../components/AddApplicationForm';
import RoleItem from '../components/RoleItem';
import Table from '../components/Table';
// helpers
import {
  createApplication,
  deleteData,
  getAllMatchingItems,
} from '../helpers';
//import { LoaderFunction, ActionFunction } from 'remix';

// Types and interfaces
interface Role {
  id: string;
  name: string;
  color: string;
}

interface Application {
  id: string;
  name: string;
  source: string;
  status: string;
  notes: string;
  deadlineDate: string;
  roleId: string;
}

interface LoaderData {
  role: Role;
  applications: Application[];
}

// loader
export const roleLoader: ({ params }: { params: { id: string } }) => Promise<LoaderData> = async ({ params }) => {
  const role = await getAllMatchingItems<Role>({
    category: 'roles',
    key: 'id',
    value: params.id,
  })[0];
  const applications = await getAllMatchingItems<Application>({
    category: 'applications',
    key: 'roleId',
    value: params.id,
  });

  // errors
  if (!role) {
    throw new Error("The job role you're trying to find does not exist");
  }
  // error
  if (!applications) {
    throw new Error("The application you're trying to find does not exist");
  }
  return {
    role,
    applications,
  };
};

// action
export const roleAction: ({ request }: { request: Request }) => Promise<void> = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // delete application
  if (_action === 'deleteApplication') {
    try {
      deleteData({
        key: 'applications',
        id: values.applicationId as string,
      });
      return toast.success('Application deleted');
    } catch (err) {
      throw new Error('There was an error deleting the application.');
    }
  }

  // New application submission
  if (_action === 'createApplication') {
    try {
      // Create an application
      createApplication({
        name: values.newApplication as string,
        source: values.sourceLink as string,
        status: values.status as string,
        notes: values.notes as string,
        deadlineDate: values.deadlineDate as string,
        roleId: values.matchingRole as string,
      });

      // Check if deadlineDate has already passed
      const deadlineDate = new Date(values.deadlineDate as string);
      const today = new Date();
      if (
        deadlineDate < today &&
        (values.status as string).toLowerCase() === 'interested'
      ) {
        return toast.error(
          `Application for ${
            values.newApplication
          } deadline has already passed!`,
        );
      }
      return toast.success(
        `Application for ${values.newApplication}  created!`,
      ); //newApplication refers to the company name object
    } catch (e) {
      throw new Error(
        'There was a problem creating your new job application.',
      );
    }
  }
};

const RolePage: React.FC = () => {
  const { role, applications } = useLoaderData() as LoaderData;
  return (
    <div
      className="grid-lg"
      style={{
        '--accent': role.color,
      } as React.CSSProperties }
    >
      <h2 className="h2">
        <span className="accent">{role.name}</span> Overview
      </h2>
      <div className="flex-lg">
        <RoleItem role={role} showDelete={true} />
        <AddApplicationForm role={role} />
      </div>
      {applications && applications.length > 0 ? (
        <div className="grid-md">
          <h2>
            <span className="accent">{role.name}</span> Applications
          </h2>
          <Table applications={applications} />
        </div>
      ) : (
        <p>No applications to show</p>
      )}
    </div>
  );
};

export default RolePage;

