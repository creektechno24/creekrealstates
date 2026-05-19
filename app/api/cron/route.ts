import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

/**
 * Keep-alive cron endpoint to prevent Supabase free-tier database from
 * going inactive due to inactivity.
 *
 * This endpoint runs a lightweight query (SELECT 1) to keep the database active.
 *
 * Security: Protected by CRON_SECRET environment variable.
 * Set up automatic triggers using:
 *   - cron-job.org (free, up to 3 jobs)
 *   - UptimeRobot (free, up to 50 monitors)
 *   - Vercel Cron Jobs (if on Pro plan)
 *
 * Recommended: Run every 24 hours to stay within free tier limits.
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 10 // seconds

export async function GET(request: Request) {
  try {
    // Optional: Verify cron secret for security
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create a lightweight Supabase client (no SSR overhead)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Run a minimal query to keep the database active
    const startTime = Date.now()
    const { data, error } = await supabase.rpc('ping', {}).maybeSingle()
    
    // Fallback: If 'ping' function doesn't exist, use a simple query
    if (error?.code === 'PGRST202') {
      // Function doesn't exist, use raw SQL via PostgREST
      const { error: rawError } = await supabase
        .from('_keep_alive_check')
        .select('*')
        .limit(1)
        .maybeSingle()
      
      // If table doesn't exist either, that's fine - the connection itself keeps DB alive
      if (rawError && rawError.code !== 'PGRST116' && rawError.code !== '42P01') {
        throw rawError
      }
    } else if (error) {
      throw error
    }

    const duration = Date.now() - startTime

    return NextResponse.json({
      success: true,
      message: 'Keep-alive ping successful',
      timestamp: new Date().toISOString(),
      duration_ms: duration
    })
  } catch (error) {
    console.error('[Cron] Keep-alive failed:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
