import useSWR from 'swr';
import { Version, Variant } from '@/app/types';

export function useVersions() {
  return useSWR<Version[]>('/versions');
}
export function useVariants() {
  return useSWR<Variant[]>('/variants');
}
