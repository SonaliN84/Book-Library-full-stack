import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShowBook from "./ShowBook";
import styles from "./Books.module.css";
import axios from "axios";
import { bookActions } from "../../Store/book-slice";
const BookList = () => {
  const LIMIT = 6;
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const token = useSelector((state) => state.auth.token);
  const toggle = useSelector((state) => state.book.toggle);
  const total = useSelector((state) => state.book.total);

  const totalPagesCalculator = (total, limit) => {
    const pages = [];
    for (let x = 1; x <= Math.ceil(total / limit); x++) {
      pages.push(x);
    }

    return pages;
  };

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/books", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: { page: activePage, size: LIMIT },
      })
      .then((response) => {
        console.log(response);
        dispatch(bookActions.setTotal(response.data.total));
        dispatch(bookActions.setBooks(response.data.books));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activePage, toggle, total]);
  return (
    <div className={styles.container}>
      <div className={styles["book-container"]}>
        {books.length &&
          books.map((item) => (
            <ShowBook
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              author={item.author}
              launched={item.launched}
              rating={item.rating}
              imageurl={item.image}
            />
          ))}
      </div>
      <div className={styles["outer-container"]}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {activePage !== 1 && (
              <li
                className="page-item"
                onClick={() => setActivePage(activePage - 1)}
              >
                <a className="page-link" href="javascript:void(null)">
                  Previous
                </a>
              </li>
            )}
            {totalPagesCalculator(total, LIMIT).map((page) => (
              <li
                className={`page-item ${activePage === page ? "active" : ""}`}
                key={page}
              >
                <a
                  className="page-link"
                  href="javascript:void(null)"
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </a>
              </li>
            ))}
            {activePage !== totalPagesCalculator(total, LIMIT).length && (
              <li
                className="page-item"
                onClick={() => setActivePage(activePage + 1)}
              >
                <a className="page-link" href="javascript:void(null)">
                  Next
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default BookList;
