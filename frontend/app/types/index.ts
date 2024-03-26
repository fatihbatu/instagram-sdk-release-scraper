export type Variant = {
  _id: string;
  variantId: string;
  arc: string;
  minSdk: string;
  dpi: string;
  version: string;
};

export type Version = {
  _id: string;
  versionId: string;
  href: string;
  releaseDate: string;
  variantCount: number;
  variants: Variant[];
};
