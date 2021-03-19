import * as Yup from "yup";





const validationSchemaFor = Yup.object({

    firstName:Yup.string().required("Required"),
    lastName:Yup.string().required("Required"),
    email:Yup.string().required("Required"),
    phone:Yup.string().required("Required"),
    company:Yup.string().required("Required"),
    job:Yup.string().required("Required")
}) 








export default validationSchemaFor
