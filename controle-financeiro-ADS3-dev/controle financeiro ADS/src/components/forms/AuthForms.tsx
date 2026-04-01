import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginSchema, registerSchema, type LoginSchema, type RegisterSchema } from "../../validators/authSchema";
import { loginUser, registerUser } from "../../services/authService";
import { useToast } from "../../contexts/ToastContext";

export function LoginForm() {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setSubmitting(true);
      await loginUser(values.email, values.password);
      showToast("Login realizado com sucesso.", "success");
    } catch {
      showToast("Nao foi possivel entrar. Verifique suas credenciais.", "error");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <label>
        E-mail
        <input type="email" placeholder="voce@email.com" {...register("email")} />
        {errors.email && <span className="field-error">{errors.email.message}</span>}
      </label>

      <label>
        Senha
        <input type="password" placeholder="Minimo de 6 caracteres" {...register("password")} />
        {errors.password && <span className="field-error">{errors.password.message}</span>}
      </label>

      <button className="primary-button" disabled={submitting} type="submit">
        {submitting ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

export function RegisterForm() {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setSubmitting(true);
      await registerUser(values.name, values.email, values.password);
      showToast("Conta criada com sucesso.", "success");
    } catch {
      showToast("Nao foi possivel criar sua conta.", "error");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <label>
        Nome completo
        <input type="text" placeholder="Seu nome" {...register("name")} />
        {errors.name && <span className="field-error">{errors.name.message}</span>}
      </label>

      <label>
        E-mail
        <input type="email" placeholder="voce@email.com" {...register("email")} />
        {errors.email && <span className="field-error">{errors.email.message}</span>}
      </label>

      <label>
        Senha
        <input type="password" placeholder="Crie uma senha" {...register("password")} />
        {errors.password && <span className="field-error">{errors.password.message}</span>}
      </label>

      <label>
        Confirmar senha
        <input type="password" placeholder="Repita a senha" {...register("confirmPassword")} />
        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
      </label>

      <button className="primary-button" disabled={submitting} type="submit">
        {submitting ? "Criando conta..." : "Criar conta"}
      </button>
    </form>
  );
}
