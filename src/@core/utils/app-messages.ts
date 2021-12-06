export class AppMessages {
  //#region AUTHENTICATION
  static get mess(): string {
    return "Por favor, ingrese el correo electrónico que pro-porcionó para su alta";
  }
  static get invalidGrantConfirmAccount(): any {
    return {
      title: "Cuenta pendiente",
      description:
        "Favor de activar tu dirección de correo registrada, se envió un correo para verificarla.",
    };
  }
  static get invalidGrantEmailOrPwdInvalid(): any {
    return {
      title: "¡Datos incorrectos!",
      description:
        "Favor verificar los datos ingresados, la dirección de correo y/o la contraseña son incorrectos.",
    };
  }
  static get invalidGrantLockedAccount(): any {
    return {
      title: "¡Cuenta bloqueada o desactivada!",
      description:
        "La cuenta de usuario ha sido bloqueada o desactivada. Por favor, contacte al Administrador o espera un momento e intentalo de nuevo.",
    };
  }
  static get invalidGrantInactiveAccount(): any {
    return {
      title: "¡Usuario Inactivo!",
      description:
        "El correo electrónico con el que intenta iniciar sesión se encuentra bloqueado, favor de contactar al Administrador.",
    };
  }


  static get invalidGrantConfirmPassword(): any {
    return {
      title: "¡Contraseñas Incorrectas!",
      description:
        "Las contraseñas no coinciden, favor de verificar.",
    };
  }

  static get recoveryPasswordGrant(): any {
    return {
      title: "¡Correo Enviado!",
      description: "Se ha enviado un correo con las instrucciones para recuperar su contraseña, favor de revisar su bandeja de entrada y la carpeta de SPAM."
    }
  }

  //Recuperación de contraseña Y Registro de contraseña
  public static PWD_CODE_REQUIRED: string = "Debe ingresar el código. Campo obligatorio.";
  public static PWD_CODE_MAXLENGTH: string = "El código debe ser de cinco dígitos";
  public static PWD_PWD_REQUIRED: string = "Debe ingresar la contraseña. Campo obligatorio.";
  public static PWD_PWD_INVALID: string = "Revise el formato de la contraseña.";
  public static PWD_CONFIRM_PWD_REQUIRED: string = "Debe confirmar la contraseña. Campo obligatorio.";
  public static PWD_CONFIRM_PWD_INVALID: string = "Las contraseñas no coinciden";
  //#endregion

  public FIELD_REQUIRED: string = "El campo es obligatorio";
  public EMAIL_INVALID: string = "El correo electrónico es inválido.";
  public PHONE_INVALID: string = "El teléfono es invalid";

  static get CONFIRM_CANCEL(): string {
    return "¿Esta seguro que desea salir y descartar cambios?";
  }



}

export const NO_RESULT_TEXT: string = "No se encontraron registros";