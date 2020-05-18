import React from "react";
import { Route } from 'react-router-dom';
import Header from "./components/Header.js";
import CharacterList from "./components/CharacterList";
import WelcomePage from "./components/WelcomePage";
import Card from "./components/Card";
import FormikLoginForm from "./components/Login";

export default function App() {
  return (
    <main>
      <Header />
      <Route exact path="/" component={FormikLoginForm} />
      <Route exact path="/character/" component={CharacterList}/>
      <Route exact path="/character/:id" component={Card} />
    </main>
  );
}