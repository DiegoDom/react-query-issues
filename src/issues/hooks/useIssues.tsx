import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { sleep } from "../../helpers";
import { githubApi } from "../../api/githubApi";
import { Issue, State } from "../interfaces";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({ labels, state, page = 1 }: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }

  params.append("page", `${page}`);
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const issuesQuery = useQuery(["issues", { labels, state, page }], () => getIssues({ labels, state, page }), {
    /* staleTime: 1000 * 60 * 60, */
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? "Loading" : page,
    nextPage,
    previousPage,
  };
};
