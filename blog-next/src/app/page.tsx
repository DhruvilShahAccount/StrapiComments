"use client"
// BlogDetailPage.tsx
import CommentModel from './CommentModel';
import loadMainData from './Header';

const BlogDetailPage = () => {
  return (
    <body>
      {loadMainData()}
      <CommentModel />
    </body>
  );
};

export default BlogDetailPage;
