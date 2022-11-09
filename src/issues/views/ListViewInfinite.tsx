import { useState } from "react";

import { useIssuesInfinite } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { State } from "../interfaces";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels });

  const onLabelChanged = (label: string) => {
    selectedLabels.includes(label)
      ? setSelectedLabels(selectedLabels.filter((l) => l !== label))
      : setSelectedLabels([...selectedLabels, label]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}
        {issuesQuery.hasNextPage ? (
          <button className="btn btn-sm btn-primary my-4" onClick={() => issuesQuery.fetchNextPage()}>
            Load more...
          </button>
        ) : undefined}
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={(labelName) => onLabelChanged(labelName)} />
      </div>
    </div>
  );
};
