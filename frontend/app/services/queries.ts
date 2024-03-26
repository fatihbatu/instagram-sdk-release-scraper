import useSWR from 'swr';
import { Version } from '@/app/types';

export function useVersions() {
  return useSWR<Version[]>('/versions');
}
export function useVariants(id: string) {
  return useSWR<Version>('/versions/' + id);
}
