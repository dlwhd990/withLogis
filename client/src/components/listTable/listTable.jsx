import React from "react";
import ListItem from "./listItem";
import sytles from "./listTable.module.css";

const ListTable = ({ items }) => {
  console.log(items);
  const itemsKeyList = Object.keys(items);
  console.log(itemsKeyList);
  return (
    <section className={sytles.listTable}>
      <section className={sytles.table_container}>
        {itemsKeyList.map((key) => (
          <ListItem item={items[key]} key={key} />
        ))}
      </section>
    </section>
  );
};

export default ListTable;
