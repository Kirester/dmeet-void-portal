import { createClient } from '@supabase/supabase-js';

// Hardcoding these temporarily to bypass AI Studio environment glitches
const supabaseUrl = 'https://gbyahwkujpndvzfgumdj.supabase.co';
const supabaseAnonKey = 'sb_publishable_60F_LqUfAJ6vihSk5F4dYw_8FHU-M0d';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("VOID_BRIDGE: Attempting link to", supabaseUrl);