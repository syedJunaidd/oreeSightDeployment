import * as Yup from "yup";

const validationSchema = Yup.object({
    firstName:Yup.string().required("Enter your first name"),
    lastName:Yup.string().required("Enter your last name"),
    email:Yup.string().required("Enter your email"),
    phone:Yup.string().required("Enter your phone"),
    company:Yup.string().required("Enter your company name"),
    job:Yup.string().required("Enter your job"),
    password:Yup.string().required("Enter your password"),
    password_confirmation:Yup.string().required("Enter password again"),
});

export default validationSchema
