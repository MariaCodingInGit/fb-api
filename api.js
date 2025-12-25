import { ACCESS_TOKEN, BASE_URL } from "./config.js";

export async function getUserData(userId) {
  const fields = [
    "id",
    "name",
    "birthday",
    "hometown",
    "location",
    "likes",
    "events",
    "photos",
    "videos",
    "friends",
    "posts",
    "gender",
    "link",
    "age_range",
    "email",
    "picture"
  ].join(",");

  const url = `${BASE_URL}/${userId}?fields=${fields}&access_token=${ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Facebook API request failed");
  }

  return data;
}

export async function getPagePosts(pageId) {
  const url = `${BASE_URL}/${pageId}/posts?fields=message,created_time&access_token=${ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Facebook API request failed");
  }

  return data;
}
