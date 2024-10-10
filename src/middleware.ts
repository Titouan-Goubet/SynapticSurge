export { default } from "next-auth/middleware";

// Pour faire simple ici toutes les routes nécessitant une session sont protégées par le middleware next-auth/middleware.
export const config = { matcher: ["/profile"] };
