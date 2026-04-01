import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { db } from "../services/firebase";

export function SettingsPage() {
  const { profile, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const [currency, setCurrency] = useState(profile?.currency ?? "BRL");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCurrency(profile?.currency ?? "BRL");
  }, [profile?.currency]);

  async function handleSave() {
    if (!profile) return;

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", profile.uid), {
        currency,
        updatedAt: serverTimestamp()
      });
      await refreshProfile();
      showToast("Configuracoes salvas com sucesso.", "success");
    } catch {
      showToast("Nao foi possivel atualizar as configuracoes.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-grid">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Preferencias</p>
          <h2>Configuracoes da conta</h2>
        </div>
      </div>

      <section className="panel panel-narrow">
        <label>
          Moeda padrao
          <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
            <option value="BRL">Real brasileiro (BRL)</option>
            <option value="USD">Dolar americano (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </label>

        <button className="primary-button" onClick={handleSave} disabled={saving} type="button">
          {saving ? "Salvando..." : "Salvar preferencias"}
        </button>
      </section>
    </div>
  );
}
