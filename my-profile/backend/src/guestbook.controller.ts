import { Controller, Post, Body } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Controller('api')
export class GuestbookController {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  @Post('guestbook')
  async createEntry(@Body() entry: { name: string; message: string }) {
    const { data, error } = await this.supabase
      .from('guestbook') // Ensure this table name matches Supabase
      .insert([entry]);
    
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  }
}