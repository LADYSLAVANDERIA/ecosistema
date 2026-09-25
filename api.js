// Conexión al núcleo del ecosistema (Supabase). La clave anon es pública por diseño;
// los datos están protegidos por funciones con validación y PIN.
const ECO = {
  url: "https://vhjsizkbmabznupkfzji.supabase.co",
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoanNpemtibWFiem51cGtmemppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzY1NDEsImV4cCI6MjA5NDIxMjU0MX0.fV6E9Z1KkkCEzLYnxC1z3OoTV_fk9WYK0u-0eWyiUg8",
  negocio: "pastas-concon",
  async rpc(fn, args) {
    const r = await fetch(`${this.url}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: this.key, Authorization: `Bearer ${this.key}` },
      body: JSON.stringify(args)
    });
    const t = await r.text();
    const d = t ? JSON.parse(t) : null;
    if (!r.ok) throw new Error((d && (d.message || d.hint)) || `Error ${r.status}`);
    return d;
  }
};
const clp = n => "$" + Number(n || 0).toLocaleString("es-CL");
// Activación por enlace: ?k=PIN guarda el acceso en este dispositivo y limpia la URL.
(function(){const q=new URLSearchParams(location.search);if(q.has("k")){localStorage.setItem("eco_pin",q.get("k"));q.delete("k");history.replaceState(null,"",location.pathname+(q.toString()?"?"+q:""))}})();
