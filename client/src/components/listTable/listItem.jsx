import React, { useEffect, useState } from "react";
import styles from "./listItem.module.css";

const ListItem = ({ item, id, length }) => {
  const [viewContent, setViewContent] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const controlView = () => {
    setViewContent(!viewContent);
  };

  useEffect(() => {
    if (id === "0") {
      setIsFirst(true);
    } else if (id === length - 1) {
      setIsLast(true);
    }
  }, []);

  return (
    <section
      className={
        isFirst
          ? `${styles.list_item_first}`
          : isLast
          ? `${styles.list_item_last}`
          : `${styles.list_item}`
      }
      onClick={controlView}
    >
      <div className={styles.item}>
        <h1 className={styles.title}>{`${item.step}. ${item.title}`}</h1>
        <div className={styles.icon_container}>
          {viewContent ? (
            <img src="/images/up.png" alt="close" />
          ) : (
            <img src="/images/down.png" alt="open" />
          )}
        </div>
      </div>
      {viewContent && (
        <div className={styles.content_container}>
          <p className={styles.content}>{item.desc}</p>
        </div>
      )}
    </section>
  );
};

export default ListItem;
