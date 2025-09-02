import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FeadDeploymentTest {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
        this.testResults = [];
        this.screenshots = [];
        this.networkLogs = [];
        
        // Test URLs
        this.landingUrl = 'https://d2jwts34z44xxd.cloudfront.net/';
        this.businessUrl = 'https://d2jwts34z44xxd.cloudfront.net/business/';
    }

    async setup() {
        console.log('🚀 Setting up browser...');
        this.browser = await chromium.launch({ headless: true });
        this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        });
        
        // Create screenshots directory
        const screenshotDir = path.join(__dirname, 'test-screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        this.page = await this.context.newPage();
        
        // Setup network monitoring
        this.page.on('request', request => {
            this.networkLogs.push({
                type: 'request',
                url: request.url(),
                method: request.method(),
                resourceType: request.resourceType(),
                timestamp: new Date().toISOString()
            });
        });
        
        this.page.on('response', response => {
            this.networkLogs.push({
                type: 'response',
                url: response.url(),
                status: response.status(),
                contentType: response.headers()['content-type'] || '',
                timestamp: new Date().toISOString()
            });
        });
        
        // Capture console logs and errors
        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                this.testResults.push({
                    test: 'Console Error',
                    status: 'WARNING',
                    details: `Console error: ${msg.text()}`,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }

    async takeScreenshot(name, description) {
        const screenshotPath = path.join(__dirname, 'test-screenshots', `${name}.png`);
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        this.screenshots.push({ name, path: screenshotPath, description });
        console.log(`📸 Screenshot saved: ${name}`);
        return screenshotPath;
    }

    logTestResult(test, status, details, url = null) {
        const result = {
            test,
            status,
            details,
            url,
            timestamp: new Date().toISOString()
        };
        this.testResults.push(result);
        console.log(`${status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️'} ${test}: ${details}`);
    }

    async testLandingPage() {
        console.log('\n🏠 Testing Landing Page...');
        
        try {
            // Navigate to landing page
            const response = await this.page.goto(this.landingUrl, { 
                waitUntil: 'networkidle',
                timeout: 30000 
            });
            
            if (response.status() !== 200) {
                this.logTestResult('Landing Page Load', 'FAIL', `HTTP ${response.status()}`, this.landingUrl);
                return false;
            }
            
            this.logTestResult('Landing Page Load', 'PASS', 'Page loaded successfully', this.landingUrl);
            
            // Wait for page to be fully loaded
            await this.page.waitForTimeout(3000);
            
            // Take screenshot
            await this.takeScreenshot('01-landing-page', 'Landing page initial load');
            
            // Check page title
            const title = await this.page.title();
            this.logTestResult('Landing Page Title', 'INFO', `Title: "${title}"`);
            
            // Look for Get Started button with various selectors
            const getStartedSelectors = [
                'button:has-text("Get Started")',
                'a:has-text("Get Started")',
                '[data-testid="get-started"]',
                '.get-started',
                '#get-started',
                'button[type="button"]:has-text("Get Started")',
                'a[href*="business"]'
            ];
            
            let getStartedButton = null;
            let foundSelector = null;
            
            for (const selector of getStartedSelectors) {
                try {
                    getStartedButton = await this.page.$(selector);
                    if (getStartedButton) {
                        foundSelector = selector;
                        break;
                    }
                } catch (e) {
                    // Continue to next selector
                }
            }
            
            if (getStartedButton) {
                this.logTestResult('Get Started Button', 'PASS', `Found with selector: ${foundSelector}`);
                
                // Check if button is visible
                const isVisible = await getStartedButton.isVisible();
                this.logTestResult('Get Started Visibility', isVisible ? 'PASS' : 'FAIL', `Button is ${isVisible ? 'visible' : 'hidden'}`);
                
                return true;
            } else {
                this.logTestResult('Get Started Button', 'FAIL', 'Get Started button not found with any selector');
                
                // Get page content for debugging
                const bodyText = await this.page.textContent('body');
                this.logTestResult('Page Content Debug', 'INFO', `Page contains: ${bodyText.substring(0, 500)}...`);
                
                return false;
            }
            
        } catch (error) {
            this.logTestResult('Landing Page Test', 'FAIL', `Error: ${error.message}`);
            return false;
        }
    }

    async testBusinessApplication() {
        console.log('\n💼 Testing Business Application...');
        
        try {
            // Navigate to business app
            const response = await this.page.goto(this.businessUrl, { 
                waitUntil: 'networkidle',
                timeout: 30000 
            });
            
            if (response.status() !== 200) {
                this.logTestResult('Business App Load', 'FAIL', `HTTP ${response.status()}`, this.businessUrl);
                return false;
            }
            
            this.logTestResult('Business App Load', 'PASS', 'Business app loaded successfully', this.businessUrl);
            
            // Wait for page to be fully loaded
            await this.page.waitForTimeout(3000);
            
            // Take screenshot
            await this.takeScreenshot('02-business-app', 'Business application initial load');
            
            // Check page title
            const title = await this.page.title();
            this.logTestResult('Business App Title', 'INFO', `Title: "${title}"`);
            
            // Check current URL
            const currentUrl = this.page.url();
            if (currentUrl.includes('/business')) {
                this.logTestResult('Business App URL', 'PASS', `Correctly serving from /business/ path: ${currentUrl}`);
            } else {
                this.logTestResult('Business App URL', 'FAIL', `URL should contain /business/, got: ${currentUrl}`);
            }
            
            // Look for business app specific content
            const businessIndicators = [
                'text=Login',
                'text=Sign In',
                'text=Dashboard',
                'text=Business',
                '[data-testid="login"]',
                '.login',
                '#login',
                'form',
                'input[type="email"]',
                'input[type="password"]'
            ];
            
            let foundBusinessContent = false;
            for (const selector of businessIndicators) {
                try {
                    const element = await this.page.$(selector);
                    if (element) {
                        this.logTestResult('Business Content', 'PASS', `Found business indicator: ${selector}`);
                        foundBusinessContent = true;
                        break;
                    }
                } catch (e) {
                    // Continue to next selector
                }
            }
            
            if (!foundBusinessContent) {
                this.logTestResult('Business Content', 'WARNING', 'No specific business app indicators found');
                
                // Get page content for debugging
                const bodyText = await this.page.textContent('body');
                this.logTestResult('Business Page Content', 'INFO', `Page contains: ${bodyText.substring(0, 500)}...`);
            }
            
            return true;
            
        } catch (error) {
            this.logTestResult('Business App Test', 'FAIL', `Error: ${error.message}`);
            return false;
        }
    }

    async testNavigationFlow() {
        console.log('\n🔄 Testing Navigation Flow...');
        
        try {
            // Start at landing page
            await this.page.goto(this.landingUrl, { 
                waitUntil: 'networkidle',
                timeout: 30000 
            });
            
            await this.page.waitForTimeout(2000);
            
            // Look for Get Started button
            const getStartedSelectors = [
                'button:has-text("Get Started")',
                'a:has-text("Get Started")',
                '[data-testid="get-started"]',
                'a[href*="business"]',
                '.get-started'
            ];
            
            let getStartedButton = null;
            for (const selector of getStartedSelectors) {
                try {
                    getStartedButton = await this.page.$(selector);
                    if (getStartedButton) break;
                } catch (e) {
                    // Continue
                }
            }
            
            if (getStartedButton) {
                // Take screenshot before click
                await this.takeScreenshot('03-before-navigation', 'Before clicking Get Started');
                
                // Click the button
                await getStartedButton.click();
                
                // Wait for navigation
                await this.page.waitForTimeout(3000);
                
                // Take screenshot after click
                await this.takeScreenshot('04-after-navigation', 'After clicking Get Started');
                
                // Check final URL
                const finalUrl = this.page.url();
                if (finalUrl.includes('/business')) {
                    this.logTestResult('Navigation Flow', 'PASS', `Successfully navigated to business app: ${finalUrl}`);
                } else {
                    this.logTestResult('Navigation Flow', 'FAIL', `Expected /business/ URL, got: ${finalUrl}`);
                }
                
                return true;
                
            } else {
                this.logTestResult('Navigation Flow', 'FAIL', 'Could not find Get Started button to test navigation');
                return false;
            }
            
        } catch (error) {
            this.logTestResult('Navigation Flow Test', 'FAIL', `Error: ${error.message}`);
            return false;
        }
    }

    async testContentDifferences() {
        console.log('\n🔍 Testing Content Differences...');
        
        try {
            // Get landing page content
            await this.page.goto(this.landingUrl, { waitUntil: 'networkidle' });
            await this.page.waitForTimeout(2000);
            const landingContent = await this.page.textContent('body');
            const landingTitle = await this.page.title();
            
            // Get business app content
            await this.page.goto(this.businessUrl, { waitUntil: 'networkidle' });
            await this.page.waitForTimeout(2000);
            const businessContent = await this.page.textContent('body');
            const businessTitle = await this.page.title();
            
            // Compare content
            const contentSimilarity = this.calculateSimilarity(landingContent, businessContent);
            const titleSimilarity = landingTitle === businessTitle;
            
            if (contentSimilarity < 0.8) {
                this.logTestResult('Content Difference', 'PASS', `Different content served - similarity: ${(contentSimilarity * 100).toFixed(1)}%`);
            } else {
                this.logTestResult('Content Difference', 'FAIL', `Same or very similar content - similarity: ${(contentSimilarity * 100).toFixed(1)}%`);
            }
            
            if (!titleSimilarity) {
                this.logTestResult('Title Difference', 'PASS', `Different titles: Landing="${landingTitle}" vs Business="${businessTitle}"`);
            } else {
                this.logTestResult('Title Difference', 'WARNING', `Same title on both pages: "${landingTitle}"`);
            }
            
            return true;
            
        } catch (error) {
            this.logTestResult('Content Difference Test', 'FAIL', `Error: ${error.message}`);
            return false;
        }
    }

    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    }

    analyzeNetworkRequests() {
        console.log('\n🌐 Analyzing Network Requests...');
        
        // Categorize requests
        const landingRequests = this.networkLogs.filter(log => 
            log.type === 'request' && !log.url.includes('/business/')
        );
        
        const businessRequests = this.networkLogs.filter(log => 
            log.type === 'request' && log.url.includes('/business/')
        );
        
        const responses = this.networkLogs.filter(log => log.type === 'response');
        const errors = responses.filter(log => log.status >= 400);
        
        this.logTestResult('Network Analysis', 'INFO', `Total requests: ${this.networkLogs.filter(l => l.type === 'request').length}`);
        this.logTestResult('Landing Requests', 'INFO', `Landing page requests: ${landingRequests.length}`);
        this.logTestResult('Business Requests', 'INFO', `Business app requests: ${businessRequests.length}`);
        this.logTestResult('Error Responses', errors.length === 0 ? 'PASS' : 'WARNING', `HTTP errors: ${errors.length}`);
        
        if (errors.length > 0) {
            errors.forEach(error => {
                this.logTestResult('HTTP Error', 'WARNING', `${error.status} - ${error.url}`);
            });
        }
        
        // Check for proper asset routing
        const jsRequests = responses.filter(log => log.url.includes('.js'));
        const cssRequests = responses.filter(log => log.url.includes('.css'));
        
        this.logTestResult('Asset Loading', 'INFO', `JS files: ${jsRequests.length}, CSS files: ${cssRequests.length}`);
    }

    async generateReport() {
        console.log('\n📊 Generating Test Report...');
        
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: this.testResults.length,
                passed: this.testResults.filter(r => r.status === 'PASS').length,
                failed: this.testResults.filter(r => r.status === 'FAIL').length,
                warnings: this.testResults.filter(r => r.status === 'WARNING').length,
                info: this.testResults.filter(r => r.status === 'INFO').length
            },
            testResults: this.testResults,
            screenshots: this.screenshots,
            networkLogs: this.networkLogs
        };
        
        // Save report to file
        const reportPath = path.join(__dirname, 'test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        // Generate markdown report
        const markdownReport = this.generateMarkdownReport(report);
        const markdownPath = path.join(__dirname, 'test-report.md');
        fs.writeFileSync(markdownPath, markdownReport);
        
        console.log(`📄 Report saved to: ${reportPath}`);
        console.log(`📄 Markdown report saved to: ${markdownPath}`);
        
        return report;
    }

    generateMarkdownReport(report) {
        let markdown = `# Fead Deployment Test Report\n\n`;
        markdown += `**Test Date:** ${report.timestamp}\n\n`;
        
        markdown += `## Summary\n\n`;
        markdown += `- **Total Tests:** ${report.summary.totalTests}\n`;
        markdown += `- **Passed:** ${report.summary.passed} ✅\n`;
        markdown += `- **Failed:** ${report.summary.failed} ❌\n`;
        markdown += `- **Warnings:** ${report.summary.warnings} ⚠️\n`;
        markdown += `- **Info:** ${report.summary.info} 📝\n\n`;
        
        markdown += `## Test Results\n\n`;
        
        const categories = ['FAIL', 'WARNING', 'PASS', 'INFO'];
        
        categories.forEach(status => {
            const results = report.testResults.filter(r => r.status === status);
            if (results.length > 0) {
                markdown += `### ${status} (${results.length})\n\n`;
                results.forEach(result => {
                    const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : status === 'WARNING' ? '⚠️' : '📝';
                    markdown += `${emoji} **${result.test}**: ${result.details}\n`;
                    if (result.url) {
                        markdown += `   - URL: ${result.url}\n`;
                    }
                    markdown += `   - Time: ${result.timestamp}\n\n`;
                });
            }
        });
        
        markdown += `## Screenshots\n\n`;
        report.screenshots.forEach(screenshot => {
            markdown += `- **${screenshot.description}**: \`${screenshot.name}.png\`\n`;
        });
        
        return markdown;
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async runAllTests() {
        try {
            await this.setup();
            
            // Run all tests
            await this.testLandingPage();
            await this.testBusinessApplication();
            await this.testNavigationFlow();
            await this.testContentDifferences();
            
            // Analyze network requests
            this.analyzeNetworkRequests();
            
            // Generate report
            const report = await this.generateReport();
            
            // Print summary
            console.log('\n' + '='.repeat(50));
            console.log('🎯 TEST SUMMARY');
            console.log('='.repeat(50));
            console.log(`✅ Passed: ${report.summary.passed}`);
            console.log(`❌ Failed: ${report.summary.failed}`);
            console.log(`⚠️  Warnings: ${report.summary.warnings}`);
            console.log(`📝 Info: ${report.summary.info}`);
            console.log('='.repeat(50));
            
            return report;
            
        } finally {
            await this.cleanup();
        }
    }
}

// Run the tests
async function main() {
    const tester = new FeadDeploymentTest();
    await tester.runAllTests();
}

// Run the tests when executed directly
main().catch(console.error);

export default FeadDeploymentTest;