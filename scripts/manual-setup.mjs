
import { execSync } from 'child_process';

console.log('🔧 Running manual content setup...\n');

try {
  // Step 1: Relocate any misplaced MDX files
  console.log('📁 Step 1: Relocating MDX files...');
  execSync('node scripts/relocate-mdx.mjs', { stdio: 'inherit' });
  
  // Step 2: Seed missing content
  console.log('\n🌱 Step 2: Seeding missing content...');
  execSync('node scripts/seed-content.mjs', { stdio: 'inherit' });
  
  // Step 3: Build content index
  console.log('\n📚 Step 3: Building content index...');
  execSync('node scripts/build-content-index.mjs', { stdio: 'inherit' });
  
  // Step 4: Run final diagnostics
  console.log('\n🔍 Step 4: Running diagnostics...');
  execSync('node scripts/run-diagnostics.mjs', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Error during setup:', error.message);
}
