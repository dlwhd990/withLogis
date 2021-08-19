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
  } else if (where === "수출 한눈에 보기") {
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
    >
      <div
        className={
          where === "시행 중 정책" ? `${styles.pol_item}` : `${styles.item}`
        }
        onClick={controlView}
      >
        {where === "시행 중 정책" ? (
          <div className={styles.policy_title_container}>
            <span className={styles.title_org_name}>{item.org_name}</span>
            <p className={styles.title_business_name}>{item.business_name}</p>
          </div>
        ) : (
          <p className={styles.title}>{`${step}. ${item.title}`}</p>
        )}
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
          {where !== "시행 중 정책" && <p className={styles.content}>{desc}</p>}

          {where === "관련 기관" && (
            <p className={styles.content}>
              웹사이트:{" "}
              <a href={item.web} target="_blank">
                {item.web}
              </a>
            </p>
          )}
          {where === "시행 중 정책" && (
            <div className={styles.policy_content_container}>
              <div className={styles.policy_desc_container}>
                <span className={styles.policy_desc_title}>설명</span>
                <p className={styles.policy_desc}>{item.business_desc}</p>
              </div>
              <div className={styles.policy_url_container}>
                <span className={styles.policy_url_title}>URL</span>
                <div className={styles.policy_url_a_box}>
                  <a
                    href={item.url}
                    target={"_blank"}
                    className={styles.policy_url}
                  >
                    {item.url}
                  </a>
                </div>
              </div>
              <div className={styles.policy_contact_container}>
                <span className={styles.policy_contact_title}>접수</span>
                <p className={styles.policy_contact}>{item.contact}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ListItem;
