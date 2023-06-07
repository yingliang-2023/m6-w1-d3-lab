import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import hookFunction from "./hookFunction";

class BookEdit extends Component {
  emptyBook = {
    title: "",
    author: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyBook,
    };
  }
  async componentDidMount() {
    // if (this.props.match.params.id !== "new") {
      let {id} = this.props.params;
      if (id !== "new") {
      const book = await (
        await fetch(
          `/api/book/${id}`
        )
      ).json();
      this.setState({ item: book });
    }
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/book", {
      method: (item._id) ? "PUT" : "POST",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    // this.props.history.push("/");
    this.props.navigation("/");
  };
  render() {
    const { item } = this.state;
    const pagetitle = (
      <h2 className="mt-3">
        {/* if item has an id number, otherwise */}
        {item._id ? "Edit Book" : "Add Book"}
      </h2>
    );
    return (
      <div>
        <Container>
          {/* display the appropriate title */}
          {pagetitle}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title" className="h5 mt-3">
                Book Title
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={item.title || ""}
                onChange={this.handleChange}
                autoComplete="title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="author" className="h5 mt-3">
                Author
              </Label>
              <Input
                type="text"
                name="author"
                id="author"
                value={item.author || ""}
                onChange={this.handleChange}
                autoComplete="author"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" className="mt-3">
                Save
              </Button>{" "}
              <Button color="secondary" className="mt-3" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default hookFunction(BookEdit);
