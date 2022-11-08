import { useState } from "react";

import { useIssues } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssues();

  const onLabelChanged = (label: string) => {
    selectedLabels.includes(label)
      ? setSelectedLabels(selectedLabels.filter((l) => l !== label))
      : setSelectedLabels([...selectedLabels, label]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? <LoadingIcon /> : <IssueList issues={issuesQuery.data || []} />}
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={(labelName) => onLabelChanged(labelName)} />
      </div>
    </div>
  );
};
