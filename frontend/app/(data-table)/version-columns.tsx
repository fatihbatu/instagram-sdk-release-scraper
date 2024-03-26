'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Version } from '../types';
import DataTableRowActions from './RowActions';

interface columnsProps {
  onDelete: (version: Version) => void;
  onView: (version: Version) => void;
}

export const getVersionColumns = ({
  onDelete,
  onView,
}: columnsProps): ColumnDef<Version>[] => [
  {
    accessorKey: '_id',
    header: 'ID',
  },
  {
    accessorKey: 'versionId',
    header: 'Version',
  },
  {
    accessorKey: 'releaseDate',
    header: 'Date Released',
  },
  {
    accessorKey: 'variantCount',
    header: 'Variant Count',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions row={row} onDelete={onDelete} onView={onView} />
    ),
  },
];
