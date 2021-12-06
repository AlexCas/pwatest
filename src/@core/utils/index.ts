import "./ngx-ui-loader-config";
import "./app-messages";

export const ValidattiErrorMessage: { [key: string]: string } = {
  required: "El campo es requerido",
  fullName: "Full name must be between 1 and 128 characters",
  email: "Favor de ingresar una dirección de correo válida",
  confirmEmail: "Email addresses must match",
  password: "Password must be between 7 and 15 characters",
  confirmPassword: "Las contraseñas no coinciden, favor de verificar",
  rfc: "RFC must be between 10 and 13 characters",
  pwdRecoveryCode: "Code must be 5 characters"
};


export const RegExps: any = {
  email: "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,4}",
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
  rfc: "[a-zA-Z0-9]{10,13}",
  phoneNumber: "[0-9]{10}",
  password1: "(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,15}",
  pwdRecoveryCode: "[0-9]{5}",
};


export const emptyGuid: string = '00000000-0000-0000-0000-000000000000'

export const pageSizeOptions: any[] = [5, 10, 20, 50, 100]

