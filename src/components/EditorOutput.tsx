import dynamic from "next/dynamic";
import Image from "next/image";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

type EditorOutputProps = {
  content: any;
};

const style = {
  pharagraph: {
    fontSzie: "0.8rem",
    lineHeight: "1.25rem",
  },
};

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

export const EditorOutput = ({ content }: EditorOutputProps) => {
  return (
    <Output
      data={content}
      style={style}
      className="text-sm"
      renderers={renderers}
    />
  );
};

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  return (
    <div className="relative w-full min-h-[15rem]">
      <Image src={src} alt="image" fill className="object-contain" />
    </div>
  );
}
function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}
