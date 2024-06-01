import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "sanikhalid11160@gmail.com", password: "khalid" },
      }}
    />
  );
};
