require("dotenv").config({ path: require('path').join(__dirname, 'scholar-suite/backend/.env') });
const supabase = require("./scholar-suite/backend/db/supabase");

async function check() {
  const { data, error } = await supabase.from('faculty').select('*').limit(5);
  console.log("Error:", error);
  console.log("Data:", data);
}
check();
