export interface FollowedPeople {
  data: { name: string }[];
  meta: {
    result_count: number;
    next_token?: string;
    previous_token?: string;
  };
}
