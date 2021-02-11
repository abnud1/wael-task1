import { PropsWithChildren } from "react";
import "./index.css";

interface TitleBorderedProps {
  title: string;
}

export default function TitleBordered(
  props: PropsWithChildren<TitleBorderedProps>
) {
  const { children, title } = props;
  return (
    <>
      <div
        className="title-bordered-text border border-primary"
        style={{ width: `${title.length}ch` }}
      >
        <span className="btn text-white">{title}</span>
      </div>
      <div
        className="title-bordered-overlay bg-secondary"
        style={{ width: `calc(${title.length}ch - 2px)` }}
      />
      <div className="title-bordered-content container border border-primary">
        {children}
      </div>
    </>
  );
}
