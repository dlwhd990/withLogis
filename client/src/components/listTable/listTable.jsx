import React from "react";
import ListItem from "./listItem";
import styles from "./listTable.module.css";

const ListTable = ({ items, title }) => {
  const itemsKeyList = Object.keys(items);
  return (
    <section className={styles.list_table}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <section className={styles.table_container}>
        {itemsKeyList.map((key) => (
          <ListItem
            item={items[key]}
            key={key}
            id={key}
            length={items.length}
          />
        ))}
      </section>
    </section>
  );
};

export default ListTable;
