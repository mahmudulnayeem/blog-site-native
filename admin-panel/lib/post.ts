import client from "./client";

export const getPosts = async (pageNo: any, limit: any) => {
  try {
    const { data } = await client(`post/posts?pageNo=${pageNo}&limit=${limit}`);
    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
    return { error: error.message || error };
  }
};

export const deletePost = async (postId: number | string) => {
  try {
    const { data } = await client.delete(`post/${postId}`);
    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
    return { error: error.message || error };
  }
};

export const searchPost = async (query: string | undefined) => {
  try {
    const { data } = await client(`post/search?title=${query}`);
    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
    return { error: error.message || error };
  }
};
