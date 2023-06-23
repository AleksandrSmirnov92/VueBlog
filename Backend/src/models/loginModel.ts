import { supabase } from "../config/DB";
async function login(email: string) {
  let { data, error } = await supabase
    .from("users")
    .select("id,email,password,first_name,last_name")
    .match({ email: email })
    .single();
  if (error) {
    console.log("ошибка", error);
    return {
      status: "ERROR",
      message: "ERROR_EMAIL",
      error: "Такого Email не сущетсвует",
    };
  }
  if (data) {
    return { status: "SUCCESS", data: data };
  }
}
module.exports = {
  login,
};
