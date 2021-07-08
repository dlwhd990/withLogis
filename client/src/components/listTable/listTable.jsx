import React from "react";
import ListItem from "./listItem";
import sytles from "./listTable.module.css";

const ListTable = ({ items }) => {
  const itemsKeyList = Object.keys(items);
  return (
    <section className={sytles.listTable}>
      <section className={sytles.table_container}>
        {itemsKeyList.map((key) => (
          <ListItem item={items[key]} key={key} id={key} />
        ))}
      </section>
    </section>
  );
};

export default ListTable;
