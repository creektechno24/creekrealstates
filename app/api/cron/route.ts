import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {

  try {

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase
      .from("properties")
      .select("id")
      .limit(1)

    if (error) {

      return NextResponse.json({
        success: false,
        error: error.message,
      })

    }

    return NextResponse.json({
      success: true,
      message: "Supabase keep-alive successful",
    })

  } catch (err) {

    return NextResponse.json({
      success: false,
      error: "Cron failed",
    })

  }

}