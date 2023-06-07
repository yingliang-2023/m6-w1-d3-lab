import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, ButtonGroup, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booklists: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => this.setState({ booklists: data, isLoading: false }));
  }
  removeInv = async (id) => {
    await fetch(`/api/book/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Remove Done!");
    let updateBooklists = [...this.state.booklists].filter((i) => i._id !== id);
    this.setState({ booklists: updateBooklists });
  };

  render() {
    const { booklists, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const bookList = booklists.map(booklist => {
      return (
        <tr key={booklist._id}>
          <td style={{ whiteSpace: "nowrap" }}>{booklist.title}</td>
          <td>{booklist.author}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="info"
                tag={Link}
                to={"/booklists/" + booklist._id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="warning"
                onClick={() => this.removeInv(booklist._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button
              color="primary"
              className="my-4"
              tag={Link}
              to="/booklists/new"
            >
              Add Book
            </Button>
          </div>
          <h3>Book List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="40%">Book Title</th>
                <th width="30%">Author</th>
                <th width="30%">Actions</th>
              </tr>
            </thead>
            <tbody>{bookList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default BookList;
