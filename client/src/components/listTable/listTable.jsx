import React from "react";
import ListItem from "./listItem";
import styles from "./listTable.module.css";

const ListTable = ({ items, title }) => {
  items.sort(function (a, b) {
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
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
            key={item.id}
            id={index}
            length={items.length}
          />
        ))}
      </section>
    </section>
  );
};

export default ListTable;
