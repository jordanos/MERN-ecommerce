export const getError = (error: any): { error: string } => {
  let errorMessage = "";
  const id = `${Date.now()}`;
  if (error.response) {
    errorMessage = error.response.data.error;
  } else {
    errorMessage = error.message;
  }
  return { error: errorMessage };
};

export const format = () => {};
