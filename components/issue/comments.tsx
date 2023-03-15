import Comment from "components/issue/comment";

type comment = {
  id: string;
  body: string;
  author: {
    login: string;
  };
};

export default function Comments({ comments }: { comments: comment[] }) {
  if (comments) {
    return (
      <div className="comments">
        {comments.map((obj, i) => {
          return <Comment key={i} comment={obj} />;
        })}
      </div>
    );
  } else {
    return <div className="container mx-auto px-4">test</div>;
  }
}
