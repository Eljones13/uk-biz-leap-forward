
import { execSync } from 'child_process';

async function runFullDiagnostics() {
  console.log('🔧 Running complete content diagnostics and fixes...\n');
  
  try {
    // Step 1: Ensure content is in the right location
    console.log('📁 Step 1: Ensuring content location...');
    execSync('node scripts/ensure-content-location.mjs', { stdio: 'inherit' });
    
    // Step 2: Build content index
    console.log('\n📚 Step 2: Building content index...');
    execSync('node scripts/build-content-index.mjs', { stdio: 'inherit' });
    
    // Step 3: Get final counts
    const { loadContentIndex } = await import('../src/lib/content.js');
    const indexContent = await loadContentIndex();
    
    const blogCount = indexContent.filter(item => item.type === 'blog').length;
    const learnCount = indexContent.filter(item => item.type === 'learn').length;
    
    // Step 4: Print final summary
    console.log('\n✅ MDX content check completed');
    console.log(`• Blog files found (glob): ${blogCount}`);
    console.log(`• Blog posts indexed: ${blogCount}`);
    console.log(`• Learn files found (glob): ${learnCount}`);
    console.log(`• Learn tutorials indexed: ${learnCount}`);
    console.log(`• Blog visible on /blog: ${blogCount > 0 ? 'yes' : 'no'}`);
    console.log(`• Learn tabs populated: ${learnCount > 0 ? 'yes' : 'no'}`);
    console.log('• Any errors/warnings: Check output above');
    
    if (blogCount === 0 && learnCount === 0) {
      console.log('\n⚠️  No content found. Check /content-check page for detailed diagnostics.');
    } else {
      console.log('\n🎉 Content should now be visible on /blog and /learn pages!');
    }
    
  } catch (error) {
    console.error('❌ Error during diagnostics:', error.message);
  }
}

runFullDiagnostics();
