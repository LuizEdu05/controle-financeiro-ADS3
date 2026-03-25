import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { logoutUser } from "../../services/authService";

export function AppShell() {
  const { profile } = useAuth();
  const { showToast } = useToast();

  async function handleLogout() {
    await logoutUser();
    showToast("Sessao encerrada com sucesso.", "success");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">FinTrack Portfolio</p>
          <h1>Seu controle financeiro didatico e profissional.</h1>
        </div>

        <nav className="nav-links">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/transactions">Movimentacoes</NavLink>
          <NavLink to="/settings">Configuracoes</NavLink>
        </nav>

        <div className="sidebar-profile">
          <p className="sidebar-name">{profile?.name ?? "Usuario"}</p>
          <p className="sidebar-email">{profile?.email}</p>
          <button className="secondary-button" onClick={handleLogout} type="button">
            Sair
          </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
