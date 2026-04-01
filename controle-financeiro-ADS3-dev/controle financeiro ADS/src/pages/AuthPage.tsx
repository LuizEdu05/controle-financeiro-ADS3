import { useState } from "react";
import { LoginForm, RegisterForm } from "../components/forms/AuthForms";

export function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <p className="eyebrow">Portfolio Project</p>
        <h1>Controle financeiro moderno com autenticacao segura e Firebase.</h1>
        <p>
          Um projeto pensado para demonstrar arquitetura organizada, UX responsiva, regras de
          seguranca e fluxo real de deploy.
        </p>
      </section>

      <section className="auth-card">
        <div className="tab-switch">
          <button className={tab === "login" ? "tab-active" : ""} onClick={() => setTab("login")} type="button">
            Entrar
          </button>
          <button
            className={tab === "register" ? "tab-active" : ""}
            onClick={() => setTab("register")}
            type="button"
          >
            Criar conta
          </button>
        </div>

        {tab === "login" ? <LoginForm /> : <RegisterForm />}
      </section>
    </div>
  );
}
