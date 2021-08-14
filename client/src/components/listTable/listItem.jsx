import React, { useEffect, useState } from "react";
import styles from "./listItem.module.css";

const ListItem = ({ item, id, length, where }) => {
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

  let desc;
  let step;

  if (where === "관련 기관") {
    step = item.id;
    if (item.phone) {
      desc = `[전화번호]\n ${item.phone}\n\n`;
    } else {
      desc = ``;
    }
  } else {
    step = item.step;
    desc = item.desc;
  }

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
        <h1 className={styles.title}>{`${step}. ${item.title}`}</h1>
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
          <p className={styles.content}>{desc}</p>
          {where === "관련 기관" && (
            <p className={styles.content}>
              웹사이트:{" "}
              <a href={item.web} target="_blank">
                {item.web}
              </a>
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default ListItem;
