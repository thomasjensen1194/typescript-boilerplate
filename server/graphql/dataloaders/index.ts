import { generateUserLoader } from './userLoaders';

export const generateLoaders = () => ({ userLoader: generateUserLoader() });
