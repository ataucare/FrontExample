export const rulesLogin = {
    username: [
      {
        required: true,
        message: "Debe ingresar una cuenta de usuario",
        trigger: "change"
      },
      {
        min: 4,
        max: 130,
        message: "La cuenta debe contener almenos 4 caracteres",
        trigger: "change"
      }
    ],
    password: [
      {
        required: true,
        message: "Debe ingresar una contraseña",
        trigger: "change"
      },
      {
        min: 4,
        max: 30,
        message: "La contraseña debe contener entre 4 y 30 caracteres",
        trigger: "change"
      }
    ]
  };