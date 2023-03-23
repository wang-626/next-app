import Comment from "components/issue/comment";
import type { comment } from "types/github";

export default function Comments({ comments }: { comments: comment[] }) {
  if (comments) {
    return (
      <div className="comments">
        {comments.map((comment, i) => {
          return <Comment key={i} comment={comment} />;
        })}
      </div>
    );
  } else {
    return <div className="container mx-auto px-4">test</div>;
  }
}
