import { updateVersion, deleteVersion, seed } from '@/app/services/api';
import { useVariants, useVersions } from '@/app/services/queries';
import useSWRMutation from 'swr/mutation';

export function useUpdateVersion() {
  const { mutate: versionMutates } = useVersions();

  return useSWRMutation(`/versions`, updateVersion, {
    onError() {
      console.error('error');
    },
    onSuccess: () => {
      versionMutates();
    },
  });
}

export function useDeleteVersion() {
  const { mutate: versionMutates } = useVersions();

  return useSWRMutation(`/versions`, deleteVersion, {
    onError() {
      console.error('error');
    },
    onSuccess: () => {
      versionMutates();
    },
  });
}

export function useSeed() {
  const { mutate: versionMutates } = useVersions();

  return useSWRMutation(`seed`, seed, {
    onError() {
      console.error('error');
    },
    onSuccess: () => {
      versionMutates();
    },
  });
}
