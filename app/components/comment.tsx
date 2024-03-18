import Image from "next/image";
import React, { useState } from "react";
import SendComment from "./sendcomment";
import Delete from "./delete";

export default function Comment(props: any) {
  const [score, setScore] = useState(props.score);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  function handleShowWarning() {
    setShowDelete(true);
  }

  function like() {
    if (userScore === -1) return;
    if (userScore === 1) {
      setScore(score - 1);
      setUserScore(0);
    } else {
      setScore(score + 1);
      setUserScore(1);
    }
  }

  function dislike() {
    if (userScore === 1) return;
    if (userScore === -1) {
      setScore(score + 1);
      setUserScore(0);
    } else {
      setScore(score - 1);
      setUserScore(-1);
    }
  }

  function handleHasReplied() {
    setIsReplying(false);
  }

  function confirmDelete() {
    setIsVisible(false);
    setShowDelete(false);
  }

  function cancelDelete() {
    setShowDelete(false);
  }

  function editComment() {
    setIsEditing(true);
  }

  function Username() {
    return (
      <>
        {(props.username === props.currentUser.username && (
          <div>
            <span className="text-Dark-blue font-bold">
              {props.currentUser.username}
            </span>
            <span className="bg-Moderate-blue px-1.5 rounded-sm mx-3">you</span>
          </div>
        )) || (
          <span className="text-Dark-blue font-bold">{props.username}</span>
        )}
      </>
    );
  }

  function CommentButtons() {
    const handleIsReplying = () => {
      setIsReplying(true);
    };

    if (props.username === props.currentUser.username) {
      return (
        <>
          <button
            onClick={handleShowWarning}
            className="flex space-x-2 items-center py-1 hover:opacity-50 text-Moderate-blue "
          >
            <Image
              className="mr-2"
              src="/icon-delete.svg"
              width={50}
              height={30}
              alt="deleteImg"
            />
            Delete
          </button>
          <button
            onClick={editComment}
            className="flex space-x-2 items-center py-1 hover:opacity-50 text-Moderate-blue "
          >
            <Image
              className="mr-2"
              src="/icon-edit.svg"
              width={50}
              height={30}
              alt="editImg"
            />
            Edit
          </button>
        </>
      );
    }
    return (
      <button
        onClick={handleIsReplying}
        className="flex space-x-2 items-center py-1 hover:opacity-50 text-Moderate-blue "
      >
        <Image
          className="mr-2"
          src="/icon-reply.svg"
          width={50}
          height={30}
          alt="replyImg"
        />
        Reply
      </button>
    );
  }

  return (
    <>
      {showDelete && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-Dark-blue bg-opacity-50">
            <Delete onCancel={cancelDelete} onDelete={confirmDelete} />
          </div>
        </>
      )}

      {isVisible && (
        <div>
          <div className="flex flex-col bg-White m-3 px-4 py-3 md:pl-20 rounded-lg max-w-3xl min-h-[10rem] space-y-3 relative">
            <div className="md:order-2 ">
              <div className="flex justify-start items-center space-x-4">
                <Image src={props.image.png} width={50} height={30} alt="pfp" />
                <Username />
                <span className="text-Grayish-Blue">{props.createdAt}</span>
              </div>
              <Content
                setIsEditing={setIsEditing}
                replyingTo={props.replyingTo}
                content={props.content}
                isEditing={isEditing}
              />
            </div>
            <div className="flex my-3 md:order-1">
              <div className="flex md:absolute left-6 md:flex-col md:items-center justify-around space-x-4 md:space-x-0 bg-Very-light-gray mr-5 rounded-md md:h-24">
                <button className="p-3 aspect-square " onClick={like}>
                  <Image
                    src="/icon-plus.svg"
                    alt="like"
                    width={50}
                    height={30}
                  />
                </button>
                <span className="py-2 md:py-0 text-Moderate-blue">{score}</span>
                <button className="p-3 aspect-square " onClick={dislike}>
                  <Image
                    src="/icon-minus.svg"
                    alt="dislike"
                    width={50}
                    height={30}
                  />
                </button>
              </div>
            </div>
            <div className="flex space-x-4 absolute right-0 bottom-0 p-5 md:top-0 md:bottom-full ">
              <CommentButtons />
            </div>
          </div>
          {isReplying && (
            <SendComment
              buttonText={"REPLY"}
              hasReplied={handleHasReplied}
              submitComment={props.handleReply}
              image={props.currentUser.image.png}
              replyingTo={props.username}
            />
          )}
        </div>
      )}
    </>
  );
}

function Content(props: any) {
  const [content, setContent] = useState(props.content);
  const replyTag = props.replyingTo ? `@${props.replyingTo}` : null;
  return (
    <>
      {(!props.isEditing && (
        <p className="text-Grayish-Blue my-3 break-words">
          <span className="text-Moderate-blue font-bold">{replyTag}</span>{" "}
          {content}
        </p>
      )) || (
        <ContentEdit
          contentToEdit={content}
          setContent={setContent}
          setIsEditing={props.setIsEditing}
        />
      )}
    </>
  );
}

function ContentEdit(props: any) {
  const handleContentChange = (event: any) => {
    props.setContent(event.target.value);
  };

  const handleEditSubmit = () => {
    props.setIsEditing(false);
  };

  return (
    <div className="m-3 flex flex-col">
      <textarea
        onChange={handleContentChange}
        value={props.contentToEdit}
        className="bg-White border resize-none border-Light-gray py-2 px-5 rounded-md placeholder:text-start text-Grayish-Blue "
        placeholder="Add a comment..."
      />
      <div className="flex justify-end my-4">
        <button
          onClick={handleEditSubmit}
          className="bg-Moderate-blue px-3 py-1 rounded-md hover:opacity-50"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
}
