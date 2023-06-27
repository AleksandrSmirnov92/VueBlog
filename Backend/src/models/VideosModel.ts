import { supabase } from "../config/DB";
async function addVideo(
  user_id: string | number,
  title: string,
  currentUrl: string
) {
  let { error } = await supabase.from("video").insert({
    user: user_id,
    title: title,
    url: currentUrl,
  });
  if (error) {
    return console.log(error);
  }
  return {
    status: "SUCCESS",
  };
}
async function getVideo(id: string | number) {
  let { data, error } = await supabase
    .from("video")
    .select("id,user,title,url")
    .eq("user", id);
  if (error) {
    return {
      status: "ERROR",
      error: error,
    };
  }
  if (data) {
    return {
      status: "SUCCESS",
      videos: data,
    };
  }
}
async function deleteVideo(videoId: string | number) {
  const { error } = await supabase.from("video").delete().eq("id", videoId);
  if (error) {
    console.log(error);
  }
  console.log("Видео успешно удаленно");
  return {
    status: "SUCCESS",
  };
}
module.exports = {
  addVideo,
  getVideo,
  deleteVideo,
};
