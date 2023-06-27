import { supabase } from "../config/DB";
async function uploadImagePosts(
  user_id: string | number,
  fileOriginalName: string,
  croppedPhotoBuffer: string,
  random: string | number
) {
  const { data, error } = await supabase.storage
    .from("posts")
    .upload(
      `user_${user_id}` + "/" + `post_${fileOriginalName}_${random}`,
      croppedPhotoBuffer
    );
  return supabase.storage
    .from("posts")
    .getPublicUrl(
      `user_${user_id}` + "/" + `post_${fileOriginalName}_${random}`
    );
}
async function updatePost(
  user_id: string | number,
  title: string,
  location: string,
  description: string,
  photoUrl: string,
  fileOriginalName: string,
  random: string | number
) {
  let updatePost = await supabase
    .from("posts")
    .insert({
      user: user_id,
      title: title,
      location: location,
      description: description,
      image: photoUrl,
      imageName: `${fileOriginalName}_${random}`,
    })
    .single();
  return {
    status: "SUCCESS",
  };
}
async function countPage() {
  let count = await supabase.from("posts").select("*");
  return {
    page_count: count.data.length,
  };
}
async function getInfoPage(prePage: string | number, page: string | number) {
  let { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, location, description,image,imageName, users (id,first_name,last_name,image)"
    )
    .range(prePage, Number(page) - 1);
  if (error) {
    console.log(error);
  }
  if (data) {
    return {
      status: "SUCCESS",
      posts: data,
    };
  }
}
async function getPostByIdUser(userId: string | number) {
  let { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, location, description,image,imageName, users (id,first_name,last_name,image)"
    )
    .eq("user", userId);
  if (error) {
    console.log(error);
    return {
      status: "ERROR",
    };
  }
  if (data) {
    return {
      status: "SUCCESS",
      posts: data,
      page_count: data.length,
    };
  }
}
async function deletePostByIdUser(
  userId: string | number,
  imageName: string,
  id: string | number
) {
  const { data, error } = await supabase.storage
    .from("posts")
    .remove([`user_${userId}/post_${imageName}`]);
  if (error) {
    console.log(error);
  }
  if (data) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    console.log("Пост успешно удален");
    return {
      status: "SUCCESS",
    };
  }
}
async function updatePostByIdUser(
  user_id: string | number,
  title: string,
  location: string,
  description: string,
  photoUrl: { data: { publicUrl: string } },
  image: string,
  fileOriginalName: string,
  random: string | number,
  imageName: string,
  id: string | number,
  file: any
) {
  let updatePost = await supabase
    .from("posts")
    .update({
      user: user_id,
      title: title,
      location: location,
      description: description,
      image: photoUrl !== undefined ? photoUrl.data.publicUrl : image,
      imageName:
        file !== undefined ? `${fileOriginalName}_${random}` : imageName,
    })
    .eq("id", id)
    .single();
  return {
    status: "SUCCESS",
  };
}
module.exports = {
  uploadImagePosts,
  updatePost,
  countPage,
  getInfoPage,
  getPostByIdUser,
  deletePostByIdUser,
  updatePostByIdUser,
};
