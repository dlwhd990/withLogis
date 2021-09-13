import React from "react";
import ListItem from "./listItem";
import styles from "./listTable.module.css";

const ListTable = ({ items, title }) => {
  if (items[0].step) {
    items.sort(function (a, b) {
      return a.step < b.step ? -1 : a.step > b.step ? 1 : 0;
    });
  } else if (items[0].org_name) {
    items.sort(function (a, b) {
      return a.org_name < b.org_name ? -1 : a.org_name > b.org_name ? 1 : 0;
    });
  } else if (items[0].id) {
    items.sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
  }

  return (
    <section className={styles.list_table}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <section className={styles.table_container}>
        {items.map((item, index) => (
          <ListItem
            item={item}
            key={item._id}
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
