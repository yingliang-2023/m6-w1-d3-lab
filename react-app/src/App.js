import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./BookList";
import BookEdit from "./BookEdit";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<BookList />} />
          <Route exact path="/booklists/:id" element={<BookEdit />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
