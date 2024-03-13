const yup=require("yup")

const carshema=yup.object({
    regisNB:yup.string().required(),
    location:yup.string().required(),
    dispo:yup.boolean().required(),
})  

module.exports=carshema