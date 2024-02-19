import * as yup from "yup";

export const categoryCreateValidationSchema = yup.object({
    name: yup.string().min(3, "Minimal length is 3 symbols").max(200, "Maximum length is 200 symbols"),
    description: yup.string().min(3, "Minimal length is 3 symbols").max(4000, "Maximum length is 4000 symbols"),
});