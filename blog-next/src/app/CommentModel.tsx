import React, { useEffect, useState } from 'react';

interface Comment {
  id: number;
  attributes: {
    commentId: number;
    commentDesc: string;
    replies?: Reply[];
    name1?: string; // Include name1 in the Comment interface
  };
}

interface Reply {
  id: number;
  text: string;
}

const CommentModel = () => {
  const [comments, setComments] = useState<Comment[] | null>(null); // Initialize as null

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:1337/api/saves');
        const data = await response.json();
        setComments(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setComments([]); // Set as an empty array in case of an error
      }
    }

    fetchData();
  }, []);

  const handleReply = async (
    commentId: number,
    comments: Comment[],
    setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>
  ) => {
    const replyText = prompt('Enter your reply:');
    if (replyText) {
      try {
        const response = await fetch('http://localhost:1337/api/saves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              name1: replyText
            }
          }),
        });

        if (response.ok) {
          // Successfully created the reply, you can update the UI accordingly.
          const newReply = {
            id: Date.now(),
            text: replyText,
          };

          const newComments = comments.map((comment) => {
            if (comment.attributes.commentId === commentId) {
              return {
                ...comment,
                attributes: {
                  ...comment.attributes,
                  replies: [...(comment.attributes.replies || []), newReply],
                },
              };
            }
            return comment;
          });

          setComments(newComments);
        } else {
          console.error('Failed to create reply:', response.status);
        }
      } catch (error) {
        console.error('Error creating reply:', error);
      }
    }
  };

  return (
    <div className="main">
      <div className="comment-list">
        {comments !== null ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.attributes.commentDesc}</p>
              <p>Name1: {comment.attributes.name1 || 'N/A'}</p> {/* Display name1 or 'N/A' if null */}
              <button onClick={() => handleReply(comment.attributes.commentId, comments, setComments)}>
                Reply
              </button>
              <div className="replies">
                {comment.attributes.replies &&
                  comment.attributes.replies.map((reply) => (
                    <div key={reply.id} className="reply">
                      <p>{reply.text}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>Loading comments...</p>
        )}
      </div>
    </div>
  );
};

export default CommentModel;
