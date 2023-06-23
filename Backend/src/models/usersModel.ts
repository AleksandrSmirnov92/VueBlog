import { supabase } from "../config/DB";
async function uploadFotoProfil(
  fileOriginalName: string,
  croppedPhotoBuffer: string
) {
  const { data, error } = await supabase.storage
    .from("photos")
    .upload(`cropped_${fileOriginalName}`, croppedPhotoBuffer);
  return supabase.storage
    .from("photos")
    .getPublicUrl(`cropped_${fileOriginalName}`);
}
async function updateUser(
  id: string,
  first_name: string,
  last_name: string,
  location: string,
  description: string,
  photoUrl: any,
  image: any
) {
  let updateUser = await supabase
    .from("users")
    .update({
      first_name: first_name,
      last_name: last_name,
      location: location,
      description: description,
      image: photoUrl ? photoUrl.data.publicUrl : image,
    })
    .eq("id", id)
    .single();
  return {
    status: "SUCCESS",
  };
}
async function getUserById(id: string | number) {
  let { data, error } = await supabase
    .from("users")
    .select("id, first_name, last_name, location, description,image")
    .eq("id", id)
    .single();
  if (error) {
    return { status: "ERROR" };
  }
  if (data) {
    return {
      status: "SUCCESS",
      user: data,
    };
  }
}
module.exports = {
  uploadFotoProfil,
  updateUser,
  getUserById,
};
