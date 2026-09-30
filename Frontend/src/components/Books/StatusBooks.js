import { useSelector } from "react-redux";
import styles from "./StatusBooks.module.css";

const StatusBooks = () => {
  const books = useSelector((state) => state.book.statusBooks);
  console.log(">>>>>>", books);
  return (
    <div className={styles["outer-container"]}>
      {books.length == 0 && (
        <div className={styles["inner-container"]}>No books found!!</div>
      )}
      {books.length > 0 &&
        books.map((book) => (
          <div className={styles["inner-container"]}>
            <div>
              <img src={book.image} className={styles.statusimg} />
            </div>
            <div>
              <div>
                <b>Book Title:</b>
                <span className="mx-2">{book.title}</span>
              </div>
              <div>
                <b>Book Author:</b>
                <span className="mx-2">{book.author}</span>
              </div>
              {book.return_date && (
                <div>
                  <b>Return date:</b>
                  <span className="mx-2">{book.return_date}</span>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
export default StatusBooks;
