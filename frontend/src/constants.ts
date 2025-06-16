export const ADMIN_PANEL_BACKEND_URL =
  "ws://localhost:4000/api/updateCaptadores";
export const ACCESS_TOKEN = "accessToken";

export const ERROR_MSGS = {
  RELOAD_PAGE: "Houve um erro inesperado. Por favor, atualize a página!",
  TRY_AGAIN: "Ocorreu um erro inesperado. Tente novamente!",
  LOGIN_FAILED: "Email ou senha inválidos",
  DO_LOGIN: "Faça o login para acessar a página.",
  LOGOUT_FAILED: "Houve um erro ao sair. Tente novamente!",
};
export const DEFAULT_THUMB_PATH = "/images/preview.avif";

export const IS_SERVER_SIDE = typeof document === "undefined";
