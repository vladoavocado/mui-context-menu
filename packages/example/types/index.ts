export type DataItem = {
  checkoutId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  createdAt: string;
  total: string;
};

export type ResponseDataItem = {
  created_at: string;
  id: string;
  data: {
    contact_email: string;
    contact_name: string;
    contact_phone: string;
    total: string;
  };
};

export type HydraResponse<TResult> = {
  '@context': string;
  '@type': string;
  '@id': string;
  'hydra:member': TResult;
  'hydra:view': {
    '@id': string;
    '@type': string;
    'hydra:next': string;
  };
};
