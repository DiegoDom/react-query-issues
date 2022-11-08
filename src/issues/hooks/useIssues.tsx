import { useQuery } from "@tanstack/react-query";

import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue, Label, State } from "../interfaces";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[] = [], state?: State): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }

  params.append("page", "1");
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const issuesQuery = useQuery(["issues", { labels, state }], () => getIssues(labels, state), {
    /* staleTime: 1000 * 60 * 60, */
  });

  return {
    issuesQuery,
  };
};
