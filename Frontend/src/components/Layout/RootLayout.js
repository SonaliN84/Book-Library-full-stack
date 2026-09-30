import { Fragment } from "react";
import Header from "./Header";
const RootLayout = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  );
};
export default RootLayout;
