import { useSelector } from "react-redux";
import styles from "./BookRequests.module.css";
import ShowMyBook from "./ShowMyBooks";
const MyBooks = () => {
  const myBooks = useSelector((state) => state.book.myBooks);
  return (
    <div className={styles["book-request-box"]}>
      {myBooks.length == 0 && <div>No books found!!</div> }
      {myBooks.length >0 && myBooks.map((item) => (
        <ShowMyBook
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          author={item.author}
          issued_date={item.issued_date}
        />
      ))}
    </div>
  );
};
export default MyBooks;
