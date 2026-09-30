import { useSelector } from "react-redux";
import styles from "./BookRequests.module.css";
import ShowPendingBook from "./ShowPendingBook";
const BookRequests = () => {
  const pendingBooks = useSelector((state) => state.book.pendingBooks);
  return (
    <div className={styles["book-request-box"]}>
      {!pendingBooks.length && (
        <div>
          <b>No pending requests found!!</b>
        </div>
      )}
      {pendingBooks.length>0 &&
        pendingBooks.map((item) => (
          <ShowPendingBook
            key={item.id}
            id={item.id}
            studentName={item.username}
            studentEmail={item.useremail}
            bookTitle={item.book_title}
            bookImage={item.book_image}
            bookAuthor={item.book_author}
          />
        ))}
    </div>
  );
};
export default BookRequests;
