'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Variant } from '../types';

export const variantColumns: ColumnDef<Variant>[] = [
  {
    accessorKey: '_id',
    header: 'ID',
  },
  {
    accessorKey: 'variantId',
    header: 'variantId',
  },
  {
    accessorKey: 'arc',
    header: 'arc',
  },
  {
    accessorKey: 'minSdk',
    header: 'minSdk',
  },
  {
    accessorKey: 'dpi',
    header: 'dpi',
  },
  {
    accessorKey: 'version',
    header: 'version',
  },
];
