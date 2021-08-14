import React from "react";
import ListItem from "./listItem";
import styles from "./listTable.module.css";

const ListTable = ({ items, title }) => {
  items.sort(function (a, b) {
    return a.step < b.step ? -1 : a.step > b.step ? 1 : 0;
  });

  return (
    <section className={styles.list_table}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <section className={styles.table_container}>
        {items.map((item, index) => (
          <ListItem
            item={item}
            key={item.title}
            id={index}
            length={items.length}
            where={title}
          />
        ))}
      </section>
    </section>
  );
};

export default ListTable;
