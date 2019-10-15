import DataLoader from 'dataloader';
import User from 'models/user';

const batchUsers = async (ids: number[]) => {
  const users = await User.query().whereIn('id', ids);
  return ids.map((id) => users.find((user) => user.id === id));
};

export const userLoader = new DataLoader((ids: number[]) => batchUsers(ids));
