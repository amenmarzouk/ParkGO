const yup=require("yup")

const usershema=yup.object({
    name:yup.string().required(),
    lastname:yup.string().required(),
    email:yup.string().email().required(),
})  

module.exports=usershema