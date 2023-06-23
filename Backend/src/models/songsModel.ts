import { supabase } from "../config/DB";
async function uploadSongs(
  user_id: string | number,
  fileOriginalName: string,
  songBuffer: string,
  title: string
) {
  const { data, error } = await supabase.storage
    .from("songs")
    .upload(`user_${user_id}` + "/" + `song_${fileOriginalName}`, songBuffer);

  if (error) {
    console.log(error);
    return { status: "ERROR", message: "Duplicate" };
  }
  if (data) {
    let songUrl = await supabase.storage
      .from("songs")
      .getPublicUrl(`user_${user_id}` + "/" + `song_${fileOriginalName}`);
    let { error } = await supabase
      .from("songs")
      .insert({
        user: user_id,
        title: title,
        song: songUrl.data.publicUrl,
        songName: fileOriginalName,
      })
      .single();
    if (error) {
      console.log(error);
    }
    if (data) {
      return {
        status: "SUCCESS",
      };
    }
  }
}
module.exports = {
  uploadSongs,
};
