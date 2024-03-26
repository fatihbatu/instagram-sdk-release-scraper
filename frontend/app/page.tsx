'use client';
import { useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { useDeleteVersion, useSeed } from './services/mutations';
import { useVersions } from './services/queries';
import SpinLoader from './components/SpinLoader';
import { useRouter } from 'next/navigation';
import { DataTable } from './(data-table)/data-table';
import { getVersionColumns } from './(data-table)/version-columns';
import { Version } from './types';

export default function Home() {
  const router = useRouter();
  const { data, error } = useVersions();
  const { trigger: verDelTrig } = useDeleteVersion();
  const [loading, setLoading] = useState<boolean>(false);
  const { trigger } = useSeed();

  const startSeed = async () => {
    try {
      setLoading(true);
      await trigger();
      router.push('/versions');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onView = (version: Version) => {
    router.push(`/version/${version._id}`);
  };
  const onDelete = (version: Version) => {
    verDelTrig(version);
  };

  const columns = useMemo(() => getVersionColumns({ onDelete, onView }), []);

  return (
    <div
      id="content"
      className="wrapper flex flex-col items-start justify-center p-20 gap-16"
    >
      {data && data.length ? (
        <>
          <h1 className="text-2xl font-bold">Versions</h1>
          <DataTable columns={columns} data={data} />
        </>
      ) : error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : loading ? (
        <SpinLoader />
      ) : (
        <div>
          <Button onClick={startSeed}>Seed</Button>
        </div>
      )}
    </div>
  );
}
