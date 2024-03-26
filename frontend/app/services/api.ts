import { axiosInstance } from '@/app/services/fetcher';
import { Variant, Version } from '../types';

export const updateVersion = async (url: string, { arg }: { arg: Version }) => {
  const { _id, ...rest } = arg;
  await axiosInstance.put(`${url}/${arg._id}`, {
    rest,
  });
};

export const deleteVersion = async (url: string, { arg }: { arg: Version }) => {
  await axiosInstance.delete(`${url}/${arg._id}`);
};

export const updateVariant = async (url: string, { arg }: { arg: Variant }) => {
  const { _id, ...rest } = arg;
  await axiosInstance.put(`${url}/${_id}`, {
    rest,
  });
};

export const deleteVariant = async (url: string, { arg }: { arg: Variant }) => {
  await axiosInstance.delete(`${url}/${arg._id}`);
};

export const seed = async (url: string) => {
  try {
    await axiosInstance.post(url);
  } catch (error) {
    return error;
  }
};
