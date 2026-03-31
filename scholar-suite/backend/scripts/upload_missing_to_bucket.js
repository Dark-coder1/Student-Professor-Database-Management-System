const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://uzzfmdwcpafrvcxhsosp.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6emZtZHdjcGFmcnZjeGhzb3NwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM1NDcyOCwiZXhwIjoyMDg3OTMwNzI4fQ.v0WEOHRmMEcOOxYPdUIMAhjkgCOl4pHjajP2b7jTX0w';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const IMG_DIR = 'c:\\Users\\desar\\OneDrive\\Desktop\\dih\\img1\\img1';
const BUCKET_NAME = 'photos';

async function uploadMissingToBucket() {
    console.log('--- Uploading Missing Images to Supabase Storage ---');

    // 1. Get all faculty pics URLs
    const { data: faculty, error } = await supabase.from('faculty').select('id, name, pics').not('pics', 'is', null);
    if (error) { console.error(error); return; }

    // 2. List what's already in the bucket
    const { data: bucketFiles, error: bucketError } = await supabase.storage.from(BUCKET_NAME).list('', { limit: 1000 });
    if (bucketError) { console.error(bucketError); return; }
    const bucketFilenames = new Set((bucketFiles || []).map(f => f.name));
    console.log(`Files already in bucket: ${bucketFilenames.size}`);

    // 3. For each faculty, extract filename from URL and upload if missing
    let uploaded = 0;
    let alreadyExists = 0;
    let notFound = 0;

    for (const f of faculty) {
        // Extract filename from URL: .../public/photos/FILENAME.avif
        const filename = decodeURIComponent(f.pics.split('/').pop().split('?')[0]);

        if (bucketFilenames.has(filename)) {
            alreadyExists++;
            continue;
        }

        // Look for this file locally
        const localPath = path.join(IMG_DIR, filename);
        if (!fs.existsSync(localPath)) {
            console.log(`  [NOT FOUND] Local file missing: ${filename} for ${f.name}`);
            notFound++;
            continue;
        }

        const fileBuffer = fs.readFileSync(localPath);
        const contentType = filename.endsWith('.avif') ? 'image/avif' : filename.endsWith('.png') ? 'image/png' : 'image/jpeg';

        const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filename, fileBuffer, {
            contentType,
            upsert: true
        });

        if (uploadError) {
            console.error(`  [ERROR] Failed to upload ${filename}:`, uploadError.message);
        } else {
            console.log(`  [OK] Uploaded: ${filename}`);
            uploaded++;
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Already in bucket: ${alreadyExists}`);
    console.log(`Newly uploaded:    ${uploaded}`);
    console.log(`Local file not found: ${notFound}`);
}

uploadMissingToBucket();
