const emptyEntity = {
  list: async () => [],
  filter: async () => [],
  create: async (data) => data,
  update: async (_id, data) => data,
  delete: async () => true,
};

export const base44 = {
  entities: new Proxy(
    {},
    {
      get: () => emptyEntity,
    }
  ),
};
