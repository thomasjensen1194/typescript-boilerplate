import { client } from 'apolloClient';

class Apollo {
  static query = async <T>(name: string, query: any, variables?: { [key: string]: any }) => {
    const res = await client.query({
      query,
      variables
    });

    return res.data[name] as T;
  };

  static mutate = async <T>(name: string, mutation: any, variables?: { [key: string]: any }) => {
    const res = await client.mutate({
      mutation,
      variables
    });

    return res.data[name] as T;
  };
}

export default Apollo;
