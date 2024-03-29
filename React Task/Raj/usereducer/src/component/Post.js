import React, { useState } from "react";

function Post({ dispatch, postId, x }) {
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);
  const [detail, setDetail] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    if (edit) {
      dispatch({
        type: "EDIT",
        postId: postId,
        payload: {
          ...detail,
          comment: data,
        },
      });
    } else {
      dispatch({
        type: "ADD",
        postId,
        payload: {
          id: Math.floor(Math.random() * 1000),
          comment: data,
          commenter: "RaZz",
          commentedDate: new Date(),
        },
      });
    }
  };

  const deleteCmnt = data =>
    dispatch({
      type: "DELETE",
      postId: data.postId,
      commentId: data.commentId,
    });

  const editCmnt = (data, pid) => {
    setData(data.comment);
    setEdit(true);
    setDetail(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={e => setData(e.target.value)}
          value={data}
        />

        <button>Click</button>
      </form>
      <h2>{x.title}</h2>
      <h2>{x.postedBy}</h2>
      {x.postComments.map((data, i) => {
        return (
          <div key={i}>
            <p>Comment: {data.comment}</p>
            <p>commenter: {data.commenter}</p>

            <button onClick={() => editCmnt(data, x.id)}>Edit</button>
            <button
              onClick={() => deleteCmnt({ postId: x.id, commentId: data.id })}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
