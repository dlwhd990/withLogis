import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./articleView.module.css";
import axios from "axios";

const ArticleView = ({ articles, noticeArticles, user }) => {
  const { where, id } = useParams();
  const history = useHistory();
  const [isWriter, setIsWriter] = useState(false);
  const [recommandCount, setRecommandCount] = useState(null);
  let article;

  // 더 나은 방법이 있을 지 생각해보기 (그냥 id와 인덱스를 매치하면 삭제 때문에 불가능함)
  if (where === "bbs") {
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].id.toString() === id) {
        article = articles[i];
      }
    }
  } else if (where === "notice") {
    for (let i = 0; i < noticeArticles.length; i++) {
      if (noticeArticles[i].id.toString() === id) {
        article = noticeArticles[i];
      }
    }
  }

  useEffect(() => {
    if (user && article.writerId === user.userId) {
      setIsWriter(true);
    }
    setRecommandCount(article.recommand);
  }, [user]);

  const onRecommandHandler = () => {
    if (!user) {
      window.alert("로그인 후에 추천이 가능합니다.");
      return;
    }
    console.log(user.userId, article.recommandList);
    if (article.recommandList.includes(user.userId)) {
      window.alert("이미 추천하셨습니다.");
    } else {
      axios
        .post(`/api/${where}/recommand`, {
          id: article.id,
          userId: user.userId,
          recommand_count: article.recommand,
          recommand_list: article.recommandList,
        })
        .then((res) => {
          window.alert(res.data.message);
          setRecommandCount(recommandCount + 1);
          window.location.reload(); // 나중에 새로고침 없이 되도록 개선할 것
        })
        .catch((err) => console.error("error: ", err.response));
    }
  };

  const afterDelete = () => {
    window.location.href = `/${where}`;
  };

  const onDeleteHandler = () => {
    const confirmPopup = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (confirmPopup) {
      axios
        .post(`/api/${where}/delete`, {
          id: article.id,
        })
        .then((res) => window.alert(res.data.message))
        .then(afterDelete)
        .catch((err) => console.error("error: ", err.response));
    }
  };

  return (
    <section className={styles.articleView}>
      <article className={styles.article}>
        <div className={styles.title_container}>
          <p className={styles.title}>{article.title}</p>
        </div>
        <div className={styles.user_data_and_button_container}>
          <div className={styles.user_data_container}>
            <p className={styles.writer}>{article.writer}</p>
            <p className={styles.date}>{article.date}</p>
          </div>
          <div className={styles.button_container}>
            {isWriter && <button className={styles.edit}>수정</button>}
            {isWriter && (
              <button className={styles.delete} onClick={onDeleteHandler}>
                삭제
              </button>
            )}
            <button className={styles.recommand} onClick={onRecommandHandler}>
              추천하기
            </button>
            <p className={styles.recommand_count}>{`추천 ${recommandCount}`}</p>
          </div>
        </div>
        <div className={styles.content_container}>
          <p className={styles.content}>{article.content}</p>
        </div>
      </article>
    </section>
  );
};

export default ArticleView;
