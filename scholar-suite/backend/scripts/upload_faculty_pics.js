const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://uzzfmdwcpafrvcxhsosp.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6emZtZHdjcGFmcnZjeGhzb3NwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM1NDcyOCwiZXhwIjoyMDg3OTMwNzI4fQ.v0WEOHRmMEcOOxYPdUIMAhjkgCOl4pHjajP2b7jTX0w';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const IMG_DIR = 'c:\\Users\\desar\\OneDrive\\Desktop\\dih\\img1\\img1';
const BUCKET_NAME = 'photos';

async function fixUrlsAndUpload() {
    console.log('--- Fixing Faculty Image URLs and Uploading Missing ---');

    // 1. Fetch all faculty
    const { data: faculty, error: fError } = await supabase
        .from('faculty')
        .select('id, employee_id, name, pics');

    if (fError) {
        console.error('Error fetching faculty:', fError);
        return;
    }

    const localFiles = fs.readdirSync(IMG_DIR);
    const clean = (str) => str ? str.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

    let updatedCount = 0;
    let newlyUploadedCount = 0;

    for (const f of faculty) {
        let currentPic = f.pics;
        let needsUpdate = false;
        let finalPath = currentPic;

        // If no pic, try to find and upload
        if (!currentPic) {
            const empIdStr = f.employee_id ? f.employee_id.toString() : null;
            const cleanedName = clean(f.name);

            const match = localFiles.find(file => {
                const parts = file.split('_');
                if (empIdStr && (parts[0] === empIdStr || parts.includes(empIdStr))) return true;
                const cleanedFile = clean(file);
                return cleanedFile.includes(cleanedName) || cleanedName.includes(clean(file.split('_')[0]));
            });

            if (match) {
                console.log(`[UPLOAD] Match found for ${f.name}: ${match}`);
                const filePath = path.join(IMG_DIR, match);
                const fileBuffer = fs.readFileSync(filePath);
                
                const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(match, fileBuffer, {
                    contentType: match.endsWith('.avif') ? 'image/avif' : 'image/png',
                    upsert: true
                });

                if (!uploadError) {
                    finalPath = match;
                    needsUpdate = true;
                    newlyUploadedCount++;
                } else {
                    console.error(`  [ERROR] Upload failed for ${match}:`, uploadError);
                }
            }
        } else if (!currentPic.startsWith('http')) {
            // If it's just a filename, it needs to be a full URL
            finalPath = currentPic;
            needsUpdate = true;
        }

        if (needsUpdate && finalPath) {
            // Get public URL
            const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(finalPath);
            const publicUrl = data?.publicUrl;

            if (publicUrl) {
                console.log(`[UPDATE] Updating ${f.name} with URL: ${publicUrl}`);
                const { error: updateError } = await supabase
                    .from('faculty')
                    .update({ pics: publicUrl })
                    .eq('id', f.id);

                if (updateError) {
                    console.error(`  [ERROR] DB update failed for ${f.name}:`, updateError);
                } else {
                    updatedCount++;
                }
            }
        }
    }

    console.log('\n--- Final Summary ---');
    console.log(`Newly Uploaded: ${newlyUploadedCount}`);
    console.log(`Total URLs Updated in DB: ${updatedCount}`);
}

fixUrlsAndUpload();
