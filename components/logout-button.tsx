"use client";

import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/";
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
    >
      Logout
    </Button>
  );
}