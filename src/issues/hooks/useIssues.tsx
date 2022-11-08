import { useQuery } from "@tanstack/react-query";

import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue } from "../interfaces";

const getIssues = async (): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>("/issues");
  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery(["issues"], getIssues, {
    staleTime: 1000 * 60 * 60,
  });

  return {
    issuesQuery,
  };
};
