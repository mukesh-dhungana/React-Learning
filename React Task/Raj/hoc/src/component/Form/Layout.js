import React from "react";
import Menu from "./Menu";

function Layout({
  title = "Title",
  description = "Description",
  className,
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}

export default Layout;
