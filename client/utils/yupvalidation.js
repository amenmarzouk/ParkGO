import * as yup from "yup";

const signupSchema = {}

const loginSchema = yup.object().shape({
    Matricule: yup
      .string()
      .test("len", "matricule n'est pa valide", (val) => val.length === 5)
      .required(" donner votre matricule"),
    Password: yup
      .string()
      .test("len", "CIN n'est pa valide", (val) => val.length === 8)
      .required(" donner votre CIN").matches(/^\d+$/, "donner un CIN valide"),
  });
  

  module.exports= {
    signupSchema,
    loginSchema
  }