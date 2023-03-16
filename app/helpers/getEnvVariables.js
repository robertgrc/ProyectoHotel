require('dotenv').config();

export const getEnvVariables = () => {
  return {
    ...process.env,
  };
};
