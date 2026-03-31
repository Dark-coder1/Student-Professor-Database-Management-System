const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://uzzfmdwcpafrvcxhsosp.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6emZtZHdjcGFmcnZjeGhzb3NwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM1NDcyOCwiZXhwIjoyMDg3OTMwNzI4fQ.v0WEOHRmMEcOOxYPdUIMAhjkgCOl4pHjajP2b7jTX0w';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const IMG_DIR = 'c:\\Users\\desar\\OneDrive\\Desktop\\dih\\img1\\img1';
const BUCKET_NAME = 'photos';

async function fixAllMappings() {
    console.log('--- Fixing All Incorrect Faculty Mappings ---');

    const { data: faculty, error: fError } = await supabase.from('faculty').select('*');
    if (fError) { console.error(fError); return; }

    const localFiles = fs.readdirSync(IMG_DIR);
    const titles = ['dr', 'prof', 'ms', 'mr', 'mrs', 'associate', 'assistant', 'senior'];
    
    const clean = (str) => {
        if (!str) return '';
        let s = str.toLowerCase();
        titles.forEach(t => {
            s = s.replace(new RegExp(`\\b${t}\\b`, 'g'), '');
        });
        return s.replace(/[^a-z0-9]/g, '');
    };

    // Identify duplicated images
    const counts = {};
    faculty.forEach(f => { if (f.pics) counts[f.pics] = (counts[f.pics] || 0) + 1; });
    const duplicatedPics = Object.keys(counts).filter(p => counts[p] > 1);

    console.log(`Identified ${duplicatedPics.length} duplicated images in the database.`);

    let fixedCount = 0;

    for (const f of faculty) {
        const isDuplicated = f.pics && duplicatedPics.includes(f.pics);
        if (!isDuplicated) continue;

        // Verify if the current mapping matches the name
        const filename = f.pics.split('/').pop().split('?')[0];
        const cleanedName = clean(f.name);
        const cleanedFilename = clean(filename);

        // If the filename DOES NOT contain the cleaned name, and it's shared with others, it's likely wrong.
        const matchesName = cleanedFilename.includes(cleanedName) || cleanedName.includes(clean(filename.split('_')[0]));
        // Wait, the previous logic matched too easily. Let's be stricter.
        
        // A match is only valid if:
        // 1. Employee ID matches
        // 2. The cleaned faculty name (minus titles) is present in the filename AND is at least 4 chars long.
        
        const empIdStr = f.employee_id ? f.employee_id.toString() : null;
        let isCorrect = false;
        if (empIdStr && (filename.startsWith(empIdStr) || filename.includes(`_${empIdStr}_`))) {
            isCorrect = true;
        } else if (cleanedFilename.includes(cleanedName) && cleanedName.length > 5) {
            isCorrect = true;
        }

        if (!isCorrect) {
            console.log(`\nFixing: ${f.name} (ID: ${f.id}) - Incorrect pic assigned: ${filename}`);
            
            // Try to find the CORRECT match
            let bestMatch = null;

            // Strategy 1: Employee ID (Highest Priority)
            if (empIdStr) {
                bestMatch = localFiles.find(file => {
                    const parts = file.split('_');
                    return parts[0] === empIdStr || parts.includes(empIdStr);
                });
            }

            // Strategy 2: Exact name match (if no EmpID match)
            if (!bestMatch) {
                bestMatch = localFiles.find(file => {
                    const cleanedFile = clean(file);
                    return cleanedFile.includes(cleanedName) && cleanedName.length > 5;
                });
            }

            if (bestMatch) {
                console.log(`  [MATCH] Found correct local image: ${bestMatch}`);
                const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(bestMatch);
                const publicUrl = data?.publicUrl;

                await supabase.from('faculty').update({ pics: publicUrl }).eq('id', f.id);
                fixedCount++;
            } else {
                console.log(`  [RESET] No match found. Resetting pics to NULL for ${f.name}.`);
                await supabase.from('faculty').update({ pics: null }).eq('id', f.id);
                fixedCount++;
            }
        }
    }

    console.log(`\n--- Final Fix Summary ---`);
    console.log(`Total fixed/reset: ${fixedCount}`);
}

fixAllMappings();
