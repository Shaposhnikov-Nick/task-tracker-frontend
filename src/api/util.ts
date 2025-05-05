export const handleErrorMessage = (
  data: any,
  additionalMessage: String = "",
) => {
  return (
    data.message ||
    (data.violations && data.violations[0].message) ||
    additionalMessage
  );
};
