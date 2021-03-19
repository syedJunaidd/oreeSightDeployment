import * as Yup from "yup";

const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    token: Yup.string().required("Required")
})
export default validationSchema;
