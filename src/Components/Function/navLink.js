import React from "react";
import { Link, withRouter } from "react-router-dom";

const NavItem = ({ isActive, to, label, icon }) => {
  let classes = [];
  if (isActive) classes.push("uk-active");

  let icone = null;
  if(icon) icone = icon;

  return (
    <li className={classes.join(" ")}>
      <Link className="nav-link" to={to}>


        {icone ? <span className="uk-icon uk-icon-image uk-margin-small-right" style={{ backgroundImage: "url('/img/icon/"+icone+".png')" }}></span> : '' }

        {label}
      </Link>
    </li>
  );
};

export default withRouter(({ location, ...props }) => {
  // const isActive = location.pathname === props.to;

  // console.log(location.pathname, props.to);
  // console.log(location)

  const arraLink = location.pathname.split("/");
  const to = props.to.split("/");

  let isActive = false;

  if(arraLink.length === 2){
    isActive = JSON.stringify(arraLink) === JSON.stringify(to);
  }

  if(arraLink.length === 3){
    isActive = to[1] === arraLink[1] && to[2] === arraLink[2];
  }

  return <NavItem {...props} isActive={isActive} />;
});