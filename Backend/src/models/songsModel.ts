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
async function getSongsById(id: string | number) {
  let { data, error } = await supabase
    .from("songs")
    .select("id,user,title,song,songName")
    .eq("user", id);
  if (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: error,
    };
  }
  if (data) {
    return {
      status: "SUCCESS",
      songs: data,
    };
  }
}
async function deleteSongByid(
  idUser: string | number,
  songName: string,
  id: string | number
) {
  const { data, error } = await supabase.storage
    .from("songs")
    .remove([`user_${idUser}/song_${songName}`]);
  if (error) {
    console.log(error);
  }
  if (data) {
    const { error } = await supabase.from("songs").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    console.log("Песня успешно удаленна");
    return {
      status: "SUCCESS",
    };
  }
}
module.exports = {
  uploadSongs,
  getSongsById,
  deleteSongByid,
};
