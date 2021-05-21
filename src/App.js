import "./Assets/Fonts/TTNormsPro/stylesheet.css";
import "./Assets/Fonts/TTHoves-Regular/style.css";

import React, { useContext, useState } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import routes from "./routes";
import UserContext from "./context/basket";
import Header from "./Components/Header";
import UserAuth from "./Components/UserAuth";
import NewUserReg from "./Components/NewUserReg";
import Footer from "./Components/Footer";
import "./Style/App.css";
import Main from "./Containers/Main";

function App() {
  const [authDisplay, setAuthDisplay] = useState("none");
  const [newUserDisp, setnewUserDisp] = useState("none");
  const [circleStyle, setcircleStyle] = useState("");
  const HeaderMenuItems = [
    { title: "Меню", path: "/home" },
    { title: "Доставка", path: "/delivery" },
    { title: "Оплата", path: "/payment" },
    { title: "Бронь стола", path: "/booking" },
  ];

  const showAuth = () => {
    console.log("bosildi");
    // if (authDisplay === "none") {
    //   setAuthDisplay(authDisplay = "flex")
    // } else {
    //   setAuthDisplay(authDisplay = "none")
    // };
  };

  const showNewUser = () => {
    console.log("ikkinchisi bosildi");
    // setAuthDisplay(authDisplay = "none");
    // if (newUserDisp === "none") {
    //   setnewUserDisp(newUserDisp = "flex")
    // } else {
    //   setnewUserDisp(newUserDisp = "none")
    // };
  };

  return (
    <UserContext>
      <div>
        <BrowserRouter>
          <Header showAuth={showAuth} headerItems={HeaderMenuItems} />
          <UserAuth
            showAuth={showAuth}
            authDisplay={authDisplay}
            showNewUser={showNewUser}
          />
          <NewUserReg newUserDisp={newUserDisp} showNewUser={showNewUser} />
          <main>
            <div className="container">
              {/* <Main /> */}
              <Route key="header" exact={true} path="/home" component={Main} />
              {routes.map((item, index) => (
                <Route
                  key={index}
                  exact={item.exact}
                  path={item.path}
                  component={item.component}
                />
              ))}
              <Redirect to="/home" />
            </div>
          </main>
          <Footer
            showAuth={showAuth}
            authDisplay={authDisplay}
            showNewUser={showNewUser}
          />
        </BrowserRouter>
      </div>
    </UserContext>
  );
}

export default App;
