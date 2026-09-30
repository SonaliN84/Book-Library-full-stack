import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-slice";
import "./AddBook.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import { bookActions } from "../../Store/book-slice";

const AddBook = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const total = useSelector((state) => state.book.total);
  console.log("token", token);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = {};
    for (const [name, value] of formData.entries()) bookData[name] = value;
    console.log(bookData);
    axios
      .post("http://127.0.0.1:8000/add-book", bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Book added successfully!");
        dispatch(bookActions.setTotal(total + 1));
      })
      .catch((err) => {
        if (err.request.status == 400) {
          alert(err.response.data.detail);
        } else {
          console.log(err);
          alert("Something went wrong!!");
        }
      });
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "blueviolet" }}>Add book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3 book-text">
              <Form.Control
                type="text"
                className="book-data shadow-none"
                placeholder="Title"
                name="title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 book-text">
              <Form.Control
                type="text"
                className="book-data shadow-none"
                placeholder="Author"
                name="author"
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 book-text shadow-none"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="text"
                className="book-data shadow-none"
                placeholder="Description"
                name="description"
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 book-text"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Rating"
                className="book-data shadow-none"
                name="rating"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3 book-text"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="date"
                className="book-data shadow-none"
                placeholder="Launched date"
                name="launched"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3 book-text"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="text"
                className="book-data shadow-none"
                placeholder="Image url"
                name="image"
                required
              />
            </Form.Group>

            <div className="newbutton">
              <button className="submit-button">Add book</button>
              {/* <button className="submit-button"><NavLink to="/home">Close</NavLink></button> */}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddBook;
