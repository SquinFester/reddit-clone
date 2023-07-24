"use client";

import TextareaAutosize from "react-textarea-autosize";
import { useForm, SubmitHandler } from "react-hook-form";
import type EditorJS from "@editorjs/editorjs";
import { PostValidator, PostValidatorRequest } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef } from "react";

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

  const ref = useRef<EditorJS>();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const Linktool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady() {
          ref.current = editor;
        },
      });
    }
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
