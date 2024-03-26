import {
  updateVersion,
  deleteVersion,
  updateVariant,
  deleteVariant,
  seed,
} from '@/app/services/api';
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

export function useUpdateVariant() {
  const { mutate: variantMutate } = useVariants();

  return useSWRMutation(`/variants`, updateVariant, {
    onError() {
      console.error('error');
    },
    onSuccess: () => {
      variantMutate();
    },
  });
}

export function useDeleteVariant() {
  const { mutate: variantnMutates } = useVariants();

  return useSWRMutation(`/versions`, deleteVariant, {
    onError() {
      console.error('error');
    },
    onSuccess: () => {
      variantnMutates();
    },
  });
}

export function useSeed() {
  const { mutate: variantMutate } = useVariants();
  const { mutate: versionMutates } = useVersions();

  return useSWRMutation(`seed`, seed, {
    onError() {
      console.error('error');
    },
    onSuccess: () => {
      variantMutate();
      versionMutates();
    },
  });
}
