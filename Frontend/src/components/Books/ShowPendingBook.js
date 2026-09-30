import styles from "./BookRequests.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { bookActions } from "../../Store/book-slice";
const ShowPendingBook = (props) => {
  const token = useSelector((state) => state.auth.token);
  const pendingBooks = useSelector((state) => state.book.pendingBooks);
  const dispatch = useDispatch();
  console.log("token>>", token);
  const acceptHandler = () => {
    axios
      .put(
        `http://127.0.0.1:8000/accept-book/${props.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);

        const newPendingBooks = pendingBooks.filter(
          (item) => item.id != props.id
        );
        dispatch(bookActions.setpendingBooks(newPendingBooks));
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

  const rejectHandler = () => {
    axios
      .put(
        `http://127.0.0.1:8000/reject-book/${props.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        const newPendingBooks = pendingBooks.filter(
          (item) => item.id != props.id
        );
        dispatch(bookActions.setpendingBooks(newPendingBooks));
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!");
      });
  };

  return (
    <div className={styles.pendingbook}>
      <div className={styles.pendingcover}>
        <img src={props.bookImage} className={styles.pendingbookimage} />
        <div>
          <b>Book Details:</b>
          <div className={styles["book-detail-data"]}>
            <b>Title : </b>
            <span className="mx-1">{props.bookTitle}</span>
          </div>
          <div className={styles["book-detail-data"]}>
            <b>Author : </b>
            <span className="mx-1">{props.bookAuthor}</span>
          </div>
        </div>
      </div>
      <div>
        <b>Student Details:</b>
        <div className={styles["book-detail-data"]}>
          <b>Name: </b>
          <span className="mx-1">{props.studentName}</span>
        </div>
        <div className={styles["book-detail-data"]}>
          <b>Email : </b>
          <span className="mx-1">{props.studentEmail}</span>
        </div>
      </div>
      <div className={styles.pendingbookbutton}>
        <button className={styles.acceptbutton} onClick={acceptHandler}>
          Accept
        </button>
        <button className={styles.rejectbutton} onClick={rejectHandler}>
          Reject
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ShowPendingBook;
