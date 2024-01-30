// SunEditor/index.js
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { useController } from "react-hook-form";
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
const ButtonCustomList = [
  ["undo", "redo"],
  ["font", "fontSize", "formatBlock"],
  ["paragraphStyle", "blockquote"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor"],
  ["align", "list", "lineHeight"],
  ["outdent", "indent"],
  ["fullScreen", "showBlocks", "codeView"],
  ["preview", "print"],
  ["removeFormat"],

  [
    ":i-More Misc-default.more_vertical",
    "image",
    "video",
    "audio",
    "link",
    "fullScreen",
    "showBlocks",
    "codeView",
    "preview",
    "print",
    "save",
    "template",
  ],
  [":r-More Rich-default.more_plus", "table", "horizontalRule", "imageGallery"],
];

const Editor = ({ control, name, defaultValue, ...props }) => {
  const {
    field: { value, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: defaultValue,
  });

  const defaultFonts = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
  ];
  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts,
  ].sort();

  // console.log('inputProps:', inputProps);
  // console.log('invalid:', invalid);
  // console.log('isTouched:', isTouched);
  // console.log('isDirty:', isDirty);
  // console.log('touchedFields:', touchedFields);
  // console.log('dirtyFields:', dirtyFields);

  return (
    <SunEditor
      {...props}
      {...inputProps}
      defaultValue={value}
      width="100%"
      height="100%"
      setOptions={{
        buttonList: ButtonCustomList,
        defaultTag: "div",
        minHeight: "300px",
        showPathLabel: false,
        font: sortedFontOptions,
      }}
    />
  );
};

export default Editor;
