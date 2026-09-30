import styles from "./BookRequests.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { bookActions } from "../../Store/book-slice";
import axios from "axios";
const ShowMyBook = (props) => {
  const token = useSelector((state) => state.auth.token);
  const myBooks = useSelector((state) => state.book.myBooks);
  const dispatch = useDispatch();
  console.log(props.issued_date);
  const returnBookHandler = () => {
    axios
      .put(
        `http://127.0.0.1:8000/return-book/${props.id}`,
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
        console.log(myBooks);
        const newMyBooks = myBooks.filter((item) => item.id != props.id);
        console.log(newMyBooks);
        dispatch(bookActions.setMyBooks(newMyBooks));
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!");
      });
  };

  return (
    <div className={styles.mybookcover}>
      <div className={styles.pendingcover}>
        <img src={props.image} className={styles.pendingbookimage} />
        <div>
          <b>Book Details:</b>
          <div className={styles["book-detail-data"]}>
            <b>Title : </b>
            <span className="mx-1">{props.title}</span>
          </div>
          <div className={styles["book-detail-data"]}>
            <b>Author : </b>
            <span className="mx-1">{props.author}</span>
          </div>
          <div className={styles["book-detail-data"]}>
            <b>Issued date : </b>
            <span className="mx-1">{props.issued_date}</span>
          </div>
        </div>
      </div>
      <div></div>
      <div className={styles.returnbookbutton}>
        <button className={styles["return-button"]} onClick={returnBookHandler}>
          Return
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ShowMyBook;
