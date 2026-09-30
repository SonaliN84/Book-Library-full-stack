import Card from "react-bootstrap/Card";
import styles from "./Books.module.css";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { bookActions } from "../../Store/book-slice";

const ShowBook = (props) => {
  const token = useSelector((state) => state.auth.token);
  const show = useSelector((state) => state.book.show);
  const dispatch = useDispatch();
  const bookHandler = () => {
    axios
      .get(`http://127.0.0.1:8000/get-book-detail/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(bookActions.setShow(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(bookActions.setShow(false));
      });
  };

  return (
    <Card className={styles.cardbox} onClick={bookHandler}>
      <NavLink to={`/home/${props.id}`} className={styles["link-box"]}>
        <Card.Img
          variant="top"
          className={styles.bookimage}
          src={props.imageurl}
        />
        <Card.Body>
          <h5 className={styles.booktitle}>{props.title}</h5>
          <Card.Text className={styles["card-text-container"]}>
            <div className={styles["flex-row"]}>
              <div className={styles["coin-base"]}>
                <img
                  src="https://t3.ftcdn.net/jpg/01/09/84/42/360_F_109844239_A7MdQSDf4y1H80cfvHZuSa0zKBkZ68S7.jpg"
                  alt="rating"
                  class={styles["small-image"]}
                />
                <p className={styles.bookdata}>{props.rating}</p>
              </div>
              <div className={styles["time-left"]}>
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/clock-2843478-2363825.png?f=webp"
                  // src="https://cdn-icons-png.flaticon.com/512/1827/1827336.png"
                  // src="https://cdn-icons-png.flaticon.com/512/6615/6615373.png"
                  alt="clock"
                  className={styles["small-image"]}
                />
                <p className={styles.bookdata}>
                  {moment(props.launched).format("LL")}
                </p>
              </div>
            </div>
            <div className={styles.cardattribute}>
              <img
                src="https://i.postimg.cc/SQBzNQf1/image-avatar.png"
                //   src="https://icon-library.com/images/library-book-icon/library-book-icon-20.jpg"
                alt="avatar"
                class={styles.smallavatar}
              />
              <p className={styles.booktext}>
                Creation of{" "}
                <span className={styles.author}>{props.author}</span>
              </p>
            </div>
          </Card.Text>
        </Card.Body>
      </NavLink>
    </Card>
  );
};

export default ShowBook;
