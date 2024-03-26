'use client';
import { useState } from 'react';
import { DataTable } from '../../(data-table)/data-table';
import { useVariants, useVersions } from '../../services/queries';
import { useParams } from 'next/navigation';
import { variantColumns } from '@/app/(data-table)/variant-columns';
import SpinLoader from '@/app/components/SpinLoader';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { Version } from '@/app/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FormCard from './form';
import { useUpdateVersion } from '@/app/services/mutations';

type StateType = {
  visible: boolean;
  version: Version | null;
};

export default function Home() {
  const { trigger } = useUpdateVersion();
  const params = useParams();
  const paramID = params.id.toString();
  const { data, error, isLoading, mutate } = useVariants(paramID);
  const router = useRouter();
  const [modal, setModal] = useState<StateType>({
    visible: false,
    version: null,
  });

  const updateVersion = async (values: {}) => {
    try {
      await trigger({ _id: modal.version._id, ...values });
      mutate();
    } catch (error) {
      console.error(error);
    } finally {
      setModal({ visible: false, version: null });
    }
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center ${
          modal.visible ? 'block' : 'hidden'
        }`}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <div
                className="flex justify-between items-center"
                style={{ width: '100%' }}
              >
                <div>Edit Version</div>
                <Button
                  onClick={() => setModal({ visible: false, version: null })}
                >
                  Close
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {modal.version ? (
              <FormCard data={modal.version} updateVersion={updateVersion} />
            ) : null}
            {/* <p>Card Content</p> */}
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      </div>
      <div
        id="content"
        className="wrapper flex flex-col items-start justify-center p-20 gap-16"
      >
        {data ? (
          <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-md shadow-md">
            <Button onClick={() => router.push('/')} className="self-start">
              Back
            </Button>

            <div className="flex flex-row gap-4 p-4 border border-gray-200 rounded-md shadow-md items-center justify-center">
              <h1>
                <span className="font-bold">Version Id:</span> {data.versionId}
              </h1>
              <h1>
                <span className="font-bold">Release Date:</span>{' '}
                {data.releaseDate}
              </h1>
              <h1>
                <span className="font-bold">Variant Count:</span>{' '}
                {data.variantCount}
              </h1>
              <Button
                onClick={() => setModal({ visible: true, version: data })}
              >
                Edit
              </Button>
            </div>

            <h1 className="text-2xl font-bold">Variants</h1>
            <DataTable columns={variantColumns} data={data.variants} />
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : isLoading ? (
          <SpinLoader />
        ) : (
          <div>
            <p>No data</p>
          </div>
        )}
      </div>
    </div>
  );
}
