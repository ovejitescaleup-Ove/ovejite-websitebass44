import { supabase } from "@/lib/supabase";

function flatten(row) {
  if (!row) return null;
  return {
    id: row.id,
    ...(row.data || {}),
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

function makeEntity(entityName) {
  return {
    async list(sort = "-created_date", limit = 200) {
      let query = supabase
        .from("cms_records")
        .select("id, entity, data, created_at, updated_at")
        .eq("entity", entityName)
        .limit(limit);

      const descending = String(sort).startsWith("-");
      const field = String(sort).replace(/^-/, "");

      if (field === "created_date" || field === "created_at") {
        query = query.order("created_at", { ascending: !descending });
      } else if (field === "updated_date" || field === "updated_at") {
        query = query.order("updated_at", { ascending: !descending });
      } else {
        // JSON ordering is not reliable across mixed types; sort client-side.
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      const rows = (data || []).map(flatten);

      if (field !== "created_date" && field !== "created_at" && field !== "updated_date" && field !== "updated_at") {
        rows.sort((a, b) => {
          const av = a[field];
          const bv = b[field];
          if (av === bv) return 0;
          if (av == null) return descending ? 1 : -1;
          if (bv == null) return descending ? -1 : 1;
          return (av > bv ? 1 : -1) * (descending ? -1 : 1);
        });
      }
      return rows;
    },

    async filter(filters = {}, sort = "-created_date", limit = 200) {
      const rows = await this.list(sort, limit);
      return rows.filter((row) =>
        Object.entries(filters || {}).every(([key, value]) => row[key] === value)
      );
    },

    async create(data) {
      const { data: row, error } = await supabase
        .from("cms_records")
        .insert({ entity: entityName, data: data || {} })
        .select("id, entity, data, created_at, updated_at")
        .single();
      if (error) throw error;
      return flatten(row);
    },

    async update(id, data) {
      const clean = { ...(data || {}) };
      delete clean.id;
      delete clean.created_date;
      delete clean.updated_date;

      const { data: row, error } = await supabase
        .from("cms_records")
        .update({ data: clean })
        .eq("id", id)
        .eq("entity", entityName)
        .select("id, entity, data, created_at, updated_at")
        .single();

      if (error) throw error;
      return flatten(row);
    },

    async delete(id) {
      const { error } = await supabase
        .from("cms_records")
        .delete()
        .eq("id", id)
        .eq("entity", entityName);
      if (error) throw error;
      return true;
    },
  };
}

async function currentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) return null;
  return {
    ...data.user,
    role: data.user.app_metadata?.role || "user",
  };
}

export const base44 = {
  entities: new Proxy(
    {},
    {
      get: (_target, entityName) => makeEntity(entityName),
    }
  ),

  auth: {
    async me() {
      return currentUser();
    },

    async loginViaEmailPassword(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.user;
    },

    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

    async loginWithProvider(provider, returnTo = "/admin") {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}${returnTo}`,
        },
      });
      if (error) throw error;
    },

    async registerViaEmailPassword(email, password, options = {}) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });
      if (error) throw error;
      return data.user;
    },
  },
};
