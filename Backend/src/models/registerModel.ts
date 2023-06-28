import { supabase } from "../config/DB";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
async function register(newUser: User) {
  let { error } = await supabase.from("users").insert({
    first_name: newUser.firstName,
    last_name: newUser.lastName,
    email: newUser.email,
    password: newUser.password,
    image:
      "https://hlsivvkunvjmwgegcrzt.supabase.co/storage/v1/object/public/defaultFoto/User.png",
    location: null,
    description: null,
  });
  if (error) {
    console.log(error);
    if (error.code === "23505") {
      return {
        status: "ERROR",
        message: "ERROR_EMAIL",
        error: "такая почта уже существует",
      };
    } else {
      return {
        status: "ERROR",
        error: error,
      };
    }
  }
  let { data } = await supabase
    .from("users")
    .select("id,email,password,first_name,last_name")
    .match({ email: newUser.email })
    .single();

  return {
    status: "SUCCESS",
    user: data,
  };

  // const token = jwt.sign({ _id: data.id }, process.env.SECRET_KEY);
  //   res.status(200).json({
  //     status: "SUCCESS",
  //     user: data,
  //     jwt: token,
  //   });
}
module.exports = {
  register,
};
