// import { LikeCell } from '@/components/like';
// import { LoadingPage } from '@/ui/loading';
// import React, { useEffect, useState } from 'react';

// const Read = (): JSX.Element => {
//   return (
//     <body className="h-screen bg-white">
//       <div className="w-full content-center justify-center">
//         666
//         <LikeCell liked={true} role={''} roleId={0} />
//       </div>
//     </body>
//   );
// };

// export default Read;

import React, { useState } from 'react';

type Comment = {
  id: string;
  text: string;
};

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <div className="bg-white p-4">
      <h2 className="mb-2 text-lg font-medium">Comments</h2>
      {comments.length === 0 && (
        <p className="text-gray-400">No comments yet.</p>
      )}
      <div className="divide-y">
        {comments.map((comment) => (
          <div key={comment.id} className="flex py-2">
            <div className="ml-2">
              <p className="font-medium">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentForm: React.FC<{ onSubmit: (text: string) => void }> = ({
  onSubmit
}) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim() === '') return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newComment: Comment = {
      id: String(Math.random()),
      text
    };
    onSubmit(text);
    setText('');
    setIsSubmitting(false);
    setIsSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-white p-4">
      <div className="mb-4 flex flex-wrap">
        <label htmlFor="comment" className="text-gray-600">
          Add a Comment
        </label>
        <textarea
          id="comment"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          rows={3}
          disabled={isSubmitting}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 ${
            isSubmitting ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {isSubmitted && (
        <div
          className="relative mt-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
          role="alert"
        >
          <p className="font-medium">Comment submitted!</p>
        </div>
      )}
    </form>
  );
};

const Read: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentSubmit = (text: string) => {
    const newComment: Comment = {
      id: String(Math.random()),
      text
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <CommentList comments={comments} />
      <div className="mt-auto">
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default Read;
