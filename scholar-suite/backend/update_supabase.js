require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const facultyDataJSON = JSON.parse(fs.readFileSync('c:\\Users\\saiad\\OneDrive\\Desktop\\saad1\\facultydata.txt', 'utf8'));

async function applyUpdates() {
  const limit = Math.min(100, facultyDataJSON.data.length);
  console.log(`Updating ${limit} faculty addresses...`);
  
  for (let i = 0; i < limit; i++) {
    const item = facultyDataJSON.data[i];
    const attr = item.attributes;
    
    if (attr.Office_Address && attr.EMAIL) {
      console.log(`Updating ${attr.EMAIL} to ${attr.Office_Address}`);
      // Try to match by email
      const { error } = await supabase
        .from('faculty')
        .update({ office_address: attr.Office_Address })
        .eq('email', attr.EMAIL);
        
      if (error) {
        console.error(`Failed to update ${attr.EMAIL}:`, error);
      }
    }
  }
  console.log("Done updating Supabase office addresses.");
}

applyUpdates();
