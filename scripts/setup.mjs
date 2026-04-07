#!/usr/bin/env node

/**
 * Client Setup Script
 *
 * Automates the entire Supabase project setup after creating the project in the dashboard.
 *
 * What it does:
 * 1. Runs npm install (so dependencies are available)
 * 2. Prompts for Supabase URL, anon key, and service role key
 * 3. Prompts for admin email + password
 * 4. Writes .env.local
 * 5. Guides you to run setup-database.sql in Supabase dashboard
 * 6. Creates the site-images storage bucket (public, 500KB limit)
 * 7. Creates the admin auth user
 * 8. Optionally syncs images from public/images
 */

import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// ============================================================================
// HELPERS
// ============================================================================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function log(emoji, message) {
  console.log(`${emoji}  ${message}`);
}

function logStep(step, total, message) {
  console.log(`\n[${step}/${total}] ${message}`);
  console.log("─".repeat(50));
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log("\n");
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║          NEW CLIENT PROJECT SETUP            ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log("\n");

  const TOTAL_STEPS = 7;

  // ──────────────────────────────────────────────
  // STEP 1: Install dependencies
  // ──────────────────────────────────────────────
  logStep(1, TOTAL_STEPS, "Installing dependencies");

  const nodeModulesPath = path.join(ROOT_DIR, "node_modules");

  if (fs.existsSync(nodeModulesPath)) {
    log("✅", "node_modules already exists — skipping install");
  } else {
    log("⏳", "Running npm install...");
    try {
      execSync("npm install", { cwd: ROOT_DIR, stdio: "inherit" });
      log("✅", "Dependencies installed");
    } catch {
      log("❌", "npm install failed — run it manually and re-run this script");
      rl.close();
      process.exit(1);
    }
  }

  // Now dynamically import Supabase (available after npm install)
  const { createClient } = await import("@supabase/supabase-js");

  // ──────────────────────────────────────────────
  // STEP 2: Collect credentials
  // ──────────────────────────────────────────────
  logStep(2, TOTAL_STEPS, "Supabase Credentials");

  console.log("Get these from: Supabase Dashboard > Project Settings > API\n");

  const supabaseUrl = await ask("  Supabase Project URL: ");
  const anonKey = await ask("  Supabase Anon Key: ");
  const serviceRoleKey = await ask("  Supabase Service Role Key: ");

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    console.error("\n❌ All three Supabase credentials are required.");
    rl.close();
    process.exit(1);
  }

  // Validate URL format
  if (!supabaseUrl.includes("supabase.co")) {
    console.error("\n❌ Invalid Supabase URL. Should look like: https://xxxxx.supabase.co");
    rl.close();
    process.exit(1);
  }

  console.log("\n");
  const adminEmail = await ask("  Admin Email: ");
  const adminPassword = await ask("  Admin Password (min 6 chars): ");

  if (!adminEmail || !adminPassword || adminPassword.length < 6) {
    console.error("\n❌ Valid admin email and password (6+ chars) required.");
    rl.close();
    process.exit(1);
  }

  // Create admin client with service role key (bypasses RLS)
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // ──────────────────────────────────────────────
  // STEP 3: Write .env.local
  // ──────────────────────────────────────────────
  logStep(3, TOTAL_STEPS, "Writing .env.local");

  const envContent = `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}

# Hotjar - Get your Site ID from https://www.hotjar.com (free tier)
# Leave empty to disable Hotjar tracking
NEXT_PUBLIC_HOTJAR_ID=
`;

  const envPath = path.join(ROOT_DIR, ".env.local");
  fs.writeFileSync(envPath, envContent);
  log("✅", ".env.local created");

  // ──────────────────────────────────────────────
  // STEP 4: Run database SQL
  // ──────────────────────────────────────────────
  logStep(4, TOTAL_STEPS, "Database setup");

  const projectRef = supabaseUrl.replace("https://", "").replace(".supabase.co", "");

  log("📋", "Please run the SQL in the Supabase dashboard:");
  console.log("");
  console.log("   1. Go to: https://supabase.com/dashboard/project/" + projectRef + "/sql/new");
  console.log("   2. Copy and paste the contents of setup-database.sql");
  console.log("   3. Click 'Run'");
  console.log("");

  const runManually = await ask("  Have you run the SQL? (y to continue): ");
  if (runManually.toLowerCase() === "y") {
    log("✅", "Database tables created");
  } else {
    log("⚠️", "You can run the SQL later. The .env.local has been created.");
    log("ℹ️", "The app will work once the tables exist.");
  }

  // ──────────────────────────────────────────────
  // STEP 5: Create storage bucket
  // ──────────────────────────────────────────────
  logStep(5, TOTAL_STEPS, "Creating storage bucket");

  const { data: existingBuckets } = await supabase.storage.listBuckets();
  const bucketExists = existingBuckets?.some((b) => b.name === "site-images");

  if (bucketExists) {
    log("✅", "site-images bucket already exists");
  } else {
    const { error: bucketError } = await supabase.storage.createBucket("site-images", {
      public: true,
      fileSizeLimit: 512000, // 500KB in bytes
      allowedMimeTypes: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
        "image/webp",
      ],
    });

    if (bucketError) {
      log("❌", `Failed to create bucket: ${bucketError.message}`);
      log("📋", "Create it manually: Supabase Dashboard > Storage > New Bucket");
      log("   ", "Name: site-images | Public: Yes | Size limit: 500KB");
    } else {
      log("✅", "site-images bucket created (public, 500KB limit, images only)");
    }
  }

  // ──────────────────────────────────────────────
  // STEP 6: Create admin user
  // ──────────────────────────────────────────────
  logStep(6, TOTAL_STEPS, "Creating admin user");

  const { data: userData, error: userError } =
    await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    });

  if (userError) {
    if (userError.message.includes("already been registered")) {
      log("✅", `Admin user ${adminEmail} already exists`);
    } else {
      log("❌", `Failed to create admin user: ${userError.message}`);
      log("📋", "Create manually: Supabase Dashboard > Authentication > Users > Add User");
    }
  } else {
    log("✅", `Admin user created: ${adminEmail}`);
  }

  // ──────────────────────────────────────────────
  // STEP 7: Sync images (optional)
  // ──────────────────────────────────────────────
  logStep(7, TOTAL_STEPS, "Image sync");

  const imagesDir = path.join(ROOT_DIR, "public", "images");
  let imageFiles = [];

  if (fs.existsSync(imagesDir)) {
    imageFiles = fs
      .readdirSync(imagesDir)
      .filter((f) => !f.startsWith(".") && /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(f));
  }

  if (imageFiles.length === 0) {
    log("ℹ️", "No images found in public/images — skipping sync");
  } else {
    log("📁", `Found ${imageFiles.length} images in public/images`);

    const syncImages = await ask(`  Sync ${imageFiles.length} images to Supabase storage? (y/n): `);

    if (syncImages.toLowerCase() === "y") {
      for (const file of imageFiles) {
        const filePath = path.join(imagesDir, file);
        const fileBuffer = fs.readFileSync(filePath);
        const stats = fs.statSync(filePath);

        if (stats.size > 512000) {
          log("⚠️", `Skipping ${file} (${(stats.size / 1024).toFixed(0)}KB > 500KB limit)`);
          continue;
        }

        const { error: uploadError } = await supabase.storage
          .from("site-images")
          .upload(file, fileBuffer, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          log("❌", `Failed to upload ${file}: ${uploadError.message}`);
        } else {
          log("✅", `Uploaded ${file} (${(stats.size / 1024).toFixed(0)}KB)`);
        }
      }
    } else {
      log("ℹ️", "Skipping image sync");
    }
  }

  // ──────────────────────────────────────────────
  // DONE
  // ──────────────────────────────────────────────
  console.log("\n");
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║              SETUP COMPLETE!                 ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log("");
  console.log("  Next steps:");
  console.log("  ─────────────────────────────────");
  console.log("  1. npm run dev");
  console.log("  2. Open http://localhost:3000");
  console.log(`  3. Login at /admin/login with ${adminEmail}`);
  console.log("");
  console.log("  Optional:");
  console.log("  ─────────────────────────────────");
  console.log("  • Set NEXT_PUBLIC_HOTJAR_ID in .env.local for heatmaps");
  console.log("  • Analytics auto-tracks all pages in production");
  console.log("");

  rl.close();
}

// Run
main().catch((err) => {
  console.error("\n❌ Setup failed:", err.message);
  rl.close();
  process.exit(1);
});
