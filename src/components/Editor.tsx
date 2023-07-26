"use client";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostValidator, PostValidatorRequest } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import type EditorJS from "@editorjs/editorjs";
import EditorJSClass from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import ImageTool from "@editorjs/image";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { uploadFiles } from "@/lib/uploadthing";
import { toast } from "@/lib/use-toast";
import { usePathname, useRouter } from "next/navigation";

export const Editor = ({ subredditId }: { subredditId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

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
      placeholder: "Start writing your post...",
      inlineToolbar: true,
      data: { blocks: [] },
      tools: {
        header: Header,
        list: List,
        embed: Embed,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/link",
          },
        },
        table: Table,
        code: Code,
        InlineCode: InlineCode,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                const [res] = await uploadFiles({
                  files: [file],
                  endpoint: "imageUploader",
                });
                return {
                  success: 1,
                  file: {
                    url: res.fileUrl,
                  },
                };
              },
            },
          },
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

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subredditId,
    }: PostValidatorRequest) => {
      const payload: PostValidatorRequest = {
        title,
        content,
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/post/create", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          return toast({
            title: "You must be subscriber.",
            description: "Subscirbe post to create a new post",
            variant: "destructive",
          });
        }
        if (err.response?.status === 401) return router.push("/sign-in");
      }
    },
    onSuccess: () => {
      const newPath = pathname.split("/").slice(0, -1).join("/");
      router.push(newPath);

      router.refresh();
      return toast({
        description: "Your post has been published.",
      });
    },
  });

  const onSubmit = async (data: PostValidatorRequest) => {
    const block = await editorRef.current?.save();
    const payload: PostValidatorRequest = {
      title: data.title,
      content: block,
      subredditId,
    };
    createPost(payload);
  };

  return (
    <form
      id="subreddit-post-form"
      className="bg-white outline outline-secondaryBg rounded-lg p-5 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextareaAutosize
        className="resize-none text-5xl font-bold focus:outline-none w-full appearance-none"
        placeholder="Title"
        {...register("title")}
      />
      <div id="editorjs" className="min-h-[500px]" />
    </form>
  );
};
