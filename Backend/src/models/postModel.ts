import { supabase } from "../config/DB";
async function getPost(id: string | number) {
  let { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, location, description,image,imageName, users (id,first_name,last_name,image)"
    )
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
  }
  if (data) {
    return {
      status: "SUCCESS",
      post: data,
    };
  }
}
module.exports = { getPost };
