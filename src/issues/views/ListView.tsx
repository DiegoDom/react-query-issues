import { useState } from "react";

import { useIssues } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { State } from "../interfaces";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery, page, nextPage, previousPage } = useIssues({ state, labels: selectedLabels });

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
          <IssueList issues={issuesQuery.data || []} state={state} onStateChanged={(newState) => setState(newState)} />
        )}
        <nav aria-label="Issues pagination" className="mt-2">
          <ul className="pagination justify-content-center">
            <li className={`page-item`}>
              <button className="page-link" onClick={previousPage} disabled={issuesQuery.isFetching}>
                Previous
              </button>
            </li>
            <li className="page-item">
              <a className="page-link">{page}</a>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={nextPage} disabled={issuesQuery.isFetching}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={(labelName) => onLabelChanged(labelName)} />
      </div>
    </div>
  );
};
