import Image from "next/image";
import React, { useState } from "react";

export default function SendComment(props: any) {
  const [comment, setComment] = useState("");
  const [buttonText, setButtonText] = useState(props.buttonText);

  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    props.submitComment(comment, props.replyingTo);
    setComment("");
    props.hasReplied && props.hasReplied();
  };
  return (
    <div className=" bg-White m-3 p-5 rounded-lg flex flex-col max-w-5xl space-y-3">
      <textarea
        onChange={handleCommentChange}
        value={comment}
        className="bg-White border resize-none border-Light-gray py-2 px-5 rounded-md placeholder:text-start text-Grayish-Blue"
        placeholder="Add a comment..."
      />

      <div className="flex justify-between py-2">
        <Image src={props.image} width={35} height={35} alt="pfp" />
        <button
          onClick={handleCommentSubmit}
          className="bg-Moderate-blue px-5 py-1 rounded-md hover:opacity-50"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
