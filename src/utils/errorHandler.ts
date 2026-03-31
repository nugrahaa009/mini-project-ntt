export const getErrorMessage = (err: unknown): string => {
  if (typeof err === "object" && err !== null && "data" in err) {
    const errorData = err as { data?: { message?: string } };
    return errorData.data?.message || "Something went wrong";
  }
  return "Something went wrong";
};
