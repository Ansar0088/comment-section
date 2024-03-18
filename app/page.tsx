"use client";
import React, { useState } from "react";
import commentdata from "./commentdata.json";
import CommentBlock from "./components/commentblock";
import Head from "next/head";
import SendComment from "./components/sendcomment";
const Page = () => {
  const currentUser = commentdata.currentUser;
  const [commentSection, setCommentSection] = useState(commentdata.comments);

  function buildCommentSection(comment: any) {
    return comment.map((comment: any) => (
      <CommentBlock
        currentUser={currentUser}
        commentId={comment.id}
        key={comment.id}
        comment={comment}
      />
    ));
  }
  function addNewComment(text: any) {
    const newComment = buildCommentObj(text);
    setCommentSection((previousComments) => [...previousComments, newComment]);
  }

  function buildCommentObj(text: any) {
    const newComment = {
      id: commentSection.length + 1,
      content: text,
      createdAt: "a second ago",
      score: 0,
      user: currentUser,
      replies: [],
    };

    return newComment;
  }
  return (
    <>
      <Head>
        <title>Interactive Comments Section</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="font-rubik py-5 flex justify-center">
        <section className="flex flex-col">
          <h1 className="sr-only">comment section</h1>
          {buildCommentSection(commentSection)}
          <SendComment
            buttonText={"SEND"}
            submitComment={addNewComment}
            image={currentUser.image.png}
          />
        </section>
      </main>
    </>
  );
};

export default Page;
