"use client";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostValidator, PostValidatorRequest } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import EditorJSClass from "@editorjs/editorjs";
import type EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import ImageTool from "@editorjs/image";

export const Editor = ({ subredditId }: { subredditId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostValidatorRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      subredditId,
      content: null,
    },
  });

  const editorRef = useRef<EditorJS>();

  useEffect(() => {
    const editorConfig = {
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
        embed: Embed,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "api/link",
          },
        },
        table: Table,
        code: Code,
        InlineCode: InlineCode,
        image: {
          class: ImageTool,
        },
      },
    };
    editorRef.current = new EditorJSClass(editorConfig);

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = undefined;
      }
    };
  }, []);

  return (
    <form
      id="subreddit-post-form"
      className="bg-white outline outline-secondaryBg rounded-lg p-5 w-full"
    >
      <TextareaAutosize
        className="resize-none text-5xl font-bold focus:outline-none w-full appearance-none"
        placeholder="Title"
      />
      <div id="editorjs" className="min-h-[500px]" />
    </form>
  );
};
