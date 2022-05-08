import { useContext } from "react";
import { DayContext } from "../context/DayProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function LecturePage() {
  const { landingRaw } = useContext(DayContext);

  return (
    <div className="lecture">
      {landingRaw && landingRaw?.lessons[0].markdown && (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {landingRaw?.lessons[0].markdown}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default LecturePage;
