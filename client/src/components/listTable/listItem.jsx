import React, { useEffect, useState } from "react"
import styles from "./listItem.module.css"

const ListItem = ({ item }) => {
  const [viewContent, setViewContent] = useState(false)
  const controlView = () => {
    setViewContent(!viewContent)
  }
  return (
    <section className={styles.listItem}>
      <div className={styles.item}>
        <h1 className={styles.title}>{item.title}</h1>
        <div className={styles.icon_container} onClick={controlView}>
          {viewContent ? (
            <img src="/images/up.png" alt="close" />
          ) : (
            <img src="/images/down.png" alt="open" />
          )}
        </div>
      </div>
      {viewContent && (
        <div className={styles.content_container}>
          <p className={styles.content}>{item.content}</p>
        </div>
      )}
    </section>
  )
}

export default ListItem
