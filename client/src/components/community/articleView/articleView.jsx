import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./articleView.module.css";
import axios from "axios";
import Reply from "../reply/reply";
import ErrorPage from "../../errorPage/errorPage";

const ArticleView = ({
  articles,
  noticeArticles,
  replies,
  noticeReplies,
  loadBbsReply,
  loadNoticeReply,
  user,
}) => {
  const { where, id } = useParams();
  const replyRef = useRef();
  const history = useHistory();
  const [isWriter, setIsWriter] = useState(false);
  const [recommandCount, setRecommandCount] = useState(null);
  const [article, setArticle] = useState(null);
  const [replyList, setReplyList] = useState(null);
  const [replyKeyList, setReplyKeyList] = useState(null);
  let timeId, month, day, hour, minute;
  let i;

  // 더 나은 방법이 있을 지 생각해보기 (그냥 id와 인덱스를 매치하면 삭제 때문에 불가능함)

  const articleSetting = () => {
    if (where === "bbs") {
      for (i = 0; i < articles.length; i++) {
        if (articles[i].id.toString() === id) {
          setArticle(articles[i]);
        }
      }
    } else if (where === "notice") {
      for (let i = 0; i < noticeArticles.length; i++) {
        if (noticeArticles[i].id.toString() === id) {
          setArticle(noticeArticles[i]);
        }
      }
    }
  };

  const replySetting = () => {
    if (where === "bbs") {
      for (i = 0; i < replies.length; i++) {
        if (replies[i].id === article.id) {
          setReplyList(replies[i].replyList);
          break;
        }
      }
    } else if (where === "notice") {
      for (i = 0; i < noticeReplies.length; i++) {
        if (noticeReplies[i].id === article.id) {
          setReplyList(noticeReplies[i].replyList);
          break;
        }
      }
    }
  };

  useEffect(() => {
    articleSetting();
  }, []);

  useEffect(() => {
    article && replySetting();
    article && setRecommandCount(article.recommand);
  }, [article, replies, noticeReplies]);

  useEffect(() => {
    replyList && setReplyKeyList(Object.keys(replyList));
  }, [replyList]);

  useEffect(() => {
    if (user && article && article.writerId === user.userId) {
      setIsWriter(true);
    }
  }, [user, article]);

  const makeDate = () => {
    let date = new Date();
    timeId = date.getTime();
    month = (date.getMonth() + 1).toString().padStart(2, "0");
    day = date.getDate().toString().padStart(2, "0");
    hour = date.getHours().toString().padStart(2, "0");
    minute = date.getMinutes().toString().padStart(2, "0");
  };

  const onRecommandHandler = () => {
    if (!user) {
      window.alert(" 로그인 후에 추천이 가능합니다.");
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
          window.location.reload(); // 새로고침 없이 하려면 댓글처럼 따로 컬렉션을 두어야할지
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

  const onEditHandler = () => {
    window.scrollTo({ top: 0 });
    history.push(`/${where}/edit/${article.id}`);
  };

  const onReplySubmitHandler = (e) => {
    e.preventDefault();

    const nowContent = replyRef.current.value;

    if (!user) {
      window.alert("로그인 후에 댓글 작성이 가능합니다.");
      return;
    }
    if (nowContent === "") {
      window.alert("내용이 없는 댓글은 작성할 수 없습니다.");
      return;
    }

    makeDate();

    const newReply = {
      id: id,
      timeId: timeId,
      content: nowContent,
      date: `${month}/${day} ${hour}:${minute}`,
      writer: user.nickname,
      writerId: user.userId,
    };

    axios
      .post(`/api/${where}/writeReply`, newReply)
      .then(() => {
        if (where === "bbs") {
          loadBbsReply();
        } else if (where === "notice") {
          loadNoticeReply();
        }

        replyRef.current.value = "";
      })
      .catch((err) => console.error("error: ", err.response));
  };

  if (article && replyKeyList) {
    return (
      <section className={styles.article_view}>
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
              {isWriter && (
                <button className={styles.edit} onClick={onEditHandler}>
                  수정
                </button>
              )}
              {isWriter && (
                <button className={styles.delete} onClick={onDeleteHandler}>
                  삭제
                </button>
              )}
              <button className={styles.recommand} onClick={onRecommandHandler}>
                추천하기
              </button>
              <p
                className={styles.recommand_count}
              >{`추천 ${recommandCount}`}</p>
            </div>
          </div>
          <div className={styles.content_container}>
            <p className={styles.content}>{article.content}</p>
          </div>
          <div className={styles.reply_input_container}>
            <p
              className={styles.reply_input_title}
            >{`댓글 ${replyList.length}`}</p>
            <form
              className={styles.reply_input_form}
              onSubmit={onReplySubmitHandler}
            >
              <textarea
                ref={replyRef}
                className={styles.reply_input_textarea}
                name="reply"
                spellCheck="false"
                placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 제재를 받을 수 있습니다."
              ></textarea>
              <button type="submit" className={styles.reply_submit_button}>
                등록
              </button>
            </form>
          </div>
          <div className={styles.reply_container}>
            {replyKeyList &&
              replyKeyList.map((key) => (
                <Reply
                  key={replyList[key].timeId}
                  reply={replyList[key]}
                  user={user}
                />
              ))}
          </div>
        </article>
      </section>
    );
  } else {
    return <ErrorPage />;
  }
};

export default ArticleView;
