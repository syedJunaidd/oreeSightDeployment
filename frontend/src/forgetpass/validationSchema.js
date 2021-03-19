import * as Yup from "yup";


const validationSchema = Yup.object({

    email:Yup.string().required("The email field is required"),
 
 

  

}) 
export default validationSchema